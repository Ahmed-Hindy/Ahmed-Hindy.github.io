const isDevelopment = process.env.NODE_ENV === 'development'
const buildDirectory = isDevelopment ? '.nuxt-dev' : '.nuxt'
const contentDatabaseFilename = isDevelopment
  ? '.data/content/development.sqlite'
  : '.data/content/build.sqlite'

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
    dir: '../src/assets',
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
      routes: ['/', '/blog/', '/robots.txt', '/sitemap.xml', '/rss.xml'],
    },
  },
  routeRules: {
    '/**': { prerender: true },
  },
  sitemap: {
    zeroRuntime: true,
    urls: ['/', '/blog/'],
    excludeAppSources: ['@nuxt/content@v3:urls'],
  },
})
