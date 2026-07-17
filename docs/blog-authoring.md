# Blog Authoring

## Create a draft

Create a draft from a lowercase kebab-case slug:

```sh
bun run new:post usd-publishing-workflows
```

The command creates `content/blog/usd-publishing-workflows.md`, rejects duplicate or invalid slugs, uses the current Cairo date, and creates a dev-only draft with `status: draft`.

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
status: draft
---

Article content goes here.
```

Required loaded-article fields are `title`, `description`, `date`, `tags`, and `status`. Dates use `YYYY-MM-DD`.

Use one of these publication states:

- `status: published` renders locally and in production, including the sitemap and RSS feed.
- `status: draft` renders only through `bun run dev`, with a Draft badge; it is excluded from production output, sitemap, and RSS.
- `status: ignored` is for incomplete or abandoned work. Place ignored files in `content/blog/_ignored/`; they are never loaded or rendered.

Set a draft to `status: published` only when it is ready to publish. The legacy `draft: true/false` field is rejected.

Changing a published filename changes its URL, so keep published slugs stable. Publication status is read only from the leading frontmatter block, so examples in the article body may safely contain text such as `status: draft`.

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
