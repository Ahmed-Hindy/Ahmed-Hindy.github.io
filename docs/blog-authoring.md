# Blog Authoring

## Create a draft

Create a draft from a lowercase kebab-case slug:

```sh
bun run new:post usd-publishing-workflows
```

The command creates `content/blog/usd-publishing-workflows.md`, rejects duplicate or invalid slugs, uses the current Cairo date, and keeps the article unpublished with `draft: true`.

## Frontmatter

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

Required fields are `title`, `description`, `date`, `tags`, and `draft`. Dates use `YYYY-MM-DD`.

Drafts are excluded from the blog index, sitemap, RSS feed, and production output. Set `draft: false` only when the article is ready to publish.

Changing a published filename changes its URL, so keep published slugs stable. Draft filtering reads only the leading frontmatter block, so examples in the article body may safely contain text such as `draft: true`.

## Article images

Put article images in `public/blog/images/` and use root-relative paths such as `/blog/images/example.webp`.

Use semantic figure markup when an image needs a caption. Include intrinsic dimensions to prevent layout shift, use `decoding="async"`, and add `loading="lazy"` for below-the-fold figures:

```html
<figure>
  <img
    src="/blog/images/example.webp"
    alt="A concise description of the image"
    width="1600"
    height="900"
    loading="lazy"
    decoding="async"
  >
  <figcaption>Explain what the reader should notice.</figcaption>
</figure>
```

Do not lazy-load an image that is expected to appear in the initial viewport, because that can delay the largest contentful paint.
