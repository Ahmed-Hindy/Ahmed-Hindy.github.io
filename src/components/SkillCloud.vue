<script setup lang="ts">
import type { SkillGroup } from '../data/portfolio'

defineProps<{
  skills: SkillGroup[]
}>()
</script>

<template>
  <div class="skill-groups">
    <section v-for="group in skills" :key="group.title" class="skill-group">
      <h3>{{ group.title }}</h3>
      <ul class="skill-cloud">
        <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
      </ul>
    </section>
  </div>
</template>
