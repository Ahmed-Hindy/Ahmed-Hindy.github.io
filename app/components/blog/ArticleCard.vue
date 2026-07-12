<script setup lang="ts">
import { formatArticleDate } from '~/utils/date'

defineProps<{
  article: { path: string; title: string; description: string; date: string; tags: string[]; draft: boolean }
}>()
</script>

<template>
  <article class="article-card">
    <div class="article-card-meta">
      <ul aria-label="Article topics">
        <li v-for="tag in article.tags" :key="tag">{{ tag }}</li>
      </ul>
      <div class="article-card-date">
        <span v-if="article.draft" class="article-draft-label">Draft</span>
        <time :datetime="article.date" class="article-date">{{ formatArticleDate(article.date) }}</time>
      </div>
    </div>
    <NuxtLink :to="`${article.path}/`" class="article-card-link">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
    </NuxtLink>
  </article>
</template>
