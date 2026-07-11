<script setup lang="ts">
defineProps<{
  article: { path: string; title: string; description: string; date: string; tags: string[] }
}>()

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
</script>

<template>
  <article class="article-card">
    <time :datetime="article.date" class="article-date">{{ formatDate(article.date) }}</time>
    <h2><NuxtLink :to="`${article.path}/`">{{ article.title }}</NuxtLink></h2>
    <p>{{ article.description }}</p>
    <ul aria-label="Article tags"><li v-for="tag in article.tags" :key="tag">{{ tag }}</li></ul>
  </article>
</template>
