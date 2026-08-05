<script setup lang="ts">
defineProps<{
  newer?: { path: string; title: string } | null
  older?: { path: string; title: string } | null
}>()
</script>

<template>
  <nav v-if="newer || older" class="article-navigation" aria-label="Article navigation">
    <NuxtLink v-if="newer" :to="`${newer.path}/`" class="article-navigation-item">
      <span class="article-navigation-direction">
        <span class="article-navigation-arrow" aria-hidden="true">←</span>
        Newer post
      </span>
      <strong>{{ newer.title }}</strong>
    </NuxtLink>
    <NuxtLink v-if="older" :to="`${older.path}/`" class="article-navigation-item article-navigation-item-older">
      <span class="article-navigation-direction">
        Older post
        <span class="article-navigation-arrow" aria-hidden="true">→</span>
      </span>
      <strong>{{ older.title }}</strong>
    </NuxtLink>
  </nav>
</template>
