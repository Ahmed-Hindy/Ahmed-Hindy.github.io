<script setup lang="ts">
defineProps<{
  image: string
  imageWebp: string
  imageClass: 'sidebar-photo' | 'mobile-photo'
}>()
</script>

<template>
  <picture>
    <source :srcset="imageWebp" type="image/webp" />
    <img :src="image" alt="Ahmed Hindy" :class="imageClass" />
  </picture>
</template>
