<script setup lang="ts">
import { formatArticleDate } from '~/utils/date'

defineProps<{
  article: { path: string; title: string; description: string; date: string; tags: string[]; status: 'published' | 'draft' }
}>()
</script>

<template>
  <article class="article-card">
    <div class="article-card-meta">
      <div class="article-card-date">
        <span v-if="article.status === 'draft'" class="article-draft-label">Draft</span>
        <time :datetime="article.date" class="article-date">{{ formatArticleDate(article.date) }}</time>
      </div>
      <ul aria-label="Article topics">
        <li v-for="tag in article.tags.slice(0, 2)" :key="tag">{{ tag }}</li>
      </ul>
    </div>
    <NuxtLink :to="`${article.path}/`" class="article-card-link">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
      <span class="article-card-action">Read technical note <span aria-hidden="true">→</span></span>
    </NuxtLink>
  </article>
</template>
