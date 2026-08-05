---
title: "Building RV the Easy Way by Abusing Free CI Minutes on Github"
description: "How I used OpenRV's existing GitHub Actions workflows to build OpenRV in the cloud."
date: "2026-07-13"
tags:
  - OpenRV
  - GitHub Actions
  - C++
  - Pipeline
status: published
---

I wanted to try [OpenRV](https://github.com/AcademySoftwareFoundation/OpenRV), so I started by looking for a Windows download.

I could not find any official websites with a big green `download` button. Only offical thing I found was the Github repo with no download links. I found ready-made copies in a Discord server, posted by an anonymous user who swears the .exe is perfectly safe. I did eventually convince myself the guy only meant good and truly it was clean working build. Thank you random stranger!
OpenRV is a free and an open-source software (`FOSS`); so why should I beg for the big green `download` button? This is a cyber security nightmare!

I checked the Github repo's releases for downloadable artifacts, but found none. The CI toolchain was already building it for all major platforms (Windows, MacOS and Linux), yet it did not provide packaged runtimes.

So I forked the repository and started with a narrower question: how could I turn the existing CI into a downloadable artifact?

That seemed more sensible than recreating RV's native build stack on my workstation. The build toolchain was already there upstream. It is heavy and convulted but it was there and that was the important part. All I had to do was to add artifact bundling.

This is also where the "abuse" in the title comes from. Why download this large convuluted toolchain when I can just let GitHub do it. while my workstation only downloads the finished .zip.

## Reusing the build setup that already existed

The reusable workflows still support larger matrices and debug builds. I just did not need to spend CI time on every historical configuration whenever I wanted one build from a tagged commit.

I added a manual entry point with the most relevant configuration for 2025:

```text
VFX Platform: CY2025
Build type: Release
FFmpeg: 8.0
```

The identifiable downloads for this Windows configuration already add up to about 2.34 GiB before counting MSYS2 packages, Rust, Python packages, CMake, JOM, repository submodules, and GitHub Action dependencies. A realistic clean run is probably closer to 3–4 GiB of transfer.

The source archives are not the main problem. OpenRV's non-Qt dependencies total roughly 399 MiB compressed. Qt 6.5.3 accounts for almost 1.95 GiB by itself and expands to about 13.7 GiB on disk.

The biggest single package is Qt's `debug_info`: around 1.41 GiB downloaded and more than 10.4 GiB extracted, even though this is a Release build. I have not yet confirmed that it can be removed safely, but it shows how quickly a local build environment can become bloated.

## Keeping the thing that was built

I added artifact uploads after these commands:

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

## Linux and macOS were green and still produced no files

After fixing Windows, I expected the Linux and macOS jobs to expose artifacts too. Their jobs ran successfully, but nothing appeared in the run summary.

Only the Windows build action contained an upload step. Linux and macOS compiled, tested, and installed RV, then let the runner disappear with `_install` still on its filesystem.

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

I have only validated the windows build on my machine. The next check is verifying Linux and macOS artifacts, so contributers are welcome to test it.

There is one more limitation in the current branch: I changed the top-level workflow to manual-only. That is convenient for my fork because it avoids expensive automatic runs. It would be a poor upstream change as-is because it removes normal push, pull-request, and scheduled validation. An upstream version should probably keep the existing validation workflow and add manual artifact generation separately.

## Where I ended up

My [OpenRV fork](https://github.com/Ahmed-Hindy/OpenRV/tree/dev/windows-artifact-manual-ci) does not change much inside RV itself. Most of this work is CI plumbing: select a useful build slice, preserve `_install`, archive it correctly per platform, and record enough information to know what was built.

That was enough for what I wanted. I can ask GitHub Actions for the big green `download` button, and avoid ruining my ISP's data plan and my local storage.
