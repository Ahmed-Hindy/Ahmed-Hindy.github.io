# Project media optimization

Generated with `bun run optimize:assets`. The source PNGs remain as fallbacks; current browsers select a responsive WebP derivative through `srcset`. The featured-card CSS presentation remains 16:9 with `object-fit: contain`.

| Source PNG | Dimensions | PNG bytes | Generated derivative | WebP bytes |
| --- | ---: | ---: | --- | ---: |
| `projects/houdini-usd-utilities/arnold-husd-translator.png` | 1919x967 | 877,483 | 640w WebP | 21,506 |
| `projects/houdini-usd-utilities/arnold-husd-translator.png` | 1919x967 | 877,483 | 960w WebP | 38,252 |
| `projects/substance-painter-usd-creator/substance-painter-usd-creator.png` | 718x809 | 426,690 | 640w WebP | 46,436 |
| `projects/renderkit/renderkit-ui-screenshot.png` | 1404x984 | 258,465 | 640w WebP | 26,150 |
| `projects/renderkit/renderkit-ui-screenshot.png` | 1404x984 | 258,465 | 960w WebP | 52,134 |
| `projects/h-denoise-utils/demo-poster.png` | 1280x720 | 185,531 | 640w WebP | 6,960 |
| `projects/kitsu-desktop/kitsu-dashboard.png` | 1397x927 | 85,025 | 640w WebP | 11,388 |
| `projects/kitsu-desktop/kitsu-dashboard.png` | 1397x927 | 85,025 | 960w WebP | 21,742 |

The five original PNGs total 1,833,194 bytes. The largest responsive derivative for each card totals 165,524 bytes, a 91.0% reduction for a typical high-density desktop visit. The h_denoise_utils video stays at `preload="none"`; its poster uses the 640w WebP derivative.

The WebP settings favor screenshot text and UI clarity: quality 85, no chroma subsampling, and encoder effort 6. Review the original and generated files side by side whenever source screenshots change.
