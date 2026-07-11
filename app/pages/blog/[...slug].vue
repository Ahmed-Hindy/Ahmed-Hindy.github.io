<script setup lang="ts">
import { absoluteUrl, site } from '~/data/site'

const route = useRoute()
const path = computed(() => route.path.replace(/\/$/, ''))
const { data: article } = await useAsyncData(
  () => `blog-${path.value}`,
  () => queryCollection('blog').path(path.value).where('draft', '=', false).first(),
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const { data: articles } = await useAsyncData('published-blog-navigation', () =>
  queryCollection('blog').select('path', 'title', 'date').where('draft', '=', false).order('date', 'DESC').all(),
)
const currentIndex = computed(() => articles.value?.findIndex((item) => item.path === article.value?.path) ?? -1)
const previous = computed(() => (currentIndex.value > 0 ? articles.value?.[currentIndex.value - 1] : null))
const next = computed(() => (currentIndex.value >= 0 ? articles.value?.[currentIndex.value + 1] : null))

useSiteSeo({
  title: article.value.title,
  description: article.value.description,
  path: `${article.value.path}/`,
  image: article.value.image,
  imageAlt: article.value.imageAlt,
  type: 'article',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.value.title,
      description: article.value.description,
      author: { '@type': 'Person', name: site.authorName },
      datePublished: article.value.date,
      dateModified: article.value.updated ?? article.value.date,
      image: absoluteUrl(article.value.image ?? '/og-image-portrait.jpg'),
      mainEntityOfPage: absoluteUrl(`${article.value.path}/`),
      url: absoluteUrl(`${article.value.path}/`),
    }),
  }],
})

useSeoMeta({
  articlePublishedTime: article.value.date,
  articleModifiedTime: article.value.updated ?? article.value.date,
})
</script>

<template>
  <div class="blog-shell">
    <BlogMobileSiteHeader />
    <main class="blog-content">
      <NuxtLink to="/blog/" class="blog-back-link">← All posts</NuxtLink>
      <article class="prose">
        <BlogArticleHeader
          :title="article!.title"
          :description="article!.description"
          :date="article!.date"
          :updated="article!.updated"
          :tags="article!.tags"
        />
        <ContentRenderer :value="article!" />
      </article>
      <BlogArticleNavigation :previous="previous" :next="next" />
    </main>
  </div>
</template>
