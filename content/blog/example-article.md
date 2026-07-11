---
title: "Small Python and VEX Examples for Houdini"
description: "Two concise code samples: a Houdini Python parameter edit and a VEX attribute-wrangle operation."
date: "2026-07-11"
updated: "2026-07-11"
tags:
  - Houdini
  - Python
  - VEX
  - Pipeline
draft: false
---

These intentionally small examples show the kind of code used around Houdini. They are starting points, not drop-in production tools.

## Python: update a node parameter

Run this in Houdini's Python Shell to set the current node's `scale` parameter when it exists.

```python
import hou

node = hou.pwd()
scale = node.parm("scale")

if scale is None:
    raise hou.NodeError(f"{node.path()} has no scale parameter")

scale.set(1.25)
print(f"Updated {node.path()} to scale {scale.eval()}")
```

## VEX: add a velocity-based color ramp

Use this in an Attribute Wrangle running over points. VEX is C-like, so the fence uses C syntax highlighting for a readable result.

```c
float speed = length(v@v);
float normalized_speed = fit(speed, 0.0, chf("max_speed"), 0.0, 1.0);

v@Cd = chramp("speed_ramp", clamp(normalized_speed, 0.0, 1.0));
```
