<script setup lang="ts">
import ThemeToggle from '~~/src/components/ThemeToggle.vue'
import { useTheme } from '~~/src/composables/useTheme'
import { site } from '~/data/site'

const { isDarkTheme, themeToggleLabel, toggleTheme } = useTheme()
</script>

<template>
  <header class="blog-site-header">
    <div class="blog-site-header-inner">
      <div class="blog-brand">
        <NuxtLink to="/" class="blog-site-name">{{ site.authorName }}</NuxtLink>
        <p>{{ site.authorRole }}</p>
      </div>
      <div class="blog-header-actions">
        <nav aria-label="Primary navigation">
          <NuxtLink to="/">Portfolio</NuxtLink>
          <NuxtLink to="/blog/">Writing</NuxtLink>
          <a href="/rss.xml">RSS</a>
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
