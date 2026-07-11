<script setup lang="ts">
import { site } from '~/data/site'
import { formatArticleDate } from '~/utils/date'

const props = defineProps<{
  title: string
  description: string
  date: string
  updated?: string
  tags: string[]
}>()

const showUpdatedDate = computed(() => Boolean(props.updated && props.updated !== props.date))
</script>

<template>
  <header class="article-header">
    <p class="section-kicker">Writing</p>
    <h1>{{ title }}</h1>
    <p class="article-description">{{ description }}</p>
    <div class="article-byline">
      <p><strong>{{ site.authorName }}</strong><span>{{ site.authorRole }}</span></p>
      <p class="article-date">
        Published <time :datetime="date">{{ formatArticleDate(date) }}</time>
        <template v-if="showUpdatedDate">
          · Updated <time :datetime="updated">{{ formatArticleDate(updated!) }}</time>
        </template>
      </p>
    </div>
    <ul aria-label="Article topics"><li v-for="tag in tags" :key="tag">{{ tag }}</li></ul>
  </header>
</template>
