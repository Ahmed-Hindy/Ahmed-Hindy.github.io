import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const profileJpg = path.join(rootDir, 'src', 'assets', 'profile.jpg')
const openGraphImage = path.join(rootDir, 'public', 'og-image-portrait.jpg')
const profileJpgTemp = path.join(rootDir, 'src', 'assets', 'profile.tmp.jpg')
const projectMediaReport = path.join(rootDir, 'docs', 'project-media-optimization.md')
const projectMedia = [
  {
    source: 'public/projects/houdini-usd-utilities/arnold-husd-translator.png',
    widths: [640, 960],
  },
  {
    source: 'public/projects/substance-painter-usd-creator/substance-painter-usd-creator.png',
    widths: [640],
  },
  {
    source: 'public/projects/renderkit/renderkit-ui-screenshot.png',
    widths: [640, 960],
  },
  {
    source: 'public/projects/h-denoise-utils/demo-poster.png',
    widths: [640],
  },
  {
    source: 'public/projects/kitsu-desktop/kitsu-dashboard.png',
    widths: [640, 960],
  },
]

const formatBytes = (bytes) => `${Math.round(bytes / 1024)} KB`

const formatReportBytes = (bytes) => new Intl.NumberFormat('en-US').format(bytes)

const optimizeProfileJpg = async () => {
  const originalSize = (await fs.stat(profileJpg)).size

  if (originalSize < 120 * 1024) {
    console.log(`profile.jpg already optimized (${formatBytes(originalSize)})`)
    return
  }

  const sourceBuffer = await fs.readFile(profileJpg)
  const optimizedBuffer = await sharp(sourceBuffer)
    .rotate()
    .resize(600, 600, { fit: 'cover' })
    .jpeg({
      quality: 82,
      mozjpeg: true,
      progressive: true,
    })
    .toBuffer()

  if (optimizedBuffer.byteLength >= originalSize) {
    console.log(`profile.jpg kept original (${formatBytes(originalSize)})`)
    return
  }

  await fs.writeFile(profileJpgTemp, optimizedBuffer)
  await fs.rename(profileJpgTemp, profileJpg)
  console.log(`profile.jpg ${formatBytes(originalSize)} -> ${formatBytes(optimizedBuffer.byteLength)}`)
}

