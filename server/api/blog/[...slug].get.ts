import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const path = `/blog/${slug}`
  const article = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .path(path)
    .first()

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  const navigation = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .select('path', 'title', 'date')
    .order('date', 'DESC')
    .all()
  const articleIndex = navigation.findIndex(({ path: articlePath }) => articlePath === article.path)

  return {
    article,
    newer: navigation[articleIndex - 1] ?? null,
    older: navigation[articleIndex + 1] ?? null,
  }
})
