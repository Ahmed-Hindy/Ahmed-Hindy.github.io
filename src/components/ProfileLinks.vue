<script setup lang="ts">
import type { ProfileLink } from '../data/portfolio'

defineProps<{
  links: ProfileLink[]
  listClass: 'sidebar-links' | 'mobile-links'
}>()
</script>

<template>
  <div :class="listClass" aria-label="Profile links">
    <a
      v-for="link in links"
      :key="link.label"
      class="profile-link"
      :class="`profile-link-${link.icon}`"
      :aria-label="link.label"
      :href="link.href"
      :rel="link.external ? 'noopener noreferrer' : undefined"
      :target="link.external ? '_blank' : undefined"
      :title="link.label"
    >
      <svg class="link-icon" aria-hidden="true" focusable="false">
        <use :href="`#icon-${link.icon}`" />
      </svg>
      <span class="sr-only">{{ link.label }}</span>
    </a>
  </div>
</template>
