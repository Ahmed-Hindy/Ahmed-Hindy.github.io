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
    <h1>Ahmed Hindy</h1>
    <p class="profile-location">Cairo, Egypt</p>

    <ProfileLinks :links="profileLinks" list-class="sidebar-links" />

    <NuxtLink class="sidebar-blog-button" to="/blog/">
      <span>Blog</span>
      <span aria-hidden="true">→</span>
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
