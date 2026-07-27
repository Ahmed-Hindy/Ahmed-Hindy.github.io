export type ProfileIcon = 'mail' | 'resume' | 'github' | 'linkedin' | 'youtube'

export interface ProfileLink {
  href: string
  icon: ProfileIcon
  label: string
  external?: boolean
}

export interface NavItem {
  href: string
  label: string
}

export interface SummaryItem {
  label: string
  value: string
}

export interface ExperienceItem {
  title: string
  meta: string
  details: string
}

export interface Project {
  title: string
  summary: string
  tags: string[]
  href?: string
  media?: {
    image?: {
      src: string
      alt: string
      width: number
      height: number
      webp: Array<{
        src: string
        width: number
      }>
    }
    video?: {
      src: string
      poster?: string
    }
  }
}

export interface ProjectSection {
  title: string
  projects: Project[]
}

export interface SkillGroup {
  title: string
  skills: string[]
}

export const links = {
  email: 'mailto:ahmed.hindy96@gmail.com',
  github: 'https://github.com/Ahmed-Hindy',
  linkedin: 'https://linkedin.com/in/ahmed-hindy96',
  resume:
    'https://drive.google.com/file/d/1ME3KSJ0DFITPFr8mHBE3dmCq8Wr64VQX/view?usp=sharing',
  youtube: 'https://youtube.com/@Axe_FX',
}

export const profileLinks: ProfileLink[] = [
  { href: links.email, icon: 'mail', label: 'Email' },
  { href: links.resume, icon: 'resume', label: 'Resume', external: true },
  { href: links.github, icon: 'github', label: 'GitHub', external: true },
  { href: links.linkedin, icon: 'linkedin', label: 'LinkedIn', external: true },
  { href: links.youtube, icon: 'youtube', label: 'YouTube', external: true },
]

export const focusChips = ['Pipeline', 'Houdini', 'USD', 'Maya', 'Unreal']

