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
        <clipPath id="profileClip">
          <circle cx="930" cy="315" r="170" />
        </clipPath>
      </defs>
      <rect width="1200" height="630" fill="#0f1724" />
      <rect x="0" y="0" width="376" height="630" fill="#142033" />
      <rect x="78" y="92" width="92" height="7" rx="3.5" fill="#67c6e3" />
      <text x="78" y="188" fill="#86c6dc" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="28" font-weight="800">Pipeline TD / VFX Pipeline Developer</text>
      <text x="78" y="282" fill="#f4f7fb" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="84" font-weight="800">Ahmed Hindy</text>
      <text x="78" y="354" fill="#d7e4f2" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="34" font-weight="650">Houdini / Solaris/USD / Maya / Unreal</text>
      <text x="78" y="408" fill="#a8b7ca" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="27" font-weight="500">Artist-facing tools, publishing, validation, render handoff,</text>
      <text x="78" y="446" fill="#a8b7ca" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="27" font-weight="500">farm debugging, and cross-DCC production workflows.</text>
      <g font-family="Inter, Segoe UI, Arial, sans-serif" font-size="24" font-weight="800">
        <rect x="78" y="505" width="136" height="46" rx="23" fill="#132b38" stroke="#2b5261" />
        <text x="112" y="536" fill="#b7e8f7">Python</text>
        <rect x="230" y="505" width="104" height="46" rx="23" fill="#132b38" stroke="#2b5261" />
        <text x="263" y="536" fill="#b7e8f7">USD</text>
        <rect x="350" y="505" width="142" height="46" rx="23" fill="#132b38" stroke="#2b5261" />
        <text x="382" y="536" fill="#b7e8f7">Pipeline</text>
      </g>
      <circle cx="930" cy="315" r="186" fill="#1e2a3a" />
      <image href="data:image/png;base64,${profileData}" x="760" y="145" width="340" height="340" preserveAspectRatio="xMidYMid slice" clip-path="url(#profileClip)" />
      <circle cx="930" cy="315" r="170" fill="none" stroke="#67c6e3" stroke-width="8" />
      <circle cx="930" cy="315" r="188" fill="none" stroke="#26364a" stroke-width="2" />
      <text x="760" y="548" fill="#92a2b7" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="24" font-weight="700">ahmed-hindy.github.io</text>
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
