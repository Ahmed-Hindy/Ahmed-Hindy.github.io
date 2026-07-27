import { access, readFile } from 'node:fs/promises'
import path from 'node:path'

export const fail = (message) => {
  throw new Error(`Static output validation failed: ${message}`)
}

export const getTags = (html, tagName) => html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'g')) ?? []

export const getAttribute = (tag, attribute) =>
  tag.match(new RegExp(`\\b${attribute}="([^"]*)"`))?.[1]

const decodeHtmlAttribute = (value) => value.replaceAll('&amp;', '&')

export const getAssetReferences = (html) => {
  const directReferences = [...html.matchAll(/<(?:script|link|img|source|video)\b[^>]*(?:src|href|poster)="([^"]+)"/g)]
    .map((match) => decodeHtmlAttribute(match[1]))
  const srcsetReferences = [...html.matchAll(/\bsrcset="([^"]+)"/g)]
    .flatMap((match) => decodeHtmlAttribute(match[1]).split(','))
    .map((candidate) => candidate.trim().split(/\s+/, 1)[0])
    .filter(Boolean)

  return [...directReferences, ...srcsetReferences]
}

export const getMetaContent = (html, key) => {
  const tag = getTags(html, 'meta').find((metaTag) =>
    getAttribute(metaTag, 'name') === key || getAttribute(metaTag, 'property') === key,
  )
  return tag ? getAttribute(tag, 'content') : undefined
}

export const outputFileForRoute = (route) => {
  const routePath = route.replace(/^\//, '').replace(/\/$/, '')
  return routePath ? `${routePath}/index.html` : 'index.html'
}

export const createStaticOutputContext = ({ outputDirectory, siteUrl }) => {
  const outputPath = (filePath) => path.join(outputDirectory, filePath)
  const fileExists = async (filePath) => access(outputPath(filePath)).then(() => true).catch(() => false)
  const requireFile = async (filePath) => {
    if (!await fileExists(filePath)) {
      fail(`missing ${filePath}`)
    }
  }
  const readOutput = (filePath) => readFile(outputPath(filePath), 'utf8')
  const absoluteRoute = (route) => new URL(route, `${siteUrl}/`).toString()

  const validatePageMetadata = ({ filePath, route, html, robotsPolicy = 'indexable' }) => {
    if (!/<title>[^<]+<\/title>/.test(html)) {
      fail(`${filePath} has no title`)
    }
    if (!getMetaContent(html, 'description')) {
      fail(`${filePath} has no description`)
    }

    const robots = getMetaContent(html, 'robots') ?? ''
    if (robotsPolicy === 'unlisted') {
      if (!/noindex/i.test(robots) || !/nofollow/i.test(robots)) {
        fail(`${filePath} is unlisted without noindex, nofollow`)
      }
    } else if (/noindex/i.test(robots)) {
      fail(`${filePath} is marked noindex`)
    }

    const canonicalTags = getTags(html, 'link').filter((tag) => getAttribute(tag, 'rel') === 'canonical')
    const expectedUrl = absoluteRoute(route)
    if (canonicalTags.length !== 1 || getAttribute(canonicalTags[0], 'href') !== expectedUrl) {
      fail(`${filePath} has an invalid canonical`)
    }
    if (getMetaContent(html, 'og:url') !== expectedUrl) {
      fail(`${filePath} has an invalid Open Graph URL`)
    }

    const urlReferences = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1])
    if (urlReferences.some((reference) => reference.includes('/Ahmed-Hindy.github.io/'))) {
      fail(`${filePath} contains a repository-subpath deployment URL`)
    }
    const assetReferences = getAssetReferences(html)
    if (assetReferences.some((reference) => /^https?:\/\/localhost(?::|\/|$)/i.test(reference))) {
      fail(`${filePath} references a localhost asset`)
    }
  }

  return {
    absoluteRoute,
    fileExists,
    outputPath,
    readOutput,
    requireFile,
    validatePageMetadata,
  }
}
