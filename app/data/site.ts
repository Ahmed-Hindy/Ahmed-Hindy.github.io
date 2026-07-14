export const site = {
  siteName: 'Ahmed Hindy Portfolio',
  siteUrl: 'https://ahmed-hindy.github.io',
  defaultTitle: 'Ahmed Hindy — Pipeline TD / VFX Pipeline Developer',
  defaultDescription:
    'Ahmed Hindy is a Pipeline TD and VFX Pipeline Developer focused on Python tools, Houdini, Solaris/USD, Maya, rendering, publishing, Deadline/PDG, and artist-facing production workflows.',
  defaultOgImage: 'https://ahmed-hindy.github.io/og-image-2026-07-14.jpg',
  authorName: 'Ahmed Hindy',
  authorRole: 'Pipeline TD / VFX Pipeline Developer',
  authorLocation: 'Cairo, Egypt',
} as const

export const absoluteUrl = (path: string) => new URL(path, `${site.siteUrl}/`).toString()
