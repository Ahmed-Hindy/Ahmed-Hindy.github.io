<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const preElement = ref<HTMLElement>()
const copyLabel = ref('Copy code to clipboard')
const copied = ref(false)
let resetCopyLabel: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
  const code = preElement.value?.querySelector('code')?.textContent

  if (!code) return

  try {
    await navigator.clipboard.writeText(code)
    copyLabel.value = 'Copied code to clipboard'
    copied.value = true
  }
  catch {
    copyLabel.value = 'Unable to copy code'
    copied.value = false
  }

  clearTimeout(resetCopyLabel)
  resetCopyLabel = setTimeout(() => {
    copyLabel.value = 'Copy code to clipboard'
    copied.value = false
  }, 2_000)
}

onBeforeUnmount(() => clearTimeout(resetCopyLabel))
</script>

<template>
  <pre ref="preElement">
    <button
      type="button"
      class="code-copy-button"
      :aria-label="copyLabel"
      :title="copyLabel"
      @click="copyCode"
    >
      <svg v-if="copied" aria-hidden="true" viewBox="0 0 24 24">
        <path d="m5 12 4 4L19 6" />
      </svg>
      <svg v-else aria-hidden="true" viewBox="0 0 24 24">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    </button>
    <slot />
  </pre>
</template>
