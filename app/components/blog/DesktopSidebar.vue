<script setup lang="ts">
import IconSprite from '~~/src/components/IconSprite.vue'
import ProfileSidebar from '~~/src/components/ProfileSidebar.vue'
import { useTheme } from '~~/src/composables/useTheme'
import { focusChips, navItems, profileLinks } from '~~/src/data/portfolio'

const { isDarkTheme, themeToggleLabel, toggleTheme } = useTheme()
</script>

<template>
  <IconSprite />
  <ProfileSidebar
    :focus-chips="focusChips"
    :is-dark-theme="isDarkTheme"
    :nav-items="navItems"
    :profile-links="profileLinks"
    :theme-toggle-label="themeToggleLabel"
    @toggle-theme="toggleTheme"
  />
</template>
