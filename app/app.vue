<script setup lang="ts">
import { site } from '~/data/site'

const { public: publicConfig } = useRuntimeConfig()

useHead({
  titleTemplate: (title) => (title ? `${title} | ${site.authorName}` : site.defaultTitle),
  script: [
    {
      innerHTML: "(()=>{try{const t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}})()",
    },
  ],
  meta: publicConfig.googleSiteVerification
    ? [{ name: 'google-site-verification', content: publicConfig.googleSiteVerification }]
    : [],
})

useSeoMeta({
  description: site.defaultDescription,
  ogSiteName: site.siteName,
  ogType: 'website',
  ogImage: site.defaultOgImage,
  ogImageAlt: 'Ahmed Hindy portfolio preview with portrait and Pipeline TD focus areas.',
  twitterCard: 'summary_large_image',
  twitterImage: site.defaultOgImage,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
