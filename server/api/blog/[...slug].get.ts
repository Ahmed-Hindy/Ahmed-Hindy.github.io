import { queryCollection } from '@nuxt/content/server'

const isDevelopment = process.env.NODE_ENV === 'development'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const path = `/blog/${slug}`
  const article = await queryCollection(event, 'blog').path(path).first()

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
    newer: articleIndex > 0 ? navigation[articleIndex - 1] : null,
    older: articleIndex >= 0 ? navigation[articleIndex + 1] ?? null : null,
  }
})
