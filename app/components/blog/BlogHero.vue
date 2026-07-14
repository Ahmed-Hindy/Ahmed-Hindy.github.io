<template>
  <section class="blog-hero">
    <div class="blog-hero-inner">
      <slot />
    </div>
    <svg
      class="blog-hero-cloud-seam"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
    >
      <path
        fill="currentColor"
        d="M0 98C54 92 76 54 126 54c55 0 64 48 112 48 43 0 54-35 99-35 50 0 67 63 129 63 50 0 63-52 117-52 51 0 67 37 117 37 48 0 71-58 128-58 54 0 66 49 119 49 47 0 60-36 106-36 55 0 70 63 129 63 51 0 67-53 119-53 53 0 63 42 113 42 35 0 56-25 94-25 37 0 58 20 86 20v73H0Z"
      />
    </svg>
  </section>
</template>