export const navItems: NavItem[] = [
  { href: '/#overview', label: 'Overview' },
  { href: '/#work', label: 'Public Tools' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
  { href: '/blog/', label: 'Blog' },
]

export const summary: SummaryItem[] = [
  {
    label: 'Departments supported',
    value: 'FX, Lighting, Character, Groom, and related teams.',
  },
]

export const experience: ExperienceItem[] = [
  {
    title: 'Pipeline TD',
    meta: '2023 - Present / Trend VFX',
    details:
      'Designed and maintained hybrid USD publishing and render handoff workflows used across FX, Lighting, and Character departments. Built Python tools, PySide/PyQt interfaces, HDAs, and utilities for validation, render submission, asset handoff, and production debugging across Houdini, Solaris, Maya, Deadline, and PDG.',
  },
  {
    title: 'Houdini FX TD',
    meta: '2022 - 2024 / Trend VFX',
    details:
      'Created Houdini FX work for photoreal projects using pyro, RBD, POP particles, vellum, muscle, and crowds. That background helps me build pipeline tools with a practical understanding of artist scenes, caches, render errors, and handoff problems.',
  },
  {
    title: 'FX Artist',
    meta: '2021 - 2022 / Freelance',
    details:
      'Delivered Houdini FX work for international clients, with a focus on clean setups, reliable caches, and production-ready simulation results.',
  },
]

export const projectSections: ProjectSection[] = [
  {
    title: 'Featured tools',
    projects: [
      {
        title: 'USD Optimize App',
        summary:
          'Standalone CLI and GUI for inspecting, validating, and optimizing OpenUSD stages.',
        tags: ['OpenUSD', 'Optimization', 'NVIDIA', 'PySide6', 'CLI'],
        href: 'https://github.com/Ahmed-Hindy/usd-optimize-app',
        media: {
          image: {
            src: 'https://raw.githubusercontent.com/Ahmed-Hindy/usd-optimize-app/main/a.png',
            alt: 'USD Optimize App interface showing the Safe Cleanup workflow and scene hierarchy',
            width: 1181,
            height: 858,
            webp: [],
          },
        },
      },
      {
        title: 'Universal Scene Converter',
        summary:
          'Standalone CLI for converting between OpenUSD, FBX, OBJ, STL, and glTF files.',
        tags: ['OpenUSD', 'FBX', 'OBJ', 'STL', 'glTF', 'CLI'],
        href: 'https://github.com/Ahmed-Hindy/universal-scene-converter',
        media: {
          image: {
            src: 'https://raw.githubusercontent.com/Ahmed-Hindy/universal-scene-converter/9a4244b81ee29fc217ff0ab6fe0bcba899a353c0/docs/images/universal-scene-converter-format-cycle.png',
            alt: 'Universal Scene Converter format cycle between OpenUSD, FBX, OBJ, STL, and glTF',
            width: 360,
            height: 360,
            webp: [],
          },
        },
      },
      {
        title: 'Kitsu Docker Prod',
        summary:
          'Production-style Kitsu deployment with separated services, persistent data, and automated backups.',
        tags: ['Docker', 'Kitsu', 'Postgres', 'Traefik', 'Pipeline'],
        href: 'https://github.com/Ahmed-Hindy/Kitsu-Docker-Prod',
        media: {
          image: {
            src: 'https://raw.githubusercontent.com/Ahmed-Hindy/Kitsu-Docker-Prod/418480d9f4f24e50bb5a4adee15a3d792b3e29ec/docs/images/kitsu-running.png',
            alt: 'Kitsu running from the production Docker stack',
            width: 996,
            height: 926,
            webp: [],
          },
        },
      },
      {
        title: 'RenderKit',
        summary:
          'Image-sequence conversion tool with burn-ins and contact-sheet support.',
        tags: ['PySide6', 'OpenImageIO', 'OpenColorIO', 'FFmpeg'],
        href: 'https://github.com/Ahmed-Hindy/renderkit',
        media: {
          image: {
            src: '/projects/renderkit/renderkit-ui-screenshot.png',
            alt: 'RenderKit image sequence conversion interface',
            width: 1404,
            height: 984,
            webp: [
              { src: '/projects/renderkit/renderkit-ui-screenshot-640w.webp', width: 640 },
              { src: '/projects/renderkit/renderkit-ui-screenshot-960w.webp', width: 960 },
            ],
          },
        },
      },
      {
        title: 'h_denoise_utils',
        summary:
          'Standalone denoising GUI with bundled OptiX and OIDN, including multi-AOV EXR support.',
        tags: ['Nvidia', 'OptiX', 'CLI', 'Intel', 'OIDN', 'PySide6', 'EXR'],
        href: 'https://github.com/Ahmed-Hindy/h_denoise_utils',
        media: {
          image: {
            src: '/projects/h-denoise-utils/demo-poster.png',
            alt: 'h_denoise_utils drag-and-drop denoising interface',
            width: 1280,
            height: 720,
            webp: [
              { src: '/projects/h-denoise-utils/demo-poster-640w.webp', width: 640 },
            ],
          },
          video: {
            src: '/projects/h-denoise-utils/demo.mp4',
            poster: '/projects/h-denoise-utils/demo-poster-640w.webp',
          },
        },
      },
    ],
  },
  {
    title: 'Pipeline / USD utilities',
    projects: [
      {
        title: 'Kitsu Desktop',
        summary:
          'Windows desktop client for artists using Kitsu, with connection checks and system-tray actions.',
        tags: ['Tauri', 'TypeScript', 'Kitsu', 'Desktop'],
        href: 'https://github.com/Ahmed-Hindy/kitsu-desktop-launcher',
        media: {
          image: {
            src: '/projects/kitsu-desktop/kitsu-dashboard.png',
            alt: 'Kitsu dashboard open in the Kitsu Desktop application',
            width: 1397,
            height: 927,
            webp: [
              { src: '/projects/kitsu-desktop/kitsu-dashboard-640w.webp', width: 640 },
              { src: '/projects/kitsu-desktop/kitsu-dashboard-960w.webp', width: 960 },
            ],
          },
        },
      },
      {
        title: 'Substance Painter USD Creator',
        summary:
          'Substance Painter plugin for publishing layered USD assets.',
        tags: ['USD', 'Substance Painter', 'Materials', 'Publishing'],
        href: 'https://github.com/Ahmed-Hindy/Substance-Painter-Usd-Creator',
        media: {
          image: {
            src: '/projects/substance-painter-usd-creator/substance-painter-usd-creator.png',
            alt: 'Substance Painter USD Creator plugin interface',
            width: 718,
            height: 809,
            webp: [
              {
                src: '/projects/substance-painter-usd-creator/substance-painter-usd-creator-640w.webp',
                width: 640,
              },
            ],
          },
        },
      },
      {
        title: 'Houdini / USD Utilities',
        summary:
          'Houdini/Solaris utilities including an Arnold OBJ light to USD translator.',
        tags: ['Houdini', 'Solaris', 'USD', 'Arnold', 'Artist Tools'],
        href: 'https://github.com/Ahmed-Hindy/Arnold-husd-translator',
        media: {
          image: {
            src: '/projects/houdini-usd-utilities/arnold-husd-translator.png',
            alt: 'Arnold OBJ light to USD translator running in Houdini Solaris',
            width: 1919,
            height: 967,
            webp: [
              { src: '/projects/houdini-usd-utilities/arnold-husd-translator-640w.webp', width: 640 },
              { src: '/projects/houdini-usd-utilities/arnold-husd-translator-960w.webp', width: 960 },
            ],
          },
        },
      },
      {
        title: 'Materials Processor',
        summary:
          'Material ingestion and conversion tool for standardizing networks across USD and MaterialX.',
        tags: ['Houdini', 'USD', 'MaterialX', 'Arnold', 'Redshift'],
        href: 'https://github.com/Ahmed-Hindy/Materials-Processor',
      },
      {
        title: 'USD Scene Audit',
        summary:
          'OpenUSD audit tools for mesh naming, hierarchy, materials, and layer structure.',
        tags: ['Python', 'OpenUSD', 'SanityCheck', 'CLI'],
        href: 'https://github.com/Ahmed-Hindy/usd-scene-audit',
      },
      {
        title: 'hou-scene-inspector',
        summary:
          'Houdini .hip inspector for reading node data.',
        tags: ['Python', 'Houdini', 'HIP Files', 'Parser', 'CLI'],
        href: 'https://github.com/Ahmed-Hindy/hou-scene-inspector',
      },
    ],
  },
  {
    title: 'Infrastructure & experiments',
    projects: [
      {
        title: 'Homelab / Local LLMs',
        summary:
          'Docker-based homelab for self-hosted tools and local LLM workflows.',
        tags: ['Docker', 'Homelab', 'Local LLMs', 'Self-hosting'],
      },
    ],
  },
  {
    title: 'Side quests',
    projects: [
      {
        title: 'Hitman ItemSpawner',
        summary:
          'Hitman 3 mod for spawning items in-game, built on top of ZHM Mod SDK.',
        tags: ['C++', 'ZHMModSDK'],
        href: 'https://github.com/Ahmed-Hindy/Hitman-ItemSpawner',
      },
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    title: 'Core strengths',
    skills: [
      'Python',
      'Qt / PySide6 / PyQt6',
      'Houdini',
      'Solaris',
      'USD',
      'Publishing',
      'Validation',
      'Deadline',
      'PDG',
      'Artist-facing tools',
      'Production debugging',
      'Documentation',
    ],
  },
  {
    title: 'Production working knowledge',
    skills: [
      'Maya',
      'AYON',
      'Kitsu',
      'MaterialX',
      'Arnold',
      'RenderMan',
      'Redshift',
      'Rendering',
      'Farm support',
      'Git',
      'Cross-DCC handoff',
    ],
  },
  {
    title: 'Supporting / side experience',
    skills: [
      'Docker',
      'SQLite',
      'Postgres',
      'Bash',
      'Basic C++',
      'Basic Rust',
      'C#',
      'Unreal Engine basics',
      'JavaScript / Vue enthusiast',
    ],
  },
]
