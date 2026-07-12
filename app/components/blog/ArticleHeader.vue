<script setup lang="ts">
import { formatArticleDate } from '~/utils/date'

const props = defineProps<{
  title: string
  description: string
  date: string
  updated?: string
  tags: string[]
  draft: boolean
}>()

const showUpdatedDate = computed(() => Boolean(props.updated && props.updated !== props.date))
</script>

<template>
  <header class="article-header">
    <p class="section-kicker">Blog</p>
    <h1>{{ title }}</h1>
    <p class="article-description">{{ description }}</p>
    <p class="article-date article-published-date">
      <span v-if="draft" class="article-draft-label">Draft</span>
      Published <time :datetime="date">{{ formatArticleDate(date) }}</time>
      <template v-if="showUpdatedDate">
        · Updated <time :datetime="updated">{{ formatArticleDate(updated!) }}</time>
      </template>
    </p>
    <ul aria-label="Article topics"><li v-for="tag in tags" :key="tag">{{ tag }}</li></ul>
  </header>
</template>
