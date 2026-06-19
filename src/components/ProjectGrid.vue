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
          :class="{ 'work-card-featured': project.media, 'work-card-clickable': project.href }"
        >
          <a
            v-if="project.href"
            class="work-card-link"
            :href="project.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Open ${project.title} project`"
          >
            <span class="sr-only">Open {{ project.title }} project</span>
          </a>

          <figure
            v-if="project.media"
            class="work-media"
            :class="{ 'work-media-video': project.media.video }"
          >
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
            <ul>
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
