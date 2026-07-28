import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { normalizeBlogRelativePath } from '../shared/blog-content.ts'
import {
  createStaticOutputContext,
  fail,
  getAssetReferences,
  getAttribute,
  getTags,
} from './lib/static-output-helpers.mjs'
import { validateBlogOutput } from './lib/validate-blog-output.mjs'

const siteUrl = 'https://ahmed-hindy.github.io'
const outputDirectory = path.resolve('.output/public')
const contentDirectory = path.resolve('content/blog')
const contentDumpPath = '__nuxt_content/blog/sql_dump.txt'
const maximumRuntimeAssetBytes = 1_000_000
const requiredFiles = [
  'index.html',
  'blog/index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'rss.xml',
  '.nojekyll',
  contentDumpPath,
]

const context = createStaticOutputContext({ outputDirectory, siteUrl })

for (const filePath of requiredFiles) {
  await context.requireFile(filePath)
}

const homepage = await context.readOutput('index.html')
const blogIndex = await context.readOutput('blog/index.html')
const notFound = await context.readOutput('404.html')
const robots = await context.readOutput('robots.txt')
const sitemap = await context.readOutput('sitemap.xml')
const rss = await context.readOutput('rss.xml')

context.validatePageMetadata({ filePath: 'index.html', route: '/', html: homepage })
context.validatePageMetadata({ filePath: 'blog/index.html', route: '/blog/', html: blogIndex })

const projectWebpSources = [
  '/projects/renderkit/renderkit-ui-screenshot-640w.webp',
  '/projects/substance-painter-usd-creator/substance-painter-usd-creator-640w.webp',
  '/projects/houdini-usd-utilities/arnold-husd-translator-640w.webp',
  '/projects/kitsu-desktop/kitsu-dashboard-640w.webp',
]
const homepageSources = getTags(homepage, 'source')
for (const source of projectWebpSources) {
  if (!homepageSources.some((tag) => getAttribute(tag, 'type') === 'image/webp' && getAttribute(tag, 'srcset')?.includes(source))) {
    fail(`homepage is missing responsive WebP source ${source}`)
  }
}
for (const image of getTags(homepage, 'img').filter((tag) => getAttribute(tag, 'src')?.startsWith('/projects/'))) {
  if (!getAttribute(image, 'width') || !getAttribute(image, 'height')) {
    fail(`project image ${getAttribute(image, 'src')} is missing intrinsic dimensions`)
  }
  if (getAttribute(image, 'loading') !== 'lazy' || getAttribute(image, 'decoding') !== 'async') {
    fail(`project image ${getAttribute(image, 'src')} is missing deferred loading attributes`)
  }
}
if (!getTags(homepage, 'video').some((tag) => getAttribute(tag, 'preload') === 'none')) {
  fail('homepage video is not deferred')
}
if (!getTags(homepage, 'video').some((tag) => getAttribute(tag, 'poster') === '/projects/h-denoise-utils/demo-poster-640w.webp')) {
  fail('homepage video is missing the optimized poster')
}

const { draftCount, publishedCount } = await validateBlogOutput({
  blogIndex,
  contentDirectory,
  contentDumpPath,
  outputDirectory,
  rss,
  sitemap,
  siteUrl,
})

if (!/noindex/i.test(notFound)) {
  fail('404 page is indexable')
}
if (!sitemap.includes(`${siteUrl}/`) || !sitemap.includes(`${siteUrl}/blog/`)) {
  fail('sitemap is missing public routes')
}
if (!rss.includes('<rss')) {
  fail('RSS feed is not valid RSS output')
}
if (!/Sitemap: https:\/\/ahmed-hindy\.github\.io\/sitemap\.xml/.test(robots)) {
  fail('robots.txt has the wrong sitemap URL')
}
if (!/Disallow:\s*\/__nuxt_content\//.test(robots)) {
  fail('robots.txt does not block the generated content database')
}
if (!homepage.includes('rel="alternate"') || !homepage.includes('type="application/rss+xml"')) {
  fail('RSS discovery metadata is missing')
}
const profileImageHints = getTags(homepage, 'link').filter((tag) => {
  const rel = getAttribute(tag, 'rel')
  return (rel === 'preload' || rel === 'prefetch')
    && getAttribute(tag, 'as') === 'image'
    && tag.includes('profile')
})
if (profileImageHints.length > 1) {
  fail('homepage preloads or prefetches multiple profile image variants')
}

const outputFiles = (await readdir(outputDirectory, { recursive: true })).map(normalizeBlogRelativePath)
if (!outputFiles.some((filePath) => filePath.startsWith('_nuxt/'))) {
  fail('Nuxt assets are missing')
}
const runtimeAssetFiles = outputFiles.filter((filePath) =>
  filePath.startsWith('_nuxt/') && /\.(?:js|wasm)$/i.test(filePath),
)
const databaseRuntimeFiles = runtimeAssetFiles.filter((filePath) => /(?:sqlite|opfs|worker)/i.test(filePath))
if (databaseRuntimeFiles.length) {
  fail(`browser database runtime leaked into output: ${databaseRuntimeFiles.join(', ')}`)
}
const runtimeAssetBytes = (await Promise.all(
  runtimeAssetFiles.map((filePath) => stat(context.outputPath(filePath)).then((file) => file.size)),
)).reduce((total, fileSize) => total + fileSize, 0)
if (runtimeAssetBytes > maximumRuntimeAssetBytes) {
  fail(`JavaScript/WASM runtime is ${runtimeAssetBytes} bytes; budget is ${maximumRuntimeAssetBytes} bytes`)
}

const htmlFiles = outputFiles.filter((filePath) => filePath.endsWith('.html'))
for (const filePath of htmlFiles) {
  const html = await context.readOutput(filePath)
  for (const reference of getAssetReferences(html)) {
    if (/^(?:https?:|mailto:|tel:|#|\/\/)/.test(reference)) {
      continue
    }
    const localPath = reference.split(/[?#]/, 1)[0].replace(/^\//, '')
    if (localPath) {
      await context.requireFile(localPath)
    }
  }
}

console.log(
  `Static output validation passed for ${publishedCount} published and ${draftCount} unlisted draft article(s): ${runtimeAssetBytes} JavaScript/WASM bytes.`,
)
