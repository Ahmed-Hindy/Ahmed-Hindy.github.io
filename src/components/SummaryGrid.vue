<script setup lang="ts">
import type { SummaryItem } from '../data/portfolio'

defineProps<{
  items: SummaryItem[]
}>()
</script>

<template>
  <dl class="summary-grid">
    <div v-for="item in items" :key="item.label">
      <dt>{{ item.label }}</dt>
      <dd>{{ item.value }}</dd>
    </div>
  </dl>
</template>
