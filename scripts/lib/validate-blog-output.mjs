import { gunzipSync } from 'node:zlib'
import { getBlogArticleStatus } from '../../shared/blog-content.ts'
import { isIgnoredBlogPath, readBlogManifest } from '../../shared/blog-manifest.ts'
import {
  createStaticOutputContext,
  fail,
  getMetaContent,
  outputFileForRoute,
} from './static-output-helpers.mjs'

const validateStatusParser = () => {
  const cases = [
    { name: 'published status', source: '---\nstatus: published\n---\n', expected: 'published' },
    { name: 'draft status with comment', source: '---\nstatus: draft # local preview\n---\n', expected: 'draft' },
    { name: 'double-quoted status', source: '---\nstatus: "draft"\n---\n', expected: 'draft' },
    { name: 'single-quoted status', source: "---\nstatus: 'published'\n---\n", expected: 'published' },
    { name: 'unsupported ignored status', source: '---\nstatus: ignored\n---\n', expected: null },
    { name: 'body-only status text', source: '---\nstatus: published\n---\n\n```yaml\nstatus: draft\n```\n', expected: 'published' },
    { name: 'legacy draft field', source: '---\ndraft: true\n---\n', expected: null },
  ]

  for (const { name, source, expected } of cases) {
    if (getBlogArticleStatus(source) !== expected) {
      fail(`status detection failed for ${name}`)
    }
  }

  if (!isIgnoredBlogPath('_ignored/example.md') || isIgnoredBlogPath('ignored/example.md')) {
    fail('_ignored/ path detection is inconsistent')
  }
}

export const validateBlogOutput = async ({
  blogIndex,
  contentDirectory,
  contentDumpPath,
  outputDirectory,
  rss,
  sitemap,
  siteUrl,
}) => {
  validateStatusParser()

  const context = createStaticOutputContext({ outputDirectory, siteUrl })
  const manifest = readBlogManifest(contentDirectory).map((entry) => ({
    ...entry,
    outputFile: outputFileForRoute(entry.route),
  }))
  const ignoredArticles = manifest.filter(({ ignored }) => ignored)
  const articles = manifest.filter(({ ignored }) => !ignored)

  for (const { relativePath, status } of articles) {
    if (!status) {
      fail(`${relativePath} is missing a valid status`)
    }
  }

  const publishedArticles = articles.filter(({ status }) => status === 'published')
  const draftArticles = articles.filter(({ status }) => status === 'draft')

  for (const article of [...publishedArticles, ...draftArticles]) {
    await context.requireFile(article.outputFile)
    const html = await context.readOutput(article.outputFile)
    const expectedUrl = context.absoluteRoute(article.route)
    const isDraft = article.status === 'draft'

    context.validatePageMetadata({
      filePath: article.outputFile,
      route: article.route,
      html,
      robotsPolicy: isDraft ? 'unlisted' : 'indexable',
    })

    if (!html.includes('<article class="prose">')) {
      fail(`${article.outputFile} is missing prerendered article content`)
    }

    const publishedTime = getMetaContent(html, 'article:published_time')
    const modifiedTime = getMetaContent(html, 'article:modified_time')
    const openGraphType = getMetaContent(html, 'og:type')

    if (isDraft) {
      if (!html.includes('article-draft-label')) {
        fail(`${article.outputFile} is missing its visible draft label`)
      }
      if (!html.includes('"@type":"WebPage"') || html.includes('"@type":"BlogPosting"')) {
        fail(`${article.outputFile} has published-article structured data`)
      }
      if (publishedTime || modifiedTime || openGraphType !== 'website') {
        fail(`${article.outputFile} has published-article metadata`)
      }
      if (blogIndex.includes(`href="${article.route}"`) || sitemap.includes(expectedUrl) || rss.includes(expectedUrl)) {
        fail(`${article.outputFile} leaked into a public index`)
      }
    } else {
      if (!html.includes('"@type":"BlogPosting"')) {
        fail(`${article.outputFile} is missing BlogPosting structured data`)
      }
      if (!publishedTime || !modifiedTime || openGraphType !== 'article') {
        fail(`${article.outputFile} is missing published-article metadata`)
      }
      if (!blogIndex.includes(`href="${article.route}"`)) {
        fail(`${article.outputFile} is missing from the blog index`)
      }
      if (!sitemap.includes(expectedUrl)) {
        fail(`${article.outputFile} is missing from the sitemap`)
      }
      if (!rss.includes(expectedUrl)) {
        fail(`${article.outputFile} is missing from RSS`)
      }
    }
  }

  const encodedDump = await context.readOutput(contentDumpPath)
  const contentDump = gunzipSync(Buffer.from(encodedDump.trim(), 'base64')).toString('utf8')
  const contentIds = new Set(
    [...contentDump.matchAll(/INSERT INTO _content_blog VALUES \('([^']+)'/g)].map((match) => match[1]),
  )

  for (const { relativePath, route, outputFile } of [...publishedArticles, ...draftArticles]) {
    const expectedContentId = `blog/blog/${relativePath}`
    if (!contentIds.has(expectedContentId)) {
      fail(`${route} is missing from the generated content database`)
    }
    if (!await context.fileExists(outputFile)) {
      fail(`${route} was not prerendered`)
    }
  }

  for (const { relativePath, route, outputFile } of ignoredArticles) {
    const expectedContentId = `blog/blog/${relativePath}`
    if (contentIds.has(expectedContentId)) {
      fail(`${relativePath} leaked into the generated content database`)
    }
    if (await context.fileExists(outputFile)) {
      fail(`${relativePath} was prerendered despite being in _ignored/`)
    }
    const publicUrl = context.absoluteRoute(route)
    if (blogIndex.includes(`href="${route}"`) || sitemap.includes(publicUrl) || rss.includes(publicUrl)) {
      fail(`${relativePath} leaked into a public index`)
    }
  }

  return {
    articleOutputFiles: [...publishedArticles, ...draftArticles].map(({ outputFile }) => outputFile),
    draftCount: draftArticles.length,
    publishedCount: publishedArticles.length,
  }
}
