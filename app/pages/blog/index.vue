<script setup lang="ts">
const { data: articles } = await useAsyncData('published-blog-index', () =>
  queryCollection('blog')
    .select('path', 'title', 'description', 'date', 'updated', 'tags', 'image', 'imageAlt')
    .where('draft', '=', false)
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
    <main class="blog-content">
      <header class="blog-index-header">
        <p class="section-kicker">Blog</p>
        <h1>Notes on pipeline tools and production workflows.</h1>
        <p>Practical notes about Houdini, USD, DCC tooling, and the systems around artists.</p>
      </header>
      <section v-if="articles?.length" class="article-list" aria-label="Articles">
        <BlogArticleCard v-for="article in articles" :key="article.path" :article="article" />
      </section>
      <BlogEmptyState v-else />
    </main>
  </div>
</template>
