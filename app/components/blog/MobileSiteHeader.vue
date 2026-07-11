<script setup lang="ts">
import ThemeToggle from '~~/src/components/ThemeToggle.vue'
import { useTheme } from '~~/src/composables/useTheme'
import { site } from '~/data/site'

const route = useRoute()
const { isDarkTheme, themeToggleLabel, toggleTheme } = useTheme()
const isBlogSection = computed(() => route.path.startsWith('/blog'))
const blogAriaCurrent = computed(() => {
  if (!isBlogSection.value) {
    return undefined
  }

  return route.path.replace(/\/$/, '') === '/blog' ? 'page' : 'location'
})
</script>

<template>
  <header class="blog-site-header">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="blog-site-header-inner">
      <div class="blog-brand">
        <NuxtLink to="/" class="blog-site-name">{{ site.authorName }}</NuxtLink>
        <p>{{ site.authorRole }}</p>
      </div>
      <div class="blog-header-actions">
        <nav aria-label="Primary navigation">
          <NuxtLink to="/">Portfolio</NuxtLink>
          <NuxtLink
            to="/blog/"
            :class="{ 'is-section-active': isBlogSection }"
            :aria-current="blogAriaCurrent"
          >
            Blog
          </NuxtLink>
          <BlogRssLink />
        </nav>
        <ThemeToggle
          :is-dark-theme="isDarkTheme"
          :label="themeToggleLabel"
          @toggle-theme="toggleTheme"
        />
      </div>
    </div>
  </header>
</template>
