<script setup lang="ts">
import type { NavItem, ProfileLink } from '../data/portfolio'
import FocusChips from './FocusChips.vue'
import ProfileLinks from './ProfileLinks.vue'
import ProfilePhoto from './ProfilePhoto.vue'
import ThemeToggle from './ThemeToggle.vue'

defineProps<{
  focusChips: string[]
  isDarkTheme: boolean
  navItems: NavItem[]
  profileImage: string
  profileImageWebp: string
  profileLinks: ProfileLink[]
  themeToggleLabel: string
}>()

defineEmits<{
  'toggle-theme': []
}>()
</script>

<template>
  <aside class="sidebar" aria-label="Profile sidebar">
    <ProfilePhoto :image="profileImage" :image-webp="profileImageWebp" image-class="sidebar-photo" />
    <p class="role">Pipeline TD / VFX Pipeline Developer</p>
    <h1>Ahmed Hindy</h1>

    <FocusChips :chips="focusChips" />
    <ProfileLinks :links="profileLinks" list-class="sidebar-links" />

    <nav class="sidebar-nav" aria-label="Section navigation">
      <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
    </nav>

    <ThemeToggle
      :is-dark-theme="isDarkTheme"
      :label="themeToggleLabel"
      @toggle-theme="$emit('toggle-theme')"
    />
  </aside>
</template>
