<script setup lang="ts">
defineProps<{ title: string; description: string; date: string; updated?: string; tags: string[] }>()

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
</script>

<template>
  <header class="article-header">
    <p class="section-kicker">Blog</p>
    <h1>{{ title }}</h1>
    <p class="article-description">{{ description }}</p>
    <p class="article-date">
      Published <time :datetime="date">{{ formatDate(date) }}</time>
      <template v-if="updated"> · Updated <time :datetime="updated">{{ formatDate(updated) }}</time></template>
    </p>
    <ul aria-label="Article tags"><li v-for="tag in tags" :key="tag">{{ tag }}</li></ul>
  </header>
</template>
