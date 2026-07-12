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
            aria-hidden="true"
            tabindex="-1"
          />

          <figure
            v-if="project.media"
            class="work-media"
            :class="{ 'work-media-video': project.media.video }"
          >
            <video
              v-if="project.media.video"
              :poster="project.media.video.poster"
              preload="none"
              controls
              playsinline
            >
              <source :src="project.media.video.src" type="video/mp4">
            </video>
            <picture v-else-if="project.media.image">
              <source
                type="image/webp"
                :srcset="project.media.image.webp.map(({ src, width }) => `${src} ${width}w`).join(', ')"
                sizes="(min-width: 1021px) 456px, calc(100vw - 44px)"
              >
              <img
                :src="project.media.image.src"
                :alt="project.media.image.alt"
                :width="project.media.image.width"
                :height="project.media.image.height"
                loading="lazy"
                decoding="async"
              >
            </picture>
          </figure>

          <div class="work-card-content">
            <div class="work-card-heading">
              <h4>{{ project.title }}</h4>
              <a
                v-if="project.href"
                class="work-card-action"
                :href="project.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Open ${project.title} project`"
              >
                <svg class="work-card-action-icon" aria-hidden="true" focusable="false">
                  <use href="#icon-link" />
                </svg>
              </a>
            </div>
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
