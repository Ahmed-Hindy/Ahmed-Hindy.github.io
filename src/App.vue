<script setup lang="ts">
import { computed, ref } from 'vue'
import profileImage from './assets/profile.jpg'

type Theme = 'light' | 'dark'

const themeStorageKey = 'theme'

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const getStoredTheme = (): Theme | null => {
  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey)
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null
  } catch {
    return null
  }
}

const storeTheme = (nextTheme: Theme) => {
  try {
    window.localStorage.setItem(themeStorageKey, nextTheme)
  } catch {
    // Ignore storage failures; the toggle still works for the current page view.
  }
}

const getInitialTheme = (): Theme => {
  return getStoredTheme() ?? getSystemTheme()
}

const applyTheme = (nextTheme: Theme) => {
  document.documentElement.dataset.theme = nextTheme
}

const theme = ref<Theme>(getInitialTheme())
applyTheme(theme.value)

const isDarkTheme = computed(() => theme.value === 'dark')
const themeToggleLabel = computed(() =>
  isDarkTheme.value ? 'Switch to light mode' : 'Switch to dark mode',
)

const toggleTheme = () => {
  theme.value = isDarkTheme.value ? 'light' : 'dark'
  applyTheme(theme.value)
  storeTheme(theme.value)
}

const links = {
  email: 'mailto:ahmed.hindy96@gmail.com',
  github: 'https://github.com/Ahmed-Hindy',
  linkedin: 'https://linkedin.com/in/ahmed-hindy96',
  resume:
    'https://drive.google.com/file/d/1Z_kxy2KLX37aWCo5lGf7RSoDb629Nnlj/view?usp=sharing',
  youtube: 'https://youtube.com/@Axe_FX',
}

const profileLinks = [
  { href: links.email, icon: 'mail', label: 'Email' },
  { href: links.resume, icon: 'resume', label: 'Resume', external: true },
  { href: links.github, icon: 'github', label: 'GitHub', external: true },
  { href: links.linkedin, icon: 'linkedin', label: 'LinkedIn', external: true },
  { href: links.youtube, icon: 'youtube', label: 'YouTube', external: true },
]

const focusChips = ['Pipeline', 'Houdini', 'USD', 'Maya', 'Unreal']

