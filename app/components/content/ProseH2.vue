<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h2 :id="id">
    <slot />
    <a v-if="id" class="heading-permalink" :href="`#${id}`" :aria-label="`Link to ${id.replaceAll('-', ' ')} section`">#</a>
  </h2>
</template>
