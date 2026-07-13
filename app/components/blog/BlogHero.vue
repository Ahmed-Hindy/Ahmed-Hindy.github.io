<template>
  <section class="blog-hero">
    <div class="blog-hero-inner">
      <slot />
    </div>
    <div class="blog-hero-landscape" aria-hidden="true">
      <span class="blog-hero-ridge blog-hero-ridge-far" />
      <span class="blog-hero-ridge blog-hero-ridge-mid" />
      <span class="blog-hero-ridge blog-hero-ridge-near" />
    </div>
  </section>
</template>
