<script setup lang="ts">
type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

defineProps<{
  links: TocLink[]
}>()
</script>

<template>
  <template v-if="links.length">
    <nav class="article-toc article-toc-desktop" aria-label="On this page">
      <p>On this page</p>
      <ol>
        <li v-for="link in links" :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
        </li>
      </ol>
    </nav>

    <details class="article-toc article-toc-mobile">
      <summary>On this page</summary>
      <nav aria-label="Article sections">
        <ol>
          <li v-for="link in links" :key="link.id">
            <a :href="`#${link.id}`">{{ link.text }}</a>
          </li>
        </ol>
      </nav>
    </details>
  </template>
</template>
