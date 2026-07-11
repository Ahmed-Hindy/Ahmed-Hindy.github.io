---
title: "Wrapping Thin Geometry Without Tiny VDB Voxels"
description: "Practical ways to build collision and remesh proxies for thin Houdini geometry without forcing the entire VDB to an unnecessarily small voxel size."
date: "2026-07-11"
tags:
  - Houdini
  - SOPs
  - VDB
  - Modeling
draft: false
---

I first wrote this note after a set of chain links kept breaking apart in VDB From Polygons. The polygons were fine; the links were simply too thin for the voxel size I wanted to use.

Lowering the voxel size fixed the links, but it also made the entire volume more expensive. Most of the model was large and simple, so paying for that resolution everywhere felt wasteful.

A VDB cannot preserve a feature that is smaller than its voxels. Before reaching for a much smaller voxel size, I now ask whether I actually need the original detail or only a reliable proxy.

The methods below are for collision geometry, remeshing, and broad wrappers. They change the shape on purpose. I would not quietly swap one of these proxies in for final render geometry.

## Method 1: thicken a proxy branch before VDB conversion

The smallest setup is:

```text
source_geometry
├── OUT_RENDER
└── normal1
    └── peak1
        └── vdbfrompolygons1
            └── convertvdb1
                └── OUT_PROXY
```

Keep the original mesh on one branch. On the proxy branch, use Peak to move the points along their normals before VDB From Polygons.

This works best on closed geometry with clean, consistently oriented normals. Increase the Peak distance only until the thinnest parts occupy enough voxel width to survive the conversion. The goal is not to inflate the model more than necessary.

I tune it in this order:

1. Pick the coarsest voxel size that is acceptable for the job.
2. Display the VDB result, not the input polygons.
3. Increase Peak until the thin parts stop breaking apart.
4. Check tight gaps and intersections, because expanding the proxy can close them.

Peak only offsets a surface. On a single open sheet it does not create real thickness. For cloth-like cards, leaves, or open panels, PolyExtrude is usually the more honest preprocessing step because it creates side walls and a closed volume.

## Method 2: build a separate wrapper and project it back

For a cheap broad proxy, another option is:

```text
source_geometry ───────────────────────────────┐
                                               │ second input
bound1 → remesh1 → ray1 (Minimum Distance) ────┘
```

Bound creates an initial cage, Remesh adds enough points for it to deform, and Ray in Minimum Distance mode places those points on the closest locations of the source geometry.

This is basically a shrinkwrap. It is useful when I care about the overall mass of a collision cage more than every hole and chain link.

It is also easy to get a bad result that looks reasonable from only one angle. A box is a poor starting cage for a deeply concave object, and closest-point projection can fold parts of the cage onto the wrong surface. I only use this approach when a broad wrapper is acceptable and I can inspect it from all sides.

A better starting cage often beats adding more Remesh density. Depending on the object, that might be a hand-built low-resolution hull, a convex decomposition, or several wrappers built per named piece.

## Method 3: use a voxel remesher as the proxy tool

If SideFX Labs is already part of the show setup, I also try its voxel-remeshing tool for quick wrappers. It is faster to set up than a manual VDB chain when all I need is a clean, watertight proxy.

I still treat the output as disposable proxy geometry. Small details can disappear and narrow gaps can merge. Labs tools also change between releases, so I avoid depending on their internal node layout.

## A few VDB settings that matter

### Voxel Size

This controls the output resolution. Surface features smaller than the voxel size will not make it into the VDB. Before lowering it, check whether the missing feature really needs to exist in the proxy.

### Signed versus unsigned distance

A signed distance field needs a meaningful inside and outside. For non-airtight or open geometry, an unsigned distance field can still store distance to the surface without deciding which side is inside.

That can be useful for proximity work, but it is not a direct substitute for a closed collision SDF.

### Preserve Holes

Preserve Holes uses winding information when classifying the surface. It can help with meshes that contain internal holes, but it does not make badly constructed geometry reliable by itself. Reversed polygons, tiny gaps, and self-intersections still deserve inspection.

## Which method I would choose

| Need | Starting point |
| --- | --- |
| Keep the original render mesh untouched but make a stronger SDF proxy | Peak or PolyExtrude on a separate branch |
| Make a broad collision cage quickly | Bound or a simple cage, then Remesh and Ray |
| Produce a clean watertight proxy with little setup | A Labs voxel remesher |
| Preserve every small link, cable, and gap | Use a finer voxel size or avoid voxelizing that detail |

That last row is the one I have to remind myself of. Sometimes the tiny voxel size is not a workflow mistake. If the simulation depends on every chain link, the grid has to represent every chain link.

## Common failure cases

### Thin parts still disappear

The proxy is still thinner than the voxel grid can represent. Increase the proxy thickness, lower the voxel size, or remove that detail from the proxy entirely.

### Separate parts fuse together

Peak, PolyExtrude, and voxel remeshing all make it easier for narrow gaps to close. Reduce the expansion, split the geometry into pieces, or use a smaller voxel size only for the affected parts.

### The wrapper jumps across concave areas

The starting cage is too crude for closest-point projection. Add structure to the cage, build several local wrappers, or stop using a shrinkwrap for that object.

### The SDF has strange inside/outside regions

Check whether the mesh is closed, whether polygon winding is consistent, and whether an unsigned distance field is more appropriate for the operation.

## WIP checklist

- [ ] Build a Houdini 21 example using a chain, a thin panel, and a cable.
- [ ] Add viewport comparisons for the original mesh, failed VDB, thickened proxy, and shrinkwrapped proxy.
- [ ] Record voxel counts and cook times for each approach.
- [ ] Test the setup as an RBD collision proxy, not only as converted polygons.

## References

- [VDB From Polygons](https://www.sidefx.com/docs/houdini/nodes/sop/vdbfrompolygons.html)
- [Peak](https://www.sidefx.com/docs/houdini/nodes/sop/peak.html)
- [Ray](https://www.sidefx.com/docs/houdini/nodes/sop/ray.html)
- [Bound](https://www.sidefx.com/docs/houdini/nodes/sop/bound.html)
- [Remesh](https://www.sidefx.com/docs/houdini/nodes/sop/remesh.html)
- [PolyExtrude](https://www.sidefx.com/docs/houdini/nodes/sop/polyextrude.html)
