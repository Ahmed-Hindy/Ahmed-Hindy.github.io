<script setup lang="ts">
import { links } from '~~/src/data/portfolio'
import { site } from '~/data/site'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="blog-site-footer">
    <div class="blog-site-footer-inner">
      <p>© {{ currentYear }} {{ site.authorName }}</p>
      <nav aria-label="Footer navigation">
        <NuxtLink to="/">Portfolio</NuxtLink>
        <NuxtLink to="/blog/">Blog</NuxtLink>
        <a :href="links.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a :href="links.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="/rss.xml">RSS</a>
      </nav>
    </div>
  </footer>
</template>
