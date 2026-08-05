<script setup lang="ts">
import { computed } from 'vue'
import type { NavItem, ProfileLink } from '../data/portfolio'
import ProfileLinks from './ProfileLinks.vue'
import ProfilePhoto from './ProfilePhoto.vue'
import ThemeToggle from './ThemeToggle.vue'

const props = defineProps<{
  isDarkTheme: boolean
  navItems: NavItem[]
  profileLinks: ProfileLink[]
  themeToggleLabel: string
  primaryHref?: string
  primaryLabel?: string
}>()

const sectionNavItems = computed(() =>
  props.navItems.filter((item) => item.href !== '/blog/'),
)

defineEmits<{
  'toggle-theme': []
}>()
</script>

<template>
  <aside class="sidebar" aria-label="Profile sidebar">
    <ProfilePhoto image-class="sidebar-photo" />
    <p class="role">VFX Pipeline TD</p>
    <h1><NuxtLink class="sidebar-home-link" to="/">Ahmed Hindy</NuxtLink></h1>
    <p class="profile-location">Cairo, Egypt</p>

    <ProfileLinks :links="profileLinks" list-class="sidebar-links" />

    <NuxtLink class="sidebar-blog-button" :to="primaryHref ?? '/blog/'">
      <span>{{ primaryLabel ?? 'Blog' }}</span>
      <span class="sidebar-button-arrow" aria-hidden="true"></span>
    </NuxtLink>

    <nav class="sidebar-nav" aria-label="Section navigation">
      <a v-for="item in sectionNavItems" :key="item.href" :href="item.href">{{ item.label }}</a>
    </nav>

    <ThemeToggle
      :is-dark-theme="isDarkTheme"
      :label="themeToggleLabel"
      @toggle-theme="$emit('toggle-theme')"
    />
  </aside>
</template>
