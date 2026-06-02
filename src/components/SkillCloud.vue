<script setup lang="ts">
defineProps<{
  skills: string[]
}>()
</script>

<template>
  <ul class="skill-cloud">
    <li v-for="skill in skills" :key="skill">{{ skill }}</li>
  </ul>
</template>
