import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { gunzipSync } from 'node:zlib'
import {
  blogRouteFromRelativeFile,
  isDraftArticleSource,
  normalizeBlogRelativePath,
} from '../shared/blog-content.ts'

const siteUrl = 'https://ahmed-hindy.github.io'
const outputDirectory = path.resolve('.output/public')
const contentDirectory = path.resolve('content/blog')
const contentDumpPath = '__nuxt_content/blog/sql_dump.txt'
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

const fail = (message) => {
  throw new Error(`Static output validation failed: ${message}`)
}

const outputPath = (filePath) => path.join(outputDirectory, filePath)
const fileExists = async (filePath) => access(outputPath(filePath)).then(() => true).catch(() => false)
const requireFile = async (filePath) => {
  if (!await fileExists(filePath)) {
    fail(`missing ${filePath}`)
  }
}
const readOutput = (filePath) => readFile(outputPath(filePath), 'utf8')
const getTags = (html, tagName) => html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'g')) ?? []
const getAttribute = (tag, attribute) => tag.match(new RegExp(`\\b${attribute}="([^"]*)"`))?.[1]
const getMetaContent = (html, key) => {
  const tag = getTags(html, 'meta').find((metaTag) =>
    getAttribute(metaTag, 'name') === key || getAttribute(metaTag, 'property') === key,
  )
  return tag ? getAttribute(tag, 'content') : undefined
}
const outputFileForRoute = (route) => {
  const routePath = route.replace(/^\//, '').replace(/\/$/, '')
  return routePath ? `${routePath}/index.html` : 'index.html'
}
const absoluteRoute = (route) => new URL(route, `${siteUrl}/`).toString()

const draftDetectionCases = [
  { name: 'lowercase draft', source: '---\ndraft: true\n---\n', expected: true },
  { name: 'title-case draft', source: '---\ndraft: True\n---\n', expected: true },
  { name: 'uppercase draft', source: '---\ndraft: TRUE # unpublished\n---\n', expected: true },
  { name: 'body-only draft text', source: '---\ndraft: false\n---\n\n```yaml\ndraft: true\n```\n', expected: false },
]

for (const { name, source, expected } of draftDetectionCases) {
  if (isDraftArticleSource(source) !== expected) {
    fail(`draft detection failed for ${name}`)
  }
}

for (const filePath of requiredFiles) {
  await requireFile(filePath)
}

const markdownFiles = (await readdir(contentDirectory, { recursive: true }))
  .filter((filePath) => filePath.toLowerCase().endsWith('.md'))
  .map(normalizeBlogRelativePath)
  .sort()
const articles = await Promise.all(markdownFiles.map(async (relativePath) => {
  const source = await readFile(path.join(contentDirectory, relativePath), 'utf8')
  const route = blogRouteFromRelativeFile(relativePath)
  return {
    relativePath,
    route,
    outputFile: outputFileForRoute(route),
    draft: isDraftArticleSource(source),
  }
}))
const publishedArticles = articles.filter(({ draft }) => !draft)
const draftArticles = articles.filter(({ draft }) => draft)

for (const { outputFile } of publishedArticles) {
  await requireFile(outputFile)
}

const homepage = await readOutput('index.html')
const blogIndex = await readOutput('blog/index.html')
const notFound = await readOutput('404.html')
const sitemap = await readOutput('sitemap.xml')
const rss = await readOutput('rss.xml')
const pages = [
  { filePath: 'index.html', route: '/', html: homepage, article: false },
  { filePath: 'blog/index.html', route: '/blog/', html: blogIndex, article: false },
]
for (const article of publishedArticles) {
  pages.push({
    filePath: article.outputFile,
    route: article.route,
    html: await readOutput(article.outputFile),
    article: true,
  })
}

for (const { filePath, route, html, article } of pages) {
  if (!/<title>[^<]+<\/title>/.test(html)) {
    fail(`${filePath} has no title`)
  }
  if (!getMetaContent(html, 'description')) {
    fail(`${filePath} has no description`)
  }
  if (/noindex/i.test(getMetaContent(html, 'robots') ?? '')) {
    fail(`${filePath} is marked noindex`)
  }

  const canonicalTags = getTags(html, 'link').filter((tag) => getAttribute(tag, 'rel') === 'canonical')
  const expectedUrl = absoluteRoute(route)
  if (canonicalTags.length !== 1 || getAttribute(canonicalTags[0], 'href') !== expectedUrl) {
    fail(`${filePath} has an invalid canonical`)
  }
  if (getMetaContent(html, 'og:url') !== expectedUrl) {
    fail(`${filePath} has an invalid Open Graph URL`)
  }

  const urlReferences = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1])
  if (urlReferences.some((reference) => reference.includes('/Ahmed-Hindy.github.io/'))) {
    fail(`${filePath} contains a repository-subpath deployment URL`)
  }
  const assetReferences = [...html.matchAll(/<(?:script|link|img|source)\b[^>]*(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
  if (assetReferences.some((reference) => /^https?:\/\/localhost(?::|\/|$)/i.test(reference))) {
    fail(`${filePath} references a localhost asset`)
  }

  if (article) {
    if (!html.includes('BlogPosting') || !html.includes('<article class="prose">')) {
      fail(`${filePath} is missing prerendered article metadata or content`)
    }
    if (!blogIndex.includes(`href="${route}"`)) {
      fail(`${filePath} is missing from the blog index`)
    }
    if (!sitemap.includes(expectedUrl)) {
      fail(`${filePath} is missing from the sitemap`)
    }
    if (!rss.includes(expectedUrl)) {
      fail(`${filePath} is missing from RSS`)
    }
  }
}

if (!/noindex/i.test(notFound)) {
  fail('404 page is indexable')
}
if (!sitemap.includes(`${siteUrl}/`) || !sitemap.includes(`${siteUrl}/blog/`)) {
  fail('sitemap is missing public routes')
}
if (!rss.includes('<rss')) {
  fail('RSS feed is not valid RSS output')
}
if (!/Sitemap: https:\/\/ahmed-hindy\.github\.io\/sitemap\.xml/.test(await readOutput('robots.txt'))) {
  fail('robots.txt has the wrong sitemap URL')
}
if (!homepage.includes('rel="alternate"') || !homepage.includes('type="application/rss+xml"')) {
  fail('RSS discovery metadata is missing')
}

const encodedDump = await readOutput(contentDumpPath)
const contentDump = gunzipSync(Buffer.from(encodedDump.trim(), 'base64')).toString('utf8')
const contentIds = new Set(
  [...contentDump.matchAll(/INSERT INTO _content_blog VALUES \('([^']+)'/g)].map((match) => match[1]),
)
for (const { relativePath, route, outputFile } of publishedArticles) {
  const expectedContentId = `blog/blog/${relativePath}`
  if (!contentIds.has(expectedContentId)) {
    fail(`${route} is missing from the generated content database`)
  }
  if (!await fileExists(outputFile)) {
    fail(`${route} was not prerendered`)
  }
}
for (const { relativePath, route, outputFile } of draftArticles) {
  const expectedContentId = `blog/blog/${relativePath}`
  if (contentIds.has(expectedContentId)) {
    fail(`${relativePath} leaked into the generated content database`)
  }
  if (await fileExists(outputFile)) {
    fail(`${relativePath} was prerendered despite being a draft`)
  }
  const publicUrl = absoluteRoute(route)
  if (blogIndex.includes(`href="${route}"`) || sitemap.includes(publicUrl) || rss.includes(publicUrl)) {
    fail(`${relativePath} leaked into a public index`)
  }
}

const outputFiles = (await readdir(outputDirectory, { recursive: true })).map(normalizeBlogRelativePath)
if (!outputFiles.some((filePath) => filePath.startsWith('_nuxt/'))) {
  fail('Nuxt assets are missing')
}
const htmlFiles = outputFiles.filter((filePath) => filePath.endsWith('.html'))
for (const filePath of htmlFiles) {
  const html = await readOutput(filePath)
  const references = [...html.matchAll(/<(?:script|link|img|source)\b[^>]*(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|#|\/\/)/.test(reference)) {
      continue
    }
    const localPath = reference.split(/[?#]/, 1)[0].replace(/^\//, '')
    if (localPath) {
      await requireFile(localPath)
    }
  }
}

console.log(`Static output validation passed for ${publishedArticles.length} published article(s).`)
