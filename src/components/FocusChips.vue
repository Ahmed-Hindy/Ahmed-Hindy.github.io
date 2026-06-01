<script setup lang="ts">
defineProps<{
  chips: string[]
}>()
</script>

<template>
  <ul class="focus-chips" aria-label="Primary focus areas">
    <li v-for="chip in chips" :key="chip">{{ chip }}</li>
  </ul>
</template>
