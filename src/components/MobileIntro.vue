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

const mobileNavItems = computed(() =>
  props.navItems.filter((item) => item.href !== '/#overview'),
)

defineEmits<{
  'toggle-theme': []
}>()
</script>

<template>
  <section class="mobile-intro">
    <ProfilePhoto image-class="mobile-photo" />
    <p class="role">VFX Pipeline TD</p>
    <p class="mobile-name">Ahmed Hindy</p>
    <p class="profile-location mobile-profile-location">Cairo, Egypt</p>
    <div class="mobile-action-row">
      <ProfileLinks :links="profileLinks" list-class="mobile-links" />
      <ThemeToggle
        mobile
        :is-dark-theme="isDarkTheme"
        :label="themeToggleLabel"
        @toggle-theme="$emit('toggle-theme')"
      />
    </div>
    <nav class="mobile-section-nav" aria-label="Page sections">
      <a v-for="item in mobileNavItems" :key="item.href" :href="item.href">{{ item.label }}</a>
    </nav>
  </section>
</template>
