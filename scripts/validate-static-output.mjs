import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { gunzipSync } from 'node:zlib'

const output = path.resolve('.output/public')
const required = ['index.html', 'blog/index.html', '404.html', 'robots.txt', 'sitemap.xml', 'rss.xml', '.nojekyll']
const fail = (message) => { throw new Error(`Static output validation failed: ${message}`) }
const exists = async (file) => access(path.join(output, file)).catch(() => fail(`missing ${file}`))
const read = (file) => readFile(path.join(output, file), 'utf8')

for (const file of required) await exists(file)

const index = await read('index.html')
const blog = await read('blog/index.html')
const notFound = await read('404.html')
const sitemap = await read('sitemap.xml')
const rss = await read('rss.xml')
const articlePath = 'blog/example-article/index.html'
await exists(articlePath)
const article = await read(articlePath)
const pages = { 'index.html': index, 'blog/index.html': blog, [articlePath]: article }

for (const [file, html] of Object.entries(pages)) {
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${file} has no title`)
  if (!/<meta[^>]+name="description"[^>]+content="[^"]+"/.test(html)) fail(`${file} has no description`)
  const canonicals = html.match(/<link[^>]+rel="canonical"[^>]*>/g) ?? []
  if (canonicals.length !== 1 || !canonicals[0].includes('https://ahmed-hindy.github.io/')) fail(`${file} has an invalid canonical`)
  if (html.includes('localhost') || html.includes('/Ahmed-Hindy.github.io/')) fail(`${file} contains an invalid deployment URL`)
}

if (!/noindex/.test(notFound)) fail('404 page is indexable')
if (!sitemap.includes('https://ahmed-hindy.github.io/') || !sitemap.includes('https://ahmed-hindy.github.io/blog/')) fail('sitemap is missing public routes')
if (!sitemap.includes('https://ahmed-hindy.github.io/blog/example-article/')) fail('sitemap is missing the published article')
if (!rss.includes('<rss')) fail('RSS feed is not valid RSS output')
if (!rss.includes('https://ahmed-hindy.github.io/blog/example-article/')) fail('RSS is missing the published article')
if (!article.includes('Small Python and VEX Examples for Houdini') || !article.includes('BlogPosting')) fail('article metadata is incomplete')
if (!article.includes('Updated') || !article.includes('velocity-based color ramp')) fail('article body was not prerendered')
if (!/Sitemap: https:\/\/ahmed-hindy\.github\.io\/sitemap\.xml/.test(await read('robots.txt'))) fail('robots.txt has the wrong sitemap URL')

const files = await readdir(output, { recursive: true })
if (!files.some((file) => file.startsWith('_nuxt'))) fail('Nuxt assets are missing')
const htmlFiles = files.filter((file) => file.endsWith('.html'))
for (const file of htmlFiles) {
  const html = await read(file)
  const references = [...html.matchAll(/<(?:script|link|img|source)\b[^>]*(?:src|href)="([^"]+)"/g)].map((match) => match[1])
  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|#|\/\/)/.test(reference)) continue
    const localPath = reference.split(/[?#]/, 1)[0].replace(/^\//, '')
    if (localPath) await exists(localPath)
  }
}

const contentDumpPath = '__nuxt_content/blog/sql_dump.txt'
if (files.includes(contentDumpPath)) {
  const encodedDump = await read(contentDumpPath)
  const dump = gunzipSync(Buffer.from(encodedDump.trim(), 'base64')).toString('utf8')
  if (dump.includes('draft\' BOOLEAN') && dump.includes('true')) fail('draft content leaked into the client content dump')
}
console.log('Static output validation passed.')
