import { defineCollection, defineCollectionSource, defineContentConfig, z } from '@nuxt/content'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { getBlogArticleStatus, normalizeBlogRelativePath } from './shared/blog-content'

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a YYYY-MM-DD date.')
const isDevelopment = process.env.NODE_ENV === 'development'
let blogRoot = ''

const publishedBlogSource = defineCollectionSource({
  prepare: ({ rootDir }) => {
    blogRoot = join(rootDir, 'content', 'blog')
  },
  getKeys: async () => {
    const entries = await readdir(blogRoot, { recursive: true })
    const markdownFiles = entries.filter((entry) => entry.endsWith('.md')).sort()
    const publicationStates = await Promise.all(
      markdownFiles.map(async (file) => ({
        file,
        source: await readFile(join(blogRoot, file), 'utf8'),
      })),
    )
    return publicationStates
      .filter(({ source }) => getBlogArticleStatus(source) === 'published')
      .map(({ file }) => `blog/${normalizeBlogRelativePath(file)}`)
  },
  getItem: (file) => readFile(join(blogRoot, file.replace(/^blog\//, '')), 'utf8'),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      // Standard filesystem sources retain Nuxt Content hot reload in development.
      // The ignored holding area is never loaded; production additionally admits
      // only published content into its generated database.
      source: isDevelopment
        ? { include: 'blog/**/*.md', exclude: ['blog/_ignored/**'] }
        : publishedBlogSource,
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: isoDate,
        updated: isoDate.optional(),
        tags: z.array(z.string()),
        status: z.enum(['published', 'draft']),
        draft: z.never().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        canonical: z.string().url().optional(),
      }),
    }),
  },
})
