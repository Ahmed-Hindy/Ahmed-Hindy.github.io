<script setup lang="ts">
useHead({ title: 'Page not found', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="blog-shell">
    <BlogMobileSiteHeader />
    <BlogHero>
      <header class="error-page">
        <p class="section-kicker">404</p>
        <h1>That page does not exist.</h1>
        <p>Try the portfolio or browse the blog.</p>
      </header>
    </BlogHero>
    <main class="error-page-links">
      <NuxtLink to="/">Portfolio</NuxtLink>
      <NuxtLink to="/blog/">Browse the blog</NuxtLink>
    </main>
    <BlogSiteFooter />
  </div>
</template>
