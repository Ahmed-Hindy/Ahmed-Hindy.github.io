# Ahmed Hindy Portfolio

Static portfolio and technical blog built with Nuxt, Nuxt Content, Vue, and Bun. GitHub Pages publishes the fully prerendered `.output/public` artifact; no runtime server is required.

## Tech stack

- **Application:** Nuxt 4, Vue 3, TypeScript, Vite, and Nitro using the GitHub Pages prerendering preset.
- **Content:** Nuxt Content 3, Markdown/MDC, Shiki syntax highlighting, and build-time SQLite through `better-sqlite3`.
- **UI:** Vue single-file components, semantic HTML, and custom responsive CSS with light and dark themes. No CSS or component framework is used.
- **Images:** Nuxt Image and Sharp for responsive image generation and asset optimization.
- **SEO and feeds:** Nuxt Sitemap, RSS 2.0 through `feed`, canonical metadata, Open Graph, Twitter cards, robots.txt, and JSON-LD article data.
- **Tooling:** Bun for dependency management and scripts, Nuxt TypeScript checks through `vue-tsc`, and a custom static-output validator.
- **CI and hosting:** GitHub Actions and GitHub Pages. Pull requests run type checking, production builds, and output validation before deployment.

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
