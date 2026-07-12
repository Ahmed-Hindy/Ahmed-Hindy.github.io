import { Feed } from 'feed'
import { queryCollection } from '@nuxt/content/server'
import { absoluteUrl, site } from '~~/app/data/site'

export default defineEventHandler(async (event) => {
  const articles = await queryCollection(event, 'blog').where('draft', '=', false).order('date', 'DESC').all()
  const feed = new Feed({
    title: 'Ahmed Hindy — Blog',
    description: 'Technical notes about Houdini, USD, pipeline tooling, and production workflows.',
    id: site.siteUrl,
    link: `${site.siteUrl}/blog/`,
    language: 'en',
    copyright: `© ${new Date().getUTCFullYear()} ${site.authorName}`,
    author: { name: site.authorName },
    feedLinks: { rss2: `${site.siteUrl}/rss.xml` },
  })

  for (const article of articles) {
    feed.addItem({
      title: article.title,
      id: absoluteUrl(`${article.path}/`),
      link: absoluteUrl(`${article.path}/`),
      description: article.description,
      date: new Date(`${article.date}T00:00:00Z`),
      category: article.tags.map((name) => ({ name })),
      author: [{ name: site.authorName }],
    })
  }

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return feed.rss2()
})
