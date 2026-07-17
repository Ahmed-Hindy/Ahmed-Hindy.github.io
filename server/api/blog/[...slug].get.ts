import { queryCollection } from '@nuxt/content/server'

const isDevelopment = process.env.NODE_ENV === 'development'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const path = `/blog/${slug}`
  const articleQuery = queryCollection(event, 'blog').path(path)
  const article = await (isDevelopment
    ? articleQuery.first()
    : articleQuery.where('status', '=', 'published').first())

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  const navigationQuery = queryCollection(event, 'blog')
    .select('path', 'title', 'date')
    .order('date', 'DESC')
  const navigation = await (isDevelopment
    ? navigationQuery.all()
    : navigationQuery.where('status', '=', 'published').all())
  const articleIndex = navigation.findIndex(({ path: articlePath }) => articlePath === article.path)

  return {
    article,
    newer: navigation[articleIndex - 1] ?? null,
    older: navigation[articleIndex + 1] ?? null,
  }
})
