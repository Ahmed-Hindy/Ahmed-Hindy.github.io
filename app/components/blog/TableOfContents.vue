<script setup lang="ts">
type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
}>()

const flatLinks = computed(() => {
  const result: TocLink[] = []

  const visit = (links: TocLink[]) => {
    for (const link of links) {
      result.push(link)
      if (link.children?.length) {
        visit(link.children)
      }
    }
  }

  visit(props.links)
  return result
})
</script>

<template>
  <details v-if="flatLinks.length" class="article-toc">
    <summary>On this page</summary>
    <nav aria-label="On this page">
      <ol>
        <li v-for="link in flatLinks" :key="link.id" :class="`article-toc-depth-${link.depth}`">
          <a :href="`#${link.id}`">{{ link.text }}</a>
        </li>
      </ol>
    </nav>
  </details>
</template>
