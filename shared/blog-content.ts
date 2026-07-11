const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/
const draftFieldPattern = /^draft:\s*true(?:\s+#.*)?\s*$/m

export const normalizeBlogRelativePath = (filePath: string) => filePath.replaceAll('\\', '/')

export const extractFrontmatter = (source: string) => source.match(frontmatterPattern)?.[1] ?? ''

export const isDraftArticleSource = (source: string) => draftFieldPattern.test(extractFrontmatter(source))

export const blogRouteFromRelativeFile = (filePath: string) => {
  const normalizedPath = normalizeBlogRelativePath(filePath).replace(/\.md$/i, '')
  const routePath = normalizedPath === 'index'
    ? ''
    : normalizedPath.endsWith('/index')
      ? normalizedPath.slice(0, -'/index'.length)
      : normalizedPath

  return routePath ? `/blog/${routePath}/` : '/blog/'
}
