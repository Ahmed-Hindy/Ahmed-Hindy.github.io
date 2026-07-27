const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/
const statusFieldPattern = /^status:\s*(?:(['"])(published|draft)\1|(published|draft))(?:\s+#.*)?\s*$/m

export const blogArticleStatuses = ['published', 'draft'] as const
export type BlogArticleStatus = typeof blogArticleStatuses[number]

export const normalizeBlogRelativePath = (filePath: string) => filePath.replaceAll('\\', '/')

export const extractFrontmatter = (source: string) => source.match(frontmatterPattern)?.[1] ?? ''

export const getBlogArticleStatus = (source: string): BlogArticleStatus | null => {
  const match = extractFrontmatter(source).match(statusFieldPattern)
  return (match?.[2] ?? match?.[3]) as BlogArticleStatus | undefined ?? null
}

export const blogRouteFromRelativeFile = (filePath: string) => {
  const normalizedPath = normalizeBlogRelativePath(filePath).replace(/\.md$/i, '')
  const routePath = normalizedPath === 'index'
    ? ''
    : normalizedPath.endsWith('/index')
      ? normalizedPath.slice(0, -'/index'.length)
      : normalizedPath

  return routePath ? `/blog/${routePath}/` : '/blog/'
}
