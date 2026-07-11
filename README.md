# Ahmed Hindy Portfolio

Static portfolio and technical blog built with Nuxt, Nuxt Content, Vue, and Bun. GitHub Pages publishes the fully prerendered `.output/public` artifact; no runtime server is required.

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

## Validate a production build

```sh
bun run typecheck
bun run build
bun run validate:output
bunx serve .output/public
```

## Write an article

Create a draft from a lowercase kebab-case slug:

```sh
bun run new:post usd-publishing-workflows
```

The command creates `content/blog/usd-publishing-workflows.md`, rejects duplicate or invalid slugs, uses the current Cairo date, and keeps the article unpublished with `draft: true`.

```md
---
title: "Article title"
description: "A concise summary for readers and search engines."
date: "2026-07-11"
updated: "2026-07-11"
tags:
  - Houdini
  - USD
draft: true
---

Article content goes here.
```

Required fields are `title`, `description`, `date`, `tags`, and `draft`. Dates use `YYYY-MM-DD`. Drafts are excluded from the blog index, sitemap, RSS feed, and production output. Set `draft: false` only when the article is ready to publish. Put article images in `public/blog/images/` and use root-relative paths such as `/blog/images/example.webp`.

Changing a published filename changes its URL, so keep published slugs stable. Draft filtering reads only the leading frontmatter block, so examples in the article body may safely contain text such as `draft: true`.

## Deployment and indexing

Push or merge to `main`. GitHub Actions type-checks the project, builds the GitHub Pages preset, validates `.output/public`, and deploys that directory from the root base path `/`.

To enable Google Search Console verification, set `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION` as a GitHub Actions variable, deploy, then submit `https://ahmed-hindy.github.io/sitemap.xml`. Indexing is controlled by search engines and is not immediate.

## Asset optimization

```sh
bun run optimize:assets
```
