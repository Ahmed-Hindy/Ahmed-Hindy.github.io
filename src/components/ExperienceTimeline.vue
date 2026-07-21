<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { ExperienceItem } from '../data/portfolio'

defineProps<{
  items: ExperienceItem[]
}>()

const timeline = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined

onMounted(async () => {
  if (
    !('IntersectionObserver' in window)
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  await nextTick()

  const timelineElement = timeline.value
  if (!timelineElement) {
    return
  }

  timelineElement.classList.add('timeline-motion-ready')
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          timelineElement.classList.add('timeline-line-visible')
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.18 },
  )

  timelineElement.querySelectorAll('.timeline-item').forEach((item) => observer?.observe(item))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="timeline" class="timeline">
    <article
      v-for="(item, index) in items"
      :key="item.title"
      class="timeline-item"
      :style="{ '--timeline-entry-delay': `${index * 70}ms` }"
    >
      <p>{{ item.meta }}</p>
      <h3>{{ item.title }}</h3>
      <span>{{ item.details }}</span>
    </article>
  </div>
</template>
