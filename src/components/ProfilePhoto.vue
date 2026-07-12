<script setup lang="ts">
defineProps<{
  imageClass: 'sidebar-photo' | 'mobile-photo'
}>()
</script>

<template>
  <NuxtPicture
    src="/profile.jpg"
    format="webp"
    sizes="156px"
    densities="1x 2x"
    width="156"
    height="156"
    alt="Ahmed Hindy"
    decoding="async"
    :img-attrs="{ class: imageClass }"
  />
</template>
