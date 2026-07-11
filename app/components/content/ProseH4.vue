<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h4 :id="id">
    <slot />
    <a v-if="id" class="heading-permalink" :href="`#${id}`" aria-label="Link to this section">#</a>
  </h4>
</template>
