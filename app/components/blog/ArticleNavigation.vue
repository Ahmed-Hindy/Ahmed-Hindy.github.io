<script setup lang="ts">
defineProps<{
  newer?: { path: string; title: string } | null
  older?: { path: string; title: string } | null
}>()
</script>

<template>
  <nav v-if="newer || older" class="article-navigation" aria-label="Article navigation">
    <NuxtLink v-if="newer" :to="`${newer.path}/`" class="article-navigation-item">
      <span>← Newer post</span>
      <strong>{{ newer.title }}</strong>
    </NuxtLink>
    <NuxtLink v-if="older" :to="`${older.path}/`" class="article-navigation-item article-navigation-item-older">
      <span>Older post →</span>
      <strong>{{ older.title }}</strong>
    </NuxtLink>
  </nav>
</template>
