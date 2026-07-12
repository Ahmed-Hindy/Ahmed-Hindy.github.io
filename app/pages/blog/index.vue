<script setup lang="ts">
const { data: articles } = await useAsyncData('published-blog-index', () =>
  queryCollection('blog')
    .select('path', 'title', 'description', 'date', 'tags', 'draft')
    .order('date', 'DESC')
    .all(),
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
    <main id="main-content" class="blog-content">
      <header class="blog-index-header">
        <p class="section-kicker">Blog</p>
        <h1>Technical notes from production.</h1>
        <p>Practical Houdini, USD, pipeline, and production-tooling notes grounded in real artist and studio problems.</p>
      </header>
      <section v-if="articles?.length" class="article-list" aria-label="Articles">
        <BlogArticleCard v-for="article in articles" :key="article.path" :article="article" />
      </section>
      <BlogEmptyState v-else />
      <p class="blog-rss-link"><BlogRssLink /></p>
    </main>
  </div>
</template>
