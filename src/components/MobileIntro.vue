<script setup lang="ts">
import type { ProfileLink } from '../data/portfolio'
import FocusChips from './FocusChips.vue'
import ProfileLinks from './ProfileLinks.vue'
import ProfilePhoto from './ProfilePhoto.vue'
import ThemeToggle from './ThemeToggle.vue'

defineProps<{
  focusChips: string[]
  isDarkTheme: boolean
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
  <section class="mobile-intro">
    <ProfilePhoto :image="profileImage" :image-webp="profileImageWebp" image-class="mobile-photo" />
    <p class="role">Pipeline TD / VFX Pipeline Developer</p>
    <p class="mobile-name">Ahmed Hindy</p>
    <FocusChips :chips="focusChips" />
    <ProfileLinks :links="profileLinks" list-class="mobile-links" />
    <ThemeToggle
      mobile
      :is-dark-theme="isDarkTheme"
      :label="themeToggleLabel"
      @toggle-theme="$emit('toggle-theme')"
    />
  </section>
</template>
