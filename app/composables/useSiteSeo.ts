import { absoluteUrl, site } from '~/data/site'

export const useSiteSeo = (input: {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
}) => {
  const image = input.image ? absoluteUrl(input.image) : site.defaultOgImage

  useSeoMeta({
    title: input.title,
    description: input.description,
    ogTitle: input.title,
    ogDescription: input.description,
    ogType: input.type ?? 'website',
    ogUrl: absoluteUrl(input.path),
    ogImage: image,
    ogImageAlt: input.imageAlt,
    twitterCard: 'summary_large_image',
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: image,
    twitterImageAlt: input.imageAlt,
  })
  useHead({ link: [{ rel: 'canonical', href: absoluteUrl(input.path) }] })
}
