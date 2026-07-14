<template>
  <section class="blog-hero">
    <div class="blog-hero-inner">
      <slot />
    </div>
    <div class="blog-hero-landscape" aria-hidden="true">
      <span class="blog-hero-cloud blog-hero-cloud-one" />
      <span class="blog-hero-cloud blog-hero-cloud-two" />
      <span class="blog-hero-cloud blog-hero-cloud-three" />
      <span class="blog-hero-cloud blog-hero-cloud-four" />
    </div>
  </section>
</template>
