const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/
const statusFieldPattern = /^status:\s*(published|draft|ignored)(?:\s+#.*)?\s*$/m

export const blogArticleStatuses = ['published', 'draft', 'ignored'] as const
export type BlogArticleStatus = typeof blogArticleStatuses[number]

export const normalizeBlogRelativePath = (filePath: string) => filePath.replaceAll('\\', '/')

export const extractFrontmatter = (source: string) => source.match(frontmatterPattern)?.[1] ?? ''

export const getBlogArticleStatus = (source: string): BlogArticleStatus | null =>
  extractFrontmatter(source).match(statusFieldPattern)?.[1] as BlogArticleStatus | undefined ?? null

export const blogRouteFromRelativeFile = (filePath: string) => {
  const normalizedPath = normalizeBlogRelativePath(filePath).replace(/\.md$/i, '')
  const routePath = normalizedPath === 'index'
    ? ''
    : normalizedPath.endsWith('/index')
      ? normalizedPath.slice(0, -'/index'.length)
      : normalizedPath

  return routePath ? `/blog/${routePath}/` : '/blog/'
}
