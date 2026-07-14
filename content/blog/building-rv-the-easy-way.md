---
title: "Building RV the Easy Way: Abusing CI Minutes Instead of Downloading the World"
description: "How I used OpenRV's existing GitHub Actions workflows to build downloadable Windows, Linux, and macOS artifacts without recreating the toolchain locally."
date: "2026-07-13"
tags:
  - OpenRV
  - GitHub Actions
  - C++
  - Pipeline
draft: false
---

I wanted to try [OpenRV](https://github.com/AcademySoftwareFoundation/OpenRV), so I started by looking for a Windows download.

I could not find a project website, only a Github repo with no download links. The only ready-made copy I came across was shared in a Discord server. It might have been harmless, but downloading an unofficial build from a random stranger felt fishy. RV is free and open-source software; getting a safe copy should not require asking for fishy zip files.

I searched the releases for downloadable copies, but found none. The CI was already building RV for several platforms, yet it did not leave behind anything I could download.

So I forked the repository and started with a narrower question: how could I turn the existing CI into a downloadable artifact?

That seemed more sensible than recreating RV's native build stack on my workstation. The build toolchain was heavy and convulted. Notable build dependecies were CMake, Conan, Qt, Python, FFmpeg, and MSVC. This was too much hassle for a .exr viewer.

## Reusing the build setup that already existed

OpenRV already had reusable CI that handled the full toolchain. why not just fork it?
I added a manual entry point with the most relevant configuration for 2025:

```text
VFX Platform: CY2025
Build type: Release
FFmpeg: 8.0
```

The reusable workflows still support larger matrices and debug builds. I just did not need to spend CI time on every historical configuration whenever I wanted one current build.

This is also where the "abuse" in the title comes from. GitHub downloads and compiles the dependency tree, while my workstation only downloads the finished .zip.

The identifiable downloads for this Windows configuration already add up to about 2.34 GiB before counting MSYS2 packages, Rust, Python packages, CMake, JOM, repository submodules, and GitHub Action dependencies. A realistic clean run is probably closer to 3–4 GiB of transfer.

The source archives are not the main problem. OpenRV's non-Qt dependencies total roughly 399 MiB compressed. Qt 6.5.3 accounts for almost 1.95 GiB by itself and expands to about 13.7 GiB on disk.

The biggest single package is Qt's `debug_info`: around 1.41 GiB downloaded and more than 10.4 GiB extracted, even though this is a Release build. I have not yet confirmed that it can be removed safely, but it shows how quickly a native build environment becomes much larger than the final application.

## Keeping the thing that was built

The existing jobs could compile, test, and install RV successfully. They did not originally preserve the installed files.

A GitHub runner is deleted when the job finishes, so I added artifact uploads after these commands:

```text
cmake --build _build
cmake --install _build --prefix _install
```

I uploaded `_install`, not `_build`. The build directory contains object files, generated projects, and other intermediate state. `_install` is the runtime layout CMake deliberately creates.

Windows uploads that tree directly. Linux and macOS package it as `.tar.gz` first so executable permissions and symlinks survive properly.

The final successful run produced:

- Windows CY2025 Release: about 442 MB
- Rocky Linux 8 CY2025 Release: about 559 MB
- Rocky Linux 9 CY2025 Release: about 558 MB
- macOS Intel CY2025 Release: about 772 MB
- macOS Apple Silicon CY2025 Release: about 772 MB

Those are the artifact sizes reported by GitHub. They are still large downloads, but the Windows result is about 442 MB compared with an estimated 3–4 GiB of clean-build transfer and a likely 20–30 GiB local workspace, also don't forget the headaches involved with CMake toolchains :)

## The build passed, but I could not find it

The first Windows workflow run succeeded. I opened the job log and still could not find the artifact.

It was there. GitHub shows artifacts on the overall workflow-run summary, not inside the individual job page where I was looking.

I also tried dispatching the workflow by name through the GitHub CLI and got:

```text
could not find any workflows named OpenRV
```

Dispatching it by workflow ID worked:

```powershell
gh workflow run 301990144 --ref dev/windows-artifact-manual-ci -f SKIP_DEPS_CACHE=false
```

Neither problem had anything to do with compiling RV, but both made a working setup look broken for a while.

## Linux and macOS were green and still produced no files

After fixing Windows, I expected the Linux and macOS jobs to expose artifacts too. Their jobs ran successfully, but nothing appeared in the run summary.

The reason was simple: only the Windows build action contained an upload step. Linux and macOS compiled, tested, and installed RV, then let the runner disappear with `_install` still on its filesystem.

I added archive and upload steps to both platform actions, and voila, The next run produced builds for the full matrix. Finally something to download and test.

## Recording what was inside the Windows build

The downloaded archive contained a full working version of OpenRV. How about we make it better?

I added a JSON manifest generated from the Windows build's `CMakeCache.txt`. It records the source commit, workflow run, compiler, runner, VFX Platform, Qt, Python, CMake, FFmpeg settings, optional SDK states, and resolved dependency versions.

The first successful manifest reported, among other things:

```text
Runner: windows-2022
Generator: Visual Studio 17 2022
Qt: 6.5.3
Python: 3.11
CMake: 3.31.6
FFmpeg: n8.0
Blackmagic DeckLink SDK: disabled
Apple ProRes SDK: disabled
```

It also records the FFmpeg decoders, encoders, parsers, filters, and protocols excluded by that build. I uploaded the manifest separately as a roughly 1.5 KB artifact, so I can inspect it without downloading the complete Windows package.

Generating it from `CMakeCache.txt` was important. A handwritten dependency table would eventually drift. The cache describes what CMake actually resolved during that run.

## Caching is different on each platform

Linux and macOS can restore compiled OpenRV dependency directories from GitHub Actions cache for Release builds. One macOS dependency cache from the workflow was almost 4.93 GB, which is a useful reminder that the compressed source downloads are only the beginning.

Windows is different. Its workflow currently caches the CMake installation, not OpenRV's compiled dependency stack, so the native dependencies are rebuilt on every clean run.

I kept the manual `SKIP_DEPS_CACHE` input because it is still useful for Linux and macOS, and because it gives me an explicit way to request a clean dependency build. But the article should not pretend that Windows already avoids the expensive rebuild.

## What I have not tested yet

These outputs are CI artifacts, not installers or finished releases. There is no MSI, DMG, signing, updater, or Start menu integration.

I have only validated the windows build on my machine. The next check is verifying Linux and macOS artifacts. I would need contributers for that.

There is one more limitation in the current branch: I changed the top-level workflow to manual-only. That is convenient for my fork because it avoids expensive automatic runs. It would be a poor upstream change as-is because it removes normal push, pull-request, and scheduled validation. An upstream version should probably keep the existing validation workflow and add manual artifact generation separately.

## Where I ended up

My [OpenRV fork](https://github.com/Ahmed-Hindy/OpenRV/tree/dev/windows-artifact-manual-ci) does not change much inside RV itself. Most of this work is CI plumbing: select a useful build slice, preserve `_install`, archive it correctly per platform, and record enough information to know what was built.

That was enough for what I wanted. I can ask GitHub Actions for a current RV build, download the installed result, and avoid turning my Windows workstation into a permanent OpenRV build environment.

