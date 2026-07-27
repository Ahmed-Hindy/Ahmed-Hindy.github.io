import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  blogRouteFromRelativeFile,
  getBlogArticleStatus,
  normalizeBlogRelativePath,
} from './shared/blog-content'

const isDevelopment = process.env.NODE_ENV === 'development'
const buildDirectory = isDevelopment ? '.nuxt-dev' : '.nuxt'
const contentDatabaseFilename = isDevelopment
  ? '.data/content/development.sqlite'
  : '.data/content/build.sqlite'
const blogContentDirectory = fileURLToPath(new URL('./content/blog/', import.meta.url))
const draftBlogRoutes = readdirSync(blogContentDirectory, { recursive: true, encoding: 'utf8' })
  .map(normalizeBlogRelativePath)
  .filter((filePath) => filePath.toLowerCase().endsWith('.md') && !filePath.startsWith('_ignored/'))
  .filter((filePath) => getBlogArticleStatus(readFileSync(join(blogContentDirectory, filePath), 'utf8')) === 'draft')
  .map(blogRouteFromRelativeFile)

export default defineNuxtConfig({
  compatibilityDate: '2026-07-11',
  buildDir: buildDirectory,
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css', '~/assets/css/playful-theme.css'],
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  site: {
    url: 'https://ahmed-hindy.github.io',
    name: 'Ahmed Hindy',
    trailingSlash: true,
  },
  image: {
    // Nuxt 4 resolves this path from app/, while the portfolio assets remain in src/assets.
    // Keep public/ as a second IPX root for article images stored there.
    dir: '../src/assets',
    dirs: [fileURLToPath(new URL('./public/', import.meta.url))],
  },
  content: {
    // Keep the live dev database isolated from typecheck and prerender builds.
    _localDatabase: {
      type: 'sqlite',
      filename: contentDatabaseFilename,
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: ['python', 'c'],
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      googleSiteVerification: '',
    },
  },
  nitro: {
    preset: 'github_pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog/', '/robots.txt', '/sitemap.xml', '/rss.xml', ...draftBlogRoutes],
    },
  },
  routeRules: {
    '/**': { prerender: true },
  },
  sitemap: {
    zeroRuntime: true,
    urls: ['/', '/blog/'],
    excludeAppSources: ['@nuxt/content@v3:urls'],
    exclude: draftBlogRoutes,
  },
})
