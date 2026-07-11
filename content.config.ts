import { defineCollection, defineCollectionSource, defineContentConfig, z } from '@nuxt/content'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a YYYY-MM-DD date.')
const includeDrafts = process.env.NODE_ENV !== 'production'
let blogRoot = ''

const publishedBlogSource = defineCollectionSource({
  prepare: ({ rootDir }) => {
    blogRoot = join(rootDir, 'content', 'blog')
  },
  getKeys: async () => {
    const entries = await readdir(blogRoot, { recursive: true })
    const markdownFiles = entries.filter((entry) => entry.endsWith('.md')).sort()
    if (includeDrafts) {
      return markdownFiles.map((file) => `blog/${file}`)
    }

    const publicationStates = await Promise.all(
      markdownFiles.map(async (file) => ({
        file,
        source: await readFile(join(blogRoot, file), 'utf8'),
      })),
    )
    return publicationStates
      .filter(({ source }) => !/^---[\s\S]*?^draft:\s*true\s*$/m.test(source))
      .map(({ file }) => `blog/${file}`)
  },
  getItem: (file) => readFile(join(blogRoot, file.replace(/^blog\//, '')), 'utf8'),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: publishedBlogSource,
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: isoDate,
        updated: isoDate.optional(),
        tags: z.array(z.string()),
        draft: z.boolean(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        canonical: z.string().url().optional(),
      }),
    }),
  },
})
