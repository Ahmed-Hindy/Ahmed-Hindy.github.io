import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  blogRouteFromRelativeFile,
  getBlogArticleStatus,
  normalizeBlogRelativePath,
  type BlogArticleStatus,
} from './blog-content'

export type BlogManifestEntry = {
  relativePath: string
  route: string
  status: BlogArticleStatus | null
  ignored: boolean
}

export const isIgnoredBlogPath = (relativePath: string) => {
  const normalizedPath = normalizeBlogRelativePath(relativePath)
  return normalizedPath === '_ignored' || normalizedPath.startsWith('_ignored/')
}

export const readBlogManifest = (blogRoot: string): BlogManifestEntry[] =>
  readdirSync(blogRoot, { recursive: true, encoding: 'utf8' })
    .map(normalizeBlogRelativePath)
    .filter((relativePath) => relativePath.toLowerCase().endsWith('.md'))
    .sort()
    .map((relativePath) => ({
      relativePath,
      route: blogRouteFromRelativeFile(relativePath),
      status: getBlogArticleStatus(readFileSync(join(blogRoot, relativePath), 'utf8')),
      ignored: isIgnoredBlogPath(relativePath),
    }))

export const getDeployableBlogEntries = (blogRoot: string) =>
  readBlogManifest(blogRoot).filter(
    ({ ignored, status }) => !ignored && (status === 'published' || status === 'draft'),
  )

export const getDraftBlogRoutes = (blogRoot: string) =>
  getDeployableBlogEntries(blogRoot)
    .filter(({ status }) => status === 'draft')
    .map(({ route }) => route)
