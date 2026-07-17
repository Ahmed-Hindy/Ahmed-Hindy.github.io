import { queryCollection } from '@nuxt/content/server'

const isDevelopment = process.env.NODE_ENV === 'development'

export default defineEventHandler((event) => {
  const articles = queryCollection(event, 'blog')
    .select('path', 'title', 'description', 'date', 'tags', 'status')
    .order('date', 'DESC')

  return isDevelopment
    ? articles.all()
    : articles.where('status', '=', 'published').all()
})