const navItems = [
  { href: '#overview', label: 'Overview' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Public Tools' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const summary = [
  {
    label: 'Primary focus',
    value:
      'All things 3D pipeline related: Houdini, Solaris/USD, Maya, Unreal, Deadline, and PySide/PyQt GUIs',
  },
  {
    label: 'Production work',
    value:
      'Cross-DCC pipelines involving Publishing, Farm Rendering, Validation, and Scene Debugging',
  },
  {
    label: 'Departments supported',
    value: 'FX, Lighting, Character, Groom, and related teams.',
  },
  {
    label: 'Current direction',
    value:
      'A generalist Pipeline TD, with most experience being with Houdini, USD, Unreal and Substance',
  },
]

const experience = [
  {
    title: 'Pipeline TD',
    meta: '2023 — Present / Trend VFX',
    details:
      'Designed and maintained hybrid USD publishing and render handoff workflows used across FX, Lighting, and Character departments. Built Python tools, PySide/PyQt interfaces, HDAs, and utilities for validation, render submission, asset handoff, and production debugging across Houdini, Solaris, Maya, Deadline, and PDG.',
  },
  {
    title: 'Houdini FX TD',
    meta: '2022 — 2024 / Trend VFX',
    details:
      'Created Houdini FX work for photoreal projects using pyro, RBD, POP particles, vellum, muscle, and crowds. That background helps me build pipeline tools with a practical understanding of artist scenes, caches, render errors, and handoff problems.',
  },
  {
    title: 'FX Artist',
    meta: '2021 — 2022 / Freelance',
    details:
      'Delivered Houdini FX work for international clients, with a focus on clean setups, reliable caches, and production-ready simulation results.',
  },
]

const projects = [
  {
    title: 'RenderKit',
    summary:
      'VFX image-sequence review and conversion tool with CLI, UI, burn-ins, and multi-AOV contact sheets.',
    tags: ['PySide6', 'OpenImageIO', 'OpenColorIO', 'FFmpeg'],
    href: 'https://github.com/Ahmed-Hindy/renderkit',
  },
  {
    title: 'h_denoise_utils',
    summary:
      'Standalone denoising GUI and CLI with bundled OptiX and OIDN. Support multi-AOV EXRs',
    tags: ['Nvidia', 'OptiX', 'Intel', 'OIDN', 'PySide6', 'CLI', 'EXR'],
    href: 'https://github.com/Ahmed-Hindy/h_denoise_utils',
  },
  {
    title: 'Hitman ItemSpawner',
    summary:
      'Hitman 3 mod for spawning items in-game, built on top of ZHM Mod SDK.',
    tags: ['C++', 'ZHMModSDK'],
    href: 'https://github.com/Ahmed-Hindy/Hitman-ItemSpawner',
  },
  {
    title: 'Substance Painter USD Creator',
    summary:
      'Substance Painter plugin for structured USD asset and material publishing, including layered USD outputs, ' +
        'texture publishing, material bindings, and renderer-ready material workflows.',
    tags: ['USD', 'Substance Painter', 'Materials', 'Publishing', 'Python'],
    href: 'https://github.com/Ahmed-Hindy/Substance-Painter-Usd-Creator',
  },
  {
    title: 'Materials Processor',
    summary:
      'Material ingestion and conversion tool for standardizing complex material networks across USD, Houdini, ' +
        'Arnold, MaterialX, Redshift, and related DCC workflows.',
    tags: ['Houdini', 'USD', 'MaterialX', 'Arnold', 'Redshift'],
    href: 'https://github.com/Ahmed-Hindy/Materials-Processor',
  },
  {
    title: 'Kitsu Docker Prod',
    summary:
      'Production-style Kitsu/Zou deployment using Docker, Postgres, Traefik, version pinning, and automated backups.',
    tags: ['Docker', 'Kitsu', 'Postgres', 'Traefik', 'Pipeline'],
    href: 'https://github.com/Ahmed-Hindy/Kitsu-Docker-Prod',
  },
  {
    title: 'Homelab / Local LLMs',
    summary:
      'A personal Docker-based homelab for self-hosted tools, experiments, and local LLM workflows. Mostly built for learning, tinkering, and breaking things safely.',
    tags: ['Docker', 'Homelab', 'Local LLMs', 'Self-hosting'],
  },
  {
    title: 'Houdini / USD Utilities',
    summary:
      'Houdini and Solaris utilities, including an Arnold OBJ light to Solaris/USD translator and a drag-and-drop workflow plugin for artists.',
    tags: ['Houdini', 'Solaris', 'USD', 'Arnold', 'Artist Tools'],
    href: 'https://github.com/Ahmed-Hindy/Arnold-husd-translator',
  },
]

const skills = [
  'Python',
  'Qt / PySide6 / PyQt6',
  'AYON',
  'Kitsu',
  'Houdini',
  'Maya',
  'Solaris',
  'USD',
  'MaterialX',
  'Arnold',
  'RenderMan',
  'Redshift',
  'Unreal Engine basics',
  'Deadline',
  'PDG',
  'Publishing',
  'Rendering',
  'Sanity checks',
  'Git',
  'Docker',
  'SQLite',
  'Postgres',
  'C++ basics',
  'Bash',
  'JavaScript enthusiast',
  'Documentation',
  'Artist support',
]
</script>

<template>
  <svg class="icon-sprite" aria-hidden="true" focusable="false">
    <symbol id="icon-mail" viewBox="0 0 24 24">
      <path
        d="M4 6h16v12H4z"
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <path
        d="m4 7 8 6 8-6"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </symbol>
    <symbol id="icon-resume" viewBox="0 0 24 24">
      <path
        d="M7 3h7l4 4v14H7z"
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <path
        d="M14 3v5h4M10 12h5M10 16h5"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </symbol>
    <symbol id="icon-github" viewBox="0 0 24 24">
      <path
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.18-3.37-1.18a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83c.05-.51.26-.98.62-1.34-2.22-.25-4.56-1.11-4.56-4.95a3.87 3.87 0 0 1 1.03-2.69 3.6 3.6 0 0 1 .1-2.65s.84-.27 2.75 1.03a9.48 9.48 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.37.83.41 1.77.1 2.65a3.87 3.87 0 0 1 1.03 2.69c0 3.85-2.34 4.69-4.57 4.94.48.49.73 1.16.68 1.84v2.58c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
        fill="currentColor"
      />
    </symbol>
    <symbol id="icon-linkedin" viewBox="0 0 24 24">
      <path
        d="M6.94 8.98H3.75v10.27h3.19ZM5.35 7.58a1.85 1.85 0 1 0 0-3.7 1.85 1.85 0 0 0 0 3.7ZM20.25 19.25h-3.18v-5c0-1.2-.02-2.74-1.67-2.74s-1.93 1.31-1.93 2.66v5.08h-3.18V8.98h3.05v1.4h.04a3.35 3.35 0 0 1 3.01-1.65c3.22 0 3.86 2.12 3.86 4.88Z"
        fill="currentColor"
      />
    </symbol>
    <symbol id="icon-youtube" viewBox="0 0 24 24">
      <path
        d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.94C17.93 4.8 12 4.8 12 4.8s-5.93 0-7.64.45a2.75 2.75 0 0 0-1.94 1.94A28.64 28.64 0 0 0 2 12a28.64 28.64 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.94c1.71.45 7.64.45 7.64.45s5.93 0 7.64-.45a2.75 2.75 0 0 0 1.94-1.94A28.64 28.64 0 0 0 22 12a28.64 28.64 0 0 0-.42-4.81ZM10 15.2V8.8l5.2 3.2Z"
        fill="currentColor"
      />
    </symbol>
  </svg>

  <div class="site-shell">
    <aside class="sidebar" aria-label="Profile sidebar">
      <img :src="profileImage" alt="Ahmed Hindy" class="sidebar-photo" />
      <p class="role">Pipeline TD / VFX Pipeline Developer</p>
      <h1>Ahmed Hindy</h1>

      <ul class="focus-chips" aria-label="Primary focus areas">
        <li v-for="chip in focusChips" :key="chip">{{ chip }}</li>
      </ul>

      <div class="sidebar-links" aria-label="Profile links">
        <a
          v-for="link in profileLinks"
          :key="link.label"
          :aria-label="link.label"
          :href="link.href"
          :rel="link.external ? 'noreferrer' : undefined"
          :target="link.external ? '_blank' : undefined"
          :title="link.label"
        >
          <svg class="link-icon" aria-hidden="true" focusable="false">
            <use :href="`#icon-${link.icon}`" />
          </svg>
          <span class="sr-only">{{ link.label }}</span>
        </a>
      </div>

      <nav class="sidebar-nav" aria-label="Section navigation">
        <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <button
        class="theme-toggle"
        type="button"
        :aria-label="themeToggleLabel"
        :aria-pressed="isDarkTheme"
        @click="toggleTheme"
      >
        <span class="theme-toggle-track" aria-hidden="true">
          <span class="theme-toggle-thumb">{{ isDarkTheme ? '☾' : '☀' }}</span>
        </span>
        <span>{{ isDarkTheme ? 'Dark' : 'Light' }}</span>
      </button>
    </aside>

    <main class="content">
      <section class="mobile-intro">
        <img :src="profileImage" alt="Ahmed Hindy" class="mobile-photo" />
        <p class="role">Pipeline TD / VFX Pipeline Developer</p>
        <p class="mobile-name">Ahmed Hindy</p>
        <ul class="focus-chips" aria-label="Primary focus areas">
          <li v-for="chip in focusChips" :key="chip">{{ chip }}</li>
        </ul>
        <div class="mobile-links" aria-label="Profile links">
          <a
            v-for="link in profileLinks"
            :key="link.label"
            :aria-label="link.label"
            :href="link.href"
            :rel="link.external ? 'noreferrer' : undefined"
            :target="link.external ? '_blank' : undefined"
            :title="link.label"
          >
            <svg class="link-icon" aria-hidden="true" focusable="false">
              <use :href="`#icon-${link.icon}`" />
            </svg>
            <span class="sr-only">{{ link.label }}</span>
          </a>
        </div>
        <button
          class="theme-toggle mobile-theme-toggle"
          type="button"
          :aria-label="themeToggleLabel"
          :aria-pressed="isDarkTheme"
          @click="toggleTheme"
        >
          <span class="theme-toggle-track" aria-hidden="true">
            <span class="theme-toggle-thumb">{{ isDarkTheme ? '☾' : '☀' }}</span>
          </span>
          <span>{{ isDarkTheme ? 'Dark' : 'Light' }}</span>
        </button>
      </section>

      <section class="section" id="overview">
        <p class="section-kicker">Overview</p>
        <h2>Pipeline Technical Director for Houdini, USD, Maya and UE5</h2>
        <p class="intro">
          I am a Pipeline Technical Director based in Cairo, Egypt. I build tools and workflows that sit between
          artists and pipeline engineering: publishing, render handoff, validation, farm debugging,
          and cross-DCC support.
        </p>
        <p class="intro">
          I started in Houdini FX, so I know the artist side of the problems I now solve: heavy scenes,
          broken caches, bad paths, failed farm jobs, missing versions, and USD composition issues.
          Outside production, I like tinkering with C++ game mods, Docker homelab setups, local LLMs,
          and Vue JS projects.
        </p>

        <dl class="summary-grid">
          <div v-for="item in summary" :key="item.label">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </section>

      <section class="section" id="experience">
        <div class="section-header">
          <div>
            <p class="section-kicker">Experience</p>
            <h2>Pipeline work grounded in real production problems.</h2>
          </div>
        </div>

        <div class="timeline">
          <article v-for="item in experience" :key="item.title" class="timeline-item">
            <p>{{ item.meta }}</p>
            <h3>{{ item.title }}</h3>
            <span>{{ item.details }}</span>
          </article>
        </div>
      </section>

      <section class="section" id="work">
        <div class="section-header">
          <div>
            <p class="section-kicker">Public Tools</p>
            <h2>Production tools, experiments, and side quests.</h2>
          </div>
        </div>
        <div class="work-grid">
          <article v-for="project in projects" :key="project.title" class="work-card">
            <h3>{{ project.title }}</h3>
            <p>{{ project.summary }}</p>
            <a v-if="project.href" :href="project.href" target="_blank" rel="noreferrer">
              View project
            </a>
            <ul>
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section" id="skills">
        <p class="section-kicker">Skills</p>
        <h2>Tools and workflows I use in production.</h2>
        <p class="intro">
          My strongest area is Python pipeline development for DCC tools, USD workflows,
          validation, farm support, and artist-facing interfaces.
        </p>
        <ul class="skill-cloud">
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
      </section>

      <section class="section contact" id="contact">
        <div>
          <p class="section-kicker">Contact</p>
          <h2>Let’s talk pipeline, tools, and production workflows.</h2>
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
            class="button"
            :class="{ primary: link.label === 'Email' }"
            :href="link.href"
            :rel="link.external ? 'noreferrer' : undefined"
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
    </main>
  </div>
</template>
