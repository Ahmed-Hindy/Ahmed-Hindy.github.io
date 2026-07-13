---
title: "Building RV the Easy Way: Letting GitHub Actions Handle the Toolchain"
description: "How I used OpenRV's existing CI to produce downloadable cross-platform builds without recreating its native toolchain locally."
date: "2026-07-13"
tags:
  - OpenRV
  - GitHub Actions
  - C++
  - Pipeline
draft: true
---

The build passed, but I could not find the thing I built.

That was one of the more confusing parts of working on my [OpenRV fork](https://github.com/Ahmed-Hindy/OpenRV).

I did not start by trying to compile RV locally. My first question was simpler:

> How would I run the CI on GitHub for Windows? What will it build? Does it output an artifact?

OpenRV is a large C++ VFX application. Its build includes CMake, Conan, Qt, Python, FFmpeg, native compilers, platform-specific dependencies, and VFX Reference Platform configurations.

I could try to reconstruct that toolchain on my Windows machine, but OpenRV's GitHub Actions already knew how to do it.

The missing part was keeping the result.

## Reusing the existing build system

OpenRV already had reusable CI workflows for Windows, Linux, and macOS. They handled the compiler setup, dependency builds, tests, and CMake install step.

I did not want to create another build script beside them. That would give me another version of the build process to maintain and eventually let drift away from upstream.

Instead, I changed the top-level workflow in my fork into a manual entry point.

For now, it targets:

```text
VFX Platform: CY2025
Build type: Release
FFmpeg: 8
```

Debug builds and the older platform matrix are still supported by the reusable workflows, but I do not need to run all of them whenever I want a build.

This keeps the expensive part focused on the configuration I actually want to test.

## A successful CI job can still leave you with nothing

The existing workflows compiled, tested, and installed RV.

Then the runner disappeared.

GitHub Actions does not preserve the runner filesystem unless the workflow uploads something. A green build only proves that the commands completed. It does not automatically give me a downloadable application.

The useful output was the CMake install tree:

```text
cmake --build _build
cmake --install _build --prefix _install
```

I chose `_install` instead of uploading `_build`.

The build directory contains intermediate files, generated projects, object files, and machine-specific state. The install directory is the runtime layout that CMake intentionally produced.

The Windows workflow now uploads that install tree as a GitHub Actions artifact.

## “I can't find the artifact”

The first manual Windows run succeeded and uploaded the files.

I still could not find them.

I was looking inside the individual job page, where GitHub shows the steps and logs. The artifacts were on the overall workflow run summary page.

The files existed. I was simply looking at the wrong level of the Actions UI.

I also found that running the workflow by name through the GitHub CLI did not work:

```text
could not find any workflows named OpenRV
```

Dispatching it by workflow ID worked instead:

```powershell
gh workflow run 301990144 \
    --ref dev/windows-artifact-manual-ci \
    -f SKIP_DEPS_CACHE=false
```

Small problems, but they are the kind that make a working CI setup feel broken.

## Recording what was actually built

For a media application, a downloadable folder is not enough.

I also wanted to know which codecs and dependencies were included. The Windows workflow now generates a JSON manifest from the build's own `CMakeCache.txt`.

It records:

- the source commit and workflow run;
- compiler and runner information;
- the VFX Platform configuration;
- Qt, Python, and CMake versions;
- the selected FFmpeg version;
- disabled decoders, encoders, parsers, filters, and protocols;
- optional SDK availability;
- resolved dependency versions.

The successful Windows build used FFmpeg 8, resolved as `n8.0`.

The manifest also showed that optional Apple ProRes and Blackmagic DeckLink SDK support was not enabled, along with the exact FFmpeg components excluded from that build.

That is more useful than maintaining a separate list in the documentation. The manifest describes the configuration CMake actually resolved.

There is also a small manifest-only artifact, so I can inspect the build without downloading the full Windows package.

## Linux and macOS built successfully, but produced nothing

After the Windows artifact worked, I noticed something else:

> Why is there no Linux or macOS artifacts even though the CI actions ran?

The answer was straightforward. Their jobs built and installed OpenRV, but only the Windows action had an upload step.

Running a platform job and preserving its output are separate decisions.

I added upload steps to the Linux and macOS actions as well. Both archive their `_install` trees as `.tar.gz` files, which is a better fit for preserving executable permissions and symlinks than treating them as ordinary folders.

The final manual run produced:

- Windows CY2025 Release;
- Linux Rocky 8 CY2025 Release;
- Linux Rocky 9 CY2025 Release;
- macOS Intel CY2025 Release;
- macOS Apple Silicon CY2025 Release;
- a separate Windows codec and dependency manifest.

The Windows and macOS jobs passed their test suites, as did both Linux builds.

## These are artifacts, not installers

I am deliberately not calling these releases or installers.

They are downloadable CMake install trees produced by CI.

I have not yet confirmed that the Windows artifact launches on a clean machine, that every required DLL and Qt plugin is included, or that expected media formats work at runtime.

The same applies to Linux and macOS outside their CI environments.

Compilation and tests are meaningful, but they are not the same as validating a user-facing package.

A proper distribution would still need runtime testing and possibly platform-specific packaging, signing, and installation behavior.

## Useful for my fork, not automatically right for upstream

The workflow works well for what I wanted: a manually triggered way to produce current release artifacts.

It is less obviously suitable as an upstream change.

Changing the top-level workflow to manual-only also removes automatic push, pull-request, and scheduled validation. That trade-off makes sense for avoiding unnecessary builds on my fork, but it would be risky for the main OpenRV repository.

A cleaner upstream proposal would probably preserve the existing validation workflow and add manual artifact generation separately.

That was a useful reminder that a good personal workflow is not automatically a good project-wide policy.

## What I learned

The easiest way to build RV was not to simplify OpenRV's toolchain.

It was to use the toolchain the project already maintains.

The upstream workflows were the most accurate build documentation available. They already contained the platform knowledge I needed. My changes only made the successful install output survive after the runner finished, and added enough provenance to understand what was inside it.

The fork does not substantially change RV itself.

It gives me controlled, traceable builds that I can inspect and experiment with later.

For a large native project, that is already useful.
