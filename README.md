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

```sh
bun run new:post usd-publishing-workflows
```

See [Blog Authoring](docs/blog-authoring.md) for frontmatter, publishing, image, and figure guidance.

## Deployment and indexing

Push or merge to `main`. GitHub Actions type-checks the project, builds the GitHub Pages preset, validates `.output/public`, and deploys that directory from the root base path `/`.

To enable Google Search Console verification, set `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION` as a GitHub Actions variable, deploy, then submit `https://ahmed-hindy.github.io/sitemap.xml`. Indexing is controlled by search engines and is not immediate.

## Asset optimization

```sh
bun run optimize:assets
```
