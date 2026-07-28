import { defineCollection, defineCollectionSource, defineContentConfig, z } from '@nuxt/content'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getDeployableBlogEntries } from './shared/blog-manifest'

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a YYYY-MM-DD date.')
const isDevelopment = process.env.NODE_ENV === 'development'
let blogRoot = ''

const deployableBlogSource = defineCollectionSource({
  prepare: ({ rootDir }) => {
    blogRoot = join(rootDir, 'content', 'blog')
  },
  getKeys: () =>
    getDeployableBlogEntries(blogRoot).map(({ relativePath }) => `blog/${relativePath}`),
  getItem: (file) => readFile(join(blogRoot, file.replace(/^blog\//, '')), 'utf8'),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      // Standard filesystem sources retain Nuxt Content hot reload in development.
      // The ignored holding area is never loaded. Production includes published and
      // draft content so drafts can be shared by direct URL without being indexed.
      source: isDevelopment
        ? { include: 'blog/**/*.md', exclude: ['blog/_ignored/**'] }
        : deployableBlogSource,
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
