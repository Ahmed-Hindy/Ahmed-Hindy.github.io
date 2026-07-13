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
  <details v-if="links.length" class="article-toc">
    <summary>On this page</summary>
    <nav aria-label="On this page">
      <ol>
        <li v-for="link in links" :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
        </li>
      </ol>
    </nav>
  </details>
</template>
