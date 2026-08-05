<script setup lang="ts">
defineProps<{
  imageClass: 'sidebar-photo' | 'mobile-photo'
}>()
</script>

<template>
  <NuxtLink class="profile-photo-home-link" to="/" aria-label="Go to portfolio home">
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
  </NuxtLink>
</template>
