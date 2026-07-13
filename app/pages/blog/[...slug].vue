<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'
import { absoluteUrl, site } from '~/data/site'

type BlogArticle = PageCollections['blog']
type BlogPageResponse = {
  article: BlogArticle
  newer: Pick<BlogArticle, 'path' | 'title'> | null
  older: Pick<BlogArticle, 'path' | 'title'> | null
}

const route = useRoute()
const path = computed(() => route.path.replace(/\/$/, ''))
const { data: blogPage } = await useAsyncData<BlogPageResponse>(
  () => `blog-${path.value}`,
  () => $fetch<BlogPageResponse>(`/api/blog${path.value.replace(/^\/blog/, '')}`),
)
const article = computed(() => blogPage.value?.article)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const newerArticle = computed(() => blogPage.value?.newer ?? null)
const olderArticle = computed(() => blogPage.value?.older ?? null)

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
    <BlogHero class="blog-article-hero">
      <BlogArticleHeader
        :title="article!.title"
        :description="article!.description"
        :date="article!.date"
        :updated="article!.updated"
        :tags="article!.tags"
        :draft="article!.draft"
      />
    </BlogHero>
    <main id="main-content" class="blog-content blog-article-content">
      <article class="prose">
        <BlogTableOfContents :links="article!.body.toc?.links ?? []" />
        <ContentRenderer :value="article!" />
      </article>
      <BlogArticleNavigation :newer="newerArticle" :older="olderArticle" />
      <p class="article-all-posts-link">
        <NuxtLink to="/blog/">View all blog posts →</NuxtLink>
      </p>
    </main>
    <BlogSiteFooter />
  </div>
</template>
