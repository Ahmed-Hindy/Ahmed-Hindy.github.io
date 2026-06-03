<script setup lang="ts">
import type { ProjectSection } from '../data/portfolio'

defineProps<{
  sections: ProjectSection[]
}>()
</script>

<template>
  <div class="work-sections">
    <section v-for="section in sections" :key="section.title" class="work-section">
      <h3 class="work-section-title">{{ section.title }}</h3>
      <div class="work-grid" :class="{ 'work-grid-featured': section.projects.some((project) => project.media) }">
        <article
          v-for="project in section.projects"
          :key="project.title"
          class="work-card"
          :class="{ 'work-card-featured': project.media }"
        >
          <figure v-if="project.media" class="work-media">
            <video
              v-if="project.media.video"
              :poster="project.media.video.poster"
              preload="metadata"
              controls
              playsinline
            >
              <source :src="project.media.video.src" type="video/mp4">
            </video>
            <img
              v-else-if="project.media.image"
              :src="project.media.image.src"
              :alt="project.media.image.alt"
              loading="eager"
            >
          </figure>

          <div class="work-card-content">
            <h4>{{ project.title }}</h4>
            <p>{{ project.summary }}</p>
            <a v-if="project.href" :href="project.href" target="_blank" rel="noopener noreferrer">
              View project
            </a>
            <ul>
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
