<script setup lang="ts">
import { useTheme } from '~~/src/composables/useTheme'
import { site } from '~/data/site'

const { isDarkTheme, themeToggleLabel, toggleTheme } = useTheme()
</script>

<template>
  <header class="blog-site-header">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <nav class="blog-site-header-inner" aria-label="Primary">
      <NuxtLink to="/" class="blog-brand" aria-label="Ahmed Hindy portfolio">
        <span class="blog-brand-mark" aria-hidden="true">AH</span>
        <span>
          <strong>{{ site.authorName }}</strong>
          <small>Pipeline TD</small>
        </span>
      </NuxtLink>

      <div class="blog-header-links" aria-label="Page links">
        <NuxtLink to="/blog/">All posts</NuxtLink>
        <NuxtLink to="/#experience">Experience</NuxtLink>
        <NuxtLink to="/#contact">Contact</NuxtLink>
      </div>

      <div class="blog-header-actions">
        <button
          class="blog-theme-toggle"
          type="button"
          :aria-label="themeToggleLabel"
          :title="themeToggleLabel"
          @click="toggleTheme"
        >
          <span aria-hidden="true">{{ isDarkTheme ? '☀' : '☾' }}</span>
        </button>
        <NuxtLink class="blog-nav-cta" to="/">Portfolio</NuxtLink>
      </div>

      <details class="blog-mobile-menu">
        <summary>Menu</summary>
        <div>
          <NuxtLink to="/blog/">All posts</NuxtLink>
          <NuxtLink to="/#work">Work</NuxtLink>
          <NuxtLink to="/#experience">Experience</NuxtLink>
          <NuxtLink to="/#contact">Contact</NuxtLink>
          <NuxtLink to="/">Portfolio</NuxtLink>
        </div>
      </details>
    </nav>
  </header>
</template>
