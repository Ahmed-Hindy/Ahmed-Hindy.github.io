import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler((event) =>
  queryCollection(event, 'blog')
    .where('draft', '=', false)
    .select('path', 'title', 'description', 'date', 'tags', 'draft')
    .order('date', 'DESC')
    .all(),
)
