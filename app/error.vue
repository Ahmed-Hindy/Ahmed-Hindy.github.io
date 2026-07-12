<script setup lang="ts">
useHead({ title: 'Page not found', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <main class="error-page">
    <p class="section-kicker">404</p>
    <h1>That page does not exist.</h1>
    <p>Try the portfolio or browse the blog.</p>
    <p><NuxtLink to="/">Portfolio</NuxtLink> · <NuxtLink to="/blog/">Blog</NuxtLink></p>
  </main>
</template>
