import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const profileJpg = path.join(rootDir, 'src', 'assets', 'profile.jpg')
const profileWebp = path.join(rootDir, 'src', 'assets', 'profile.webp')
const openGraphImage = path.join(rootDir, 'public', 'og-image.jpg')
const profileJpgTemp = path.join(rootDir, 'src', 'assets', 'profile.tmp.jpg')

const formatBytes = (bytes) => `${Math.round(bytes / 1024)} KB`

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

const writeProfileWebp = async () => {
  const webpBuffer = await sharp(profileJpg)
    .rotate()
    .resize(600, 600, { fit: 'cover' })
    .webp({
      quality: 82,
      smartSubsample: true,
    })
    .toBuffer()

  await fs.writeFile(profileWebp, webpBuffer)
  console.log(`profile.webp ${formatBytes(webpBuffer.byteLength)}`)
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
  console.log(`og-image.jpg ${formatBytes(imageBuffer.byteLength)}`)
}

await optimizeProfileJpg()
await writeProfileWebp()
await writeOpenGraphImage()
