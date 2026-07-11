import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const reservedSlugs = new Set(['index'])
const titleAcronyms = new Set(['api', 'dcc', 'exr', 'fx', 'hda', 'pdg', 'ui', 'usd', 'vex'])
const blogDirectory = join(process.cwd(), 'content', 'blog')

const getCairoDate = () => {
  const dateParts = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'Africa/Cairo',
    year: 'numeric',
  }).formatToParts(new Date())
  const values = Object.fromEntries(dateParts.map(({ type, value }) => [type, value]))
  return `${values.year}-${values.month}-${values.day}`
}

const titleFromSlug = (slug: string) =>
  slug
    .split('-')
    .map((word) => titleAcronyms.has(word) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const createPost = async (slug: string) => {
  if (!slugPattern.test(slug)) {
    throw new Error('Use a lowercase kebab-case slug, for example: finding-large-houdini-nodes')
  }
  if (reservedSlugs.has(slug)) {
    throw new Error(`The slug "${slug}" is reserved by the blog index route.`)
  }

  const articlePath = join(blogDirectory, `${slug}.md`)
  const article = `---
title: ${JSON.stringify(titleFromSlug(slug))}
description: ""
date: "${getCairoDate()}"
tags: []
draft: true
---

Write the article here.
`

  await mkdir(blogDirectory, { recursive: true })
  await writeFile(articlePath, article, { encoding: 'utf8', flag: 'wx' })
  console.log(`Created ${articlePath}`)
}

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: bun run new:post <lowercase-kebab-case-slug>')
  process.exitCode = 1
} else {
  createPost(slug).catch((error: unknown) => {
    const errorCode = error && typeof error === 'object' && 'code' in error ? error.code : undefined
    const message = errorCode === 'EEXIST'
      ? `An article already exists for the slug "${slug}".`
      : error instanceof Error
        ? error.message
        : String(error)
    console.error(`Unable to create article: ${message}`)
    process.exitCode = 1
  })
}
