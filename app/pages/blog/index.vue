<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

type BlogIndexArticle = Pick<PageCollections['blog'], 'path' | 'title' | 'description' | 'date' | 'tags' | 'draft'>

const { data: articles } = await useAsyncData<BlogIndexArticle[]>(
  'published-blog-index',
  () => $fetch<BlogIndexArticle[]>('/api/blog'),
)

useSiteSeo({
  title: 'Blog',
  description: 'Technical notes from Ahmed Hindy about Houdini, USD, pipeline tools, and production workflows.',
  path: '/blog/',
})
</script>

<template>
  <div class="blog-shell">
    <BlogMobileSiteHeader />
    <BlogHero class="blog-index-hero">
      <header class="blog-index-header">
        <p class="section-kicker">Blog</p>
        <h1>Technical notes from production.</h1>
        <p>Practical Houdini, USD, pipeline, and production-tooling notes grounded in real artist and studio problems.</p>
      </header>
    </BlogHero>
    <main id="main-content" class="blog-content blog-index-content">
      <section v-if="articles?.length" class="article-list" aria-label="Articles">
        <BlogArticleCard v-for="article in articles" :key="article.path" :article="article" />
      </section>
      <BlogEmptyState v-else />
    </main>
    <BlogSiteFooter />
  </div>
</template>
