<script setup lang="ts">
import ThemeToggle from '~~/src/components/ThemeToggle.vue'
import { useTheme } from '~~/src/composables/useTheme'
import { site } from '~/data/site'

const route = useRoute()
const { isDarkTheme, themeToggleLabel, toggleTheme } = useTheme()
const isBlogIndex = computed(() => route.path.replace(/\/$/, '') === '/blog')
</script>

<template>
  <header class="blog-site-header">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <nav class="blog-site-header-inner" aria-label="Primary navigation">
      <NuxtLink to="/" class="blog-brand" aria-label="Ahmed Hindy portfolio">
        <span class="blog-brand-mark" aria-hidden="true">AH</span>
        <span>
          <strong>{{ site.authorName }}</strong>
          <small>{{ site.authorRole }}</small>
        </span>
      </NuxtLink>

      <div class="blog-header-links">
        <NuxtLink to="/blog/" :aria-current="isBlogIndex ? 'page' : undefined">
          All posts
        </NuxtLink>
        <BlogRssLink />
      </div>

      <div class="blog-header-actions">
        <ThemeToggle
          :is-dark-theme="isDarkTheme"
          :label="themeToggleLabel"
          @toggle-theme="toggleTheme"
        />
        <NuxtLink class="blog-nav-cta" to="/">Portfolio</NuxtLink>
      </div>
    </nav>
  </header>
</template>
