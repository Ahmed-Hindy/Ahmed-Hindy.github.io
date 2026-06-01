<script setup lang="ts">
import type { Project } from '../data/portfolio'

defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <div class="work-grid">
    <article v-for="project in projects" :key="project.title" class="work-card">
      <h3>{{ project.title }}</h3>
      <p>{{ project.summary }}</p>
      <a v-if="project.href" :href="project.href" target="_blank" rel="noopener noreferrer">
        View project
      </a>
      <ul>
        <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
      </ul>
    </article>
  </div>
</template>