const writeOpenGraphImage = async () => {
  const profilePng = await sharp(profileJpg)
    .rotate()
    .resize(340, 340, { fit: 'cover' })
    .png()
    .toBuffer()

  const profileData = profilePng.toString('base64')
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#111b27" />
          <stop offset="1" stop-color="#265973" />
        </linearGradient>
        <linearGradient id="portraitBackdrop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#4242fa" />
          <stop offset="1" stop-color="#9a6bff" />
        </linearGradient>
        <clipPath id="profileClip">
          <path d="M858 131C937 94 1042 121 1074 197C1106 272 1073 370 1012 421C955 469 859 452 820 384C783 319 789 163 858 131Z" />
        </clipPath>
      </defs>
      <rect width="1200" height="630" fill="url(#sky)" />
      <g fill="none" stroke-linecap="round" stroke-width="12" stroke-dasharray="18 20" opacity=".28">
        <path d="M724 90Q963 -91 1170 92" stroke="#ff1981" />
        <path d="M750 107Q963 -47 1145 107" stroke="#ffd500" />
        <path d="M779 124Q963 -3 1117 124" stroke="#00aa77" />
        <path d="M809 141Q963 41 1087 141" stroke="#4242fa" />
        <path d="M839 158Q963 85 1058 158" stroke="#9a6bff" />
      </g>
      <path d="M0 472C188 410 351 543 560 493C763 444 939 365 1200 453V630H0Z" fill="#0d0f12" />
      <path d="M0 500C200 439 356 570 567 519C778 468 976 393 1200 479" fill="none" stroke="#182939" stroke-width="8" />
      <g transform="rotate(-4 588 174)">
        <rect x="519" y="113" width="146" height="92" rx="18" fill="#182939" opacity=".82" />
        <rect x="541" y="136" width="53" height="10" rx="5" fill="#809fff" />
        <rect x="541" y="159" width="93" height="8" rx="4" fill="#8fc7df" />
        <rect x="541" y="179" width="70" height="8" rx="4" fill="#8fc7df" opacity=".65" />
      </g>
      <text x="76" y="122" fill="#a7baff" font-family="Trebuchet MS, Segoe UI, Arial, sans-serif" font-size="25" font-weight="800" letter-spacing="3">PIPELINE TD / VFX PIPELINE DEVELOPER</text>
      <text x="76" y="227" fill="#f2f5f7" font-family="Trebuchet MS, Segoe UI, Arial, sans-serif" font-size="88" font-weight="900" letter-spacing="-4">Ahmed</text>
      <text x="76" y="314" fill="#f2f5f7" font-family="Trebuchet MS, Segoe UI, Arial, sans-serif" font-size="88" font-weight="900" letter-spacing="-4">Hindy</text>
      <text x="76" y="374" fill="#c6d1dc" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="30" font-weight="650">Artist-facing tools for Houdini, USD,</text>
      <text x="76" y="416" fill="#c6d1dc" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="30" font-weight="650">Maya, rendering, and production workflows.</text>
      <path d="M858 131C937 94 1042 121 1074 197C1106 272 1073 370 1012 421C955 469 859 452 820 384C783 319 789 163 858 131Z" fill="url(#portraitBackdrop)" />
      <image href="data:image/png;base64,${profileData}" x="790" y="104" width="320" height="360" preserveAspectRatio="xMidYMid slice" clip-path="url(#profileClip)" />
      <path d="M858 131C937 94 1042 121 1074 197C1106 272 1073 370 1012 421C955 469 859 452 820 384C783 319 789 163 858 131Z" fill="none" stroke="#fff" stroke-width="9" opacity=".9" />
      <g font-family="Inter, Segoe UI, Arial, sans-serif" font-size="22" font-weight="800">
        <rect x="76" y="516" width="116" height="43" rx="21.5" fill="#18203b" stroke="#809fff" stroke-width="2" />
        <text x="108" y="544" fill="#a7baff">Python</text>
        <rect x="207" y="516" width="92" height="43" rx="21.5" fill="#35182b" stroke="#ff70b0" stroke-width="2" />
        <text x="235" y="544" fill="#ff9bca">USD</text>
        <rect x="314" y="516" width="140" height="43" rx="21.5" fill="#102d29" stroke="#00cc88" stroke-width="2" />
        <text x="344" y="544" fill="#64e2b5">Pipeline</text>
      </g>
      <text x="858" y="565" fill="#b9c4d0" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="21" font-weight="800">ahmed-hindy.github.io</text>
    </svg>
  `

  const imageBuffer = await sharp(Buffer.from(svg))
    .jpeg({
      quality: 90,
      mozjpeg: true,
      progressive: true,
    })
    .toBuffer()

  await fs.writeFile(openGraphImage, imageBuffer)
  console.log(`${path.basename(openGraphImage)} ${formatBytes(imageBuffer.byteLength)}`)
}

const optimizeProjectMedia = async () => {
  const results = []

  for (const { source, widths } of projectMedia) {
    const sourcePath = path.join(rootDir, source)
    const sourceStats = await fs.stat(sourcePath)
    const metadata = await sharp(sourcePath).metadata()
    const outputs = []

    for (const width of widths) {
      const outputPath = sourcePath.replace(/\.png$/i, `-${width}w.webp`)
      const outputBuffer = await sharp(sourcePath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 85, effort: 6, smartSubsample: false })
        .toBuffer()

      await fs.writeFile(outputPath, outputBuffer)
      outputs.push({
        filename: path.basename(outputPath),
        width,
        bytes: outputBuffer.byteLength,
      })
    }

    results.push({
      source,
      dimensions: `${metadata.width}x${metadata.height}`,
      sourceBytes: sourceStats.size,
      outputs,
    })
  }

  const sourceBytes = results.reduce((total, result) => total + result.sourceBytes, 0)
  const largestDerivativeBytes = results.reduce(
    (total, result) => total + Math.max(...result.outputs.map((output) => output.bytes)),
    0,
  )
  const reportRows = results.flatMap((result) => result.outputs.map((output) =>
    `| \`${result.source.replace('public/', '')}\` | ${result.dimensions} | ${formatReportBytes(result.sourceBytes)} | ${output.width}w WebP | ${formatReportBytes(output.bytes)} |`,
  ))
  const report = `# Project media optimization\n\nGenerated with \`bun run optimize:assets\`. The source PNGs remain as fallbacks; current browsers select a responsive WebP derivative through \`srcset\`. The featured-card CSS presentation remains 16:9 with \`object-fit: contain\`.\n\n| Source PNG | Dimensions | PNG bytes | Generated derivative | WebP bytes |\n| --- | ---: | ---: | --- | ---: |\n${reportRows.join('\n')}\n\nThe five original PNGs total ${formatReportBytes(sourceBytes)} bytes. The largest responsive derivative for each card totals ${formatReportBytes(largestDerivativeBytes)} bytes, a ${((1 - largestDerivativeBytes / sourceBytes) * 100).toFixed(1)}% reduction for a typical high-density desktop visit. The h_denoise_utils video stays at \`preload="none"\`; its poster uses the 640w WebP derivative.\n\nThe WebP settings favor screenshot text and UI clarity: quality 85, no chroma subsampling, and encoder effort 6. Review the original and generated files side by side whenever source screenshots change.\n`

  await fs.mkdir(path.dirname(projectMediaReport), { recursive: true })
  await fs.writeFile(projectMediaReport, report)
  console.log(`project media ${formatBytes(sourceBytes)} -> ${formatBytes(largestDerivativeBytes)} (largest responsive variants)`)
}

await optimizeProfileJpg()
await writeOpenGraphImage()
await optimizeProjectMedia()
