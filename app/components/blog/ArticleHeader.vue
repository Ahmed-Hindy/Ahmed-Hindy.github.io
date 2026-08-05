<script setup lang="ts">
import { formatArticleDate } from '~/utils/date'

const props = defineProps<{
  title: string
  href: string
  description: string
  date: string
  updated?: string
  tags: string[]
  status: 'published' | 'draft'
}>()

const showUpdatedDate = computed(() => Boolean(props.updated && props.updated !== props.date))
</script>

<template>
  <header class="article-header">
    <h1><a class="article-title-link" :href="href">{{ title }}</a></h1>
    <p class="article-description">{{ description }}</p>
    <p class="article-date article-published-date">
      <template v-if="status === 'draft'">
        <span class="article-draft-label">Draft</span>
        <time :datetime="date">{{ formatArticleDate(date) }}</time>
      </template>
      <template v-else>
        Published <time :datetime="date">{{ formatArticleDate(date) }}</time>
        <template v-if="showUpdatedDate">
          · Updated <time :datetime="updated">{{ formatArticleDate(updated!) }}</time>
        </template>
      </template>
    </p>
    <ul aria-label="Article topics"><li v-for="tag in tags" :key="tag">{{ tag }}</li></ul>
  </header>
</template>
