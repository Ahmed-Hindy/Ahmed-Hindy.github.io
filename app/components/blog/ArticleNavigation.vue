<script setup lang="ts">
defineProps<{ previous?: { path: string; title: string } | null; next?: { path: string; title: string } | null }>()
</script>

<template>
  <nav v-if="previous || next" class="article-navigation" aria-label="Article navigation">
    <NuxtLink v-if="previous" :to="`${previous.path}/`">← {{ previous.title }}</NuxtLink>
    <NuxtLink v-if="next" :to="`${next.path}/`">{{ next.title }} →</NuxtLink>
  </nav>
</template>
