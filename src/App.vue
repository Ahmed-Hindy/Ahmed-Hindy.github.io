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
      'Python, Houdini, Solaris/USD, Maya, Deadline/PDG, PySide/PyQt, publishing, rendering, and artist workflow automation.',
  },
  {
    label: 'Production work',
    value:
      'Hybrid USD publishing, render handoff, validation, farm support, scene debugging, and cross-DCC workflows.',
  },
  {
    label: 'Departments supported',
    value: 'FX, Lighting, Character, Groom, and related production teams.',
  },
  {
    label: 'Current direction',
    value:
      'Pipeline TD, Houdini Pipeline TD, USD Pipeline Developer, and DCC Tools Developer roles.',
  },
]

const experience = [
  {
    title: 'Pipeline TD',
    meta: '2023 — Present / Trend VFX',
    details:
      'Designed and maintained hybrid USD publishing and rendering workflows used across FX, Lighting, and Character departments. Built Python tools, PySide/PyQt interfaces, HDAs, and standalone utilities for publishing, validation, render submission, asset handoff, and production debugging across Houdini, Solaris, Maya, Maya-Arnold, Deadline, and PDG.',
  },
  {
    title: 'Houdini FX TD',
    meta: '2022 — Present / Trend VFX',
    details:
      'Created Houdini FX work for photoreal projects using pyro, RBD, POP particles, vellum, muscle, and crowds. This background helps me build pipeline tools with a practical understanding of artist scenes, caches, render errors, and cross-department handoff.',
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
      'VFX image-sequence review and conversion tool with Python API, CLI, PySide6 UI, OpenImageIO, OpenColorIO, FFmpeg, CRF quality control, burn-ins, and multi-AOV contact sheets.',
    tags: ['PySide6', 'OpenImageIO', 'OpenColorIO', 'FFmpeg'],
    href: 'https://github.com/Ahmed-Hindy/renderkit',
  },
  {
    title: 'Substance Painter USD Creator',
    summary:
      'Substance Painter plugin for structured USD asset and material publishing, including layered USD outputs, texture publishing, material bindings, and renderer-ready material workflows.',
    tags: ['USD', 'Substance Painter', 'Materials', 'Publishing', 'Python'],
    href: 'https://github.com/Ahmed-Hindy/Substance-Painter-Usd-Creator',
  },
  {
    title: 'Materials Processor',
    summary:
      'A Universal Material ingestion and conversion tool focused on standardizing complex material networks across USD, Houdini, Arnold, MaterialX, Redshift, and related DCC workflows.',
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
    title: 'Houdini / USD Utilities',
    summary:
      'A Houdini Solaris OBJ lights translator, translates Arnold OBJ light to standard USD lights. \n\n' +
        'A Houdini external drag-and-drop workflow plugin for artists.',
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
  'Unreal Engine 5',
  'Deadline',
  'PDG',
  'Publishing',
  'Rendering',
  'Sanity checks',
  'Git',
  'Docker',
  'SQLite',
  'Postgres',
  'C++',
  'Bash',
  'JavaScript',
  'Documentation',
  'Artist support',
]
</script>

<template>
  <div class="site-shell">
    <aside class="sidebar" aria-label="Profile sidebar">
      <img :src="profileImage" alt="Ahmed Hindy" class="sidebar-photo" />
      <p class="role">Pipeline TD / VFX Pipeline Developer</p>
      <h1>Ahmed Hindy</h1>
      <p class="sidebar-summary">
        I build artist-facing VFX pipeline tools for Houdini, Solaris/USD, Maya, rendering,
        publishing, and production support.
      </p>

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

      <div class="sidebar-links" aria-label="Profile links">
        <a :href="links.email">Email</a>
        <a :href="links.resume" target="_blank" rel="noreferrer">Resume</a>
        <a :href="links.github" target="_blank" rel="noreferrer">GitHub</a>
        <a :href="links.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        <a :href="links.youtube" target="_blank" rel="noreferrer">YouTube</a>
      </div>
    </aside>

    <main class="content">
      <section class="mobile-intro">
        <img :src="profileImage" alt="Ahmed Hindy" class="mobile-photo" />
        <p class="role">Pipeline TD / VFX Pipeline Developer</p>
        <p class="mobile-name">Ahmed Hindy</p>
        <p>
          I build artist-facing VFX pipeline tools for Houdini, Solaris/USD, Maya, rendering,
          publishing, and production support.
        </p>
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
        <h2>Pipeline Technical Director for Houdini, USD, Maya and UE5.</h2>
        <p class="intro">
          I am a Pipeline TD and VFX Pipeline Developer based in Cairo, Egypt. My work sits between
          artists and pipeline engineering: turning repeated production problems into tools, checks,
          workflows, and documentation that make scenes easier to publish, render, and hand off
          between departments.
        </p>
        <p class="intro">
          I started in Houdini FX, then moved deeper into pipeline work after spending enough time
          around heavy scenes, broken caches, bad paths, failed farm jobs, missing versions, USD
          handoff issues, and render setup problems. That artist background still shapes how I
          build tools.
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
            <h2>Production pipeline work grounded in real Houdini and VFX problems.</h2>
          </div>
          <a class="text-link" :href="links.resume" target="_blank" rel="noreferrer">
            Open resume
          </a>
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
            <h2>Selected pipeline tools and technical projects.</h2>
          </div>
          <a class="text-link" :href="links.github" target="_blank" rel="noreferrer">
            View GitHub
          </a>
        </div>
        <div class="work-grid">
          <article v-for="project in projects" :key="project.title" class="work-card">
            <h3>{{ project.title }}</h3>
            <p>{{ project.summary }}</p>
            <a :href="project.href" target="_blank" rel="noreferrer">View project</a>
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
          My strongest area is Python pipeline development around DCC tools, USD workflows,
          publishing, rendering, validation, farm support, and artist-facing interfaces.
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
            Developer roles. I am especially interested in teams building artist-facing tools,
            Houdini/USD workflows, publishing systems, render pipelines, and production automation.
          </p>
        </div>
        <div class="contact-actions">
          <a class="button primary" :href="links.email">Email Me</a>
          <a class="button" :href="links.resume" target="_blank" rel="noreferrer">Resume</a>
          <a class="button" :href="links.github" target="_blank" rel="noreferrer">GitHub</a>
          <a class="button" :href="links.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
          <a class="button" :href="links.youtube" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </section>
    </main>
  </div>
</template>
