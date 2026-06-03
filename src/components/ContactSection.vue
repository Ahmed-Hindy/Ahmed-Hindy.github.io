<script setup lang="ts">
import type { ProfileLink } from '../data/portfolio'

defineProps<{
  profileLinks: ProfileLink[]
}>()
</script>

<template>
  <section class="section contact" id="contact">
    <div>
      <p class="section-kicker">Contact</p>
      <h2>Let's talk pipeline, tools, and production workflows.</h2>
      <p>
        I am open to Pipeline TD, Houdini Pipeline TD, USD Pipeline Developer, and DCC Tools
        Developer roles, especially on teams building practical tools for artists and
        production.
      </p>
    </div>
    <div class="contact-actions">
      <a
        v-for="link in profileLinks"
        :key="link.label"
        class="button profile-link"
        :class="[
          `profile-link-${link.icon}`,
          { primary: link.label === 'Email', resume: link.label === 'Resume' },
        ]"
        :href="link.href"
        :rel="link.external ? 'noopener noreferrer' : undefined"
        :target="link.external ? '_blank' : undefined"
      >
        <span class="button-icon" aria-hidden="true">
          <svg class="link-icon" aria-hidden="true" focusable="false">
            <use :href="`#icon-${link.icon}`" />
          </svg>
        </span>
        <span>{{ link.label === 'Email' ? 'Email Me' : link.label }}</span>
      </a>
    </div>
  </section>
</template>
