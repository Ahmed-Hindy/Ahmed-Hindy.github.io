<script setup lang="ts">
import type { ExperienceItem } from '../data/portfolio'

defineProps<{
  items: ExperienceItem[]
}>()
</script>

<template>
  <div class="timeline">
    <article v-for="item in items" :key="item.title" class="timeline-item">
      <p>{{ item.meta }}</p>
      <h3>{{ item.title }}</h3>
      <span>{{ item.details }}</span>
    </article>
  </div>
</template>
