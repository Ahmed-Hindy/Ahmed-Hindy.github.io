<script setup lang="ts">
withDefaults(
  defineProps<{
    isDarkTheme: boolean
    label: string
    mobile?: boolean
  }>(),
  {
    mobile: false,
  },
)

defineEmits<{
  'toggle-theme': []
}>()
</script>

<template>
  <button
    class="theme-toggle"
    :class="{ 'mobile-theme-toggle': mobile }"
    type="button"
    :aria-label="label"
    :aria-pressed="isDarkTheme"
    @click="$emit('toggle-theme')"
  >
    <span class="theme-toggle-track" aria-hidden="true">
      <span class="theme-toggle-thumb">{{ isDarkTheme ? '☾' : '☀' }}</span>
    </span>
    <span>{{ isDarkTheme ? 'Dark' : 'Light' }}</span>
  </button>
</template>
