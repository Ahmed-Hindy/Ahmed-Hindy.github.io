---
title: "Building RV the Easy Way: Abusing CI Minutes Instead of Downloading the World"
description: "How I turned OpenRV's existing GitHub Actions workflows into a remote build machine for downloadable Windows, Linux, and macOS artifacts."
date: "2026-07-13"
tags:
  - OpenRV
  - GitHub Actions
  - C++
  - Pipeline
draft: true
---

I wanted to build [OpenRV](https://github.com/AcademySoftwareFoundation/OpenRV), but I did not want to turn my workstation into an OpenRV build machine.

RV is not a small Python utility. It is a large C++ application built around CMake, Conan, Qt, Python, FFmpeg, native compilers, and a long list of media and image libraries.

Building it locally means downloading all of that, compiling a large dependency tree, keeping the toolchain compatible, and using a lot of disk space for files I may only need once.

OpenRV already had another option: GitHub Actions.

The upstream project maintains CI workflows for Windows, Linux, and macOS. Those workflows already know which compiler, Qt version, Python version, CMake version, VFX Platform configuration, and dependencies RV needs.

Instead of recreating that environment locally, I forked the repository and used GitHub's runners as remote build machines.

## Let CI download the dependencies

The important part was already there.

OpenRV's CI could configure the toolchain, build the dependencies, compile RV, run its tests, and install the result into an `_install` directory.

That saved me from manually setting up and downloading the same dependency stack on Windows.

It also gave me a clean environment for every build. There were no leftover environment variables, old libraries, or unrelated tools on my machine affecting the result.

For my fork, I reduced the build to the configuration I actually cared about:

```text
VFX Platform: CY2025
Build type: Release
FFmpeg: 8
```

I disabled the larger debug and historical matrices at the manual entry point. They are useful for upstream validation, but unnecessary when I only want a current release build.

This still consumes CI time, but that was the trade: GitHub spends the compute and bandwidth instead of my workstation.

## A green build is not a downloadable build

The first problem was that the workflows built RV successfully and then threw the result away.

GitHub Actions runners are temporary. When a job ends, their filesystem disappears unless the workflow uploads something.

The build output I wanted was not the raw `_build` directory. That contains intermediate files, generated projects, object files, and build-machine state.

CMake had already created a cleaner boundary:

```text
cmake --build _build
cmake --install _build --prefix _install
```

I added artifact upload steps after `cmake --install` and preserved `_install` instead.

Windows uploads the installed tree directly. Linux and macOS archive it as `.tar.gz` first, which better preserves executable permissions and symlinks.

The final workflow produces builds for:

- Windows CY2025 Release;
- Rocky Linux 8 and 9;
- macOS Intel;
- macOS Apple Silicon.

These are CI artifacts, not proper installers. There is no MSI, DMG, signing, updater, or Start menu integration. They are simply the installed application trees that survived after the runners were deleted.

## CI caching makes the abuse more reasonable

Rebuilding every dependency from scratch on every run would be wasteful.

OpenRV's workflows already support dependency caching. Once the expensive dependency build is cached, later runs can reuse it instead of downloading and compiling the complete stack again.

I kept a manual `SKIP_DEPS_CACHE` input so I can choose between:

- reusing the cached dependencies for a normal build;
- ignoring the cache when I need to verify a clean dependency build.

For personal experimentation, the cached path is usually the useful one. I am interested in getting an RV build, not repeatedly proving that Qt and FFmpeg can compile.

## Knowing which RV I built

A folder containing `rv.exe` is useful, but media support depends heavily on how FFmpeg and the other dependencies were configured.

I added a Windows JSON manifest generated from the build's `CMakeCache.txt`.

It records:

- the source commit and workflow run;
- compiler and runner information;
- the VFX Platform configuration;
- Qt, Python, CMake, and FFmpeg versions;
- disabled FFmpeg decoders, encoders, parsers, filters, and protocols;
- optional SDK availability;
- resolved dependency versions.

The manifest describes the configuration CMake actually resolved, rather than a dependency list copied into documentation and forgotten.

There is also a small manifest-only artifact, so I can inspect a build without downloading the complete Windows package.

For a media-review application, this is more useful than naming the ZIP `RV-final-final-2` and hoping I remember what is inside it.

## The jobs ran, but where were the files?

After Windows worked, I expected the Linux and macOS jobs to produce artifacts too.

They did not.

The jobs had compiled, tested, and installed RV successfully, but only the Windows build action contained an upload step. A successful platform job and a downloadable platform build are separate things.

I added equivalent archive and upload steps to the Linux and macOS actions. The next manual run produced all of the expected artifacts.

I also briefly thought the Windows artifact was missing because I was looking inside the individual job log. GitHub shows artifacts on the overall workflow-run summary instead.

CI had done exactly what I asked. The UI just made the result easy to overlook.

## What this does not solve

A successful CI build is not the same as a finished release.

I still need to validate the downloaded artifacts outside GitHub's runners:

- launch RV from the extracted Windows tree;
- check required DLLs and Qt plugins;
- test images, sequences, and expected codecs;
- verify Linux runtime dependencies;
- deal with macOS signing and quarantine if I want to distribute it properly.

The current workflow solves a narrower problem: it gives me repeatable, traceable OpenRV builds without downloading and maintaining the complete native toolchain locally.

That was the part I wanted.

## The easy way

I did not simplify OpenRV's build system.

I reused it somewhere else.

The upstream CI workflows are effectively executable build documentation. They already contain the platform knowledge that would be painful to reproduce manually.

My fork turns that existing work into a manually triggered remote build service and keeps the installed result before the runner disappears.

It may be a slight abuse of CI minutes, but it is much easier than downloading the world onto my workstation for one build.

The fork is available on [GitHub](https://github.com/Ahmed-Hindy/OpenRV).
