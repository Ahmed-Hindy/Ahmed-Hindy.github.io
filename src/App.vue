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
      'Python, Houdini, Solaris/USD, Maya, Deadline, PDG, and PySide/PyQt',
  },
  {
    label: 'Production work',
    value:
      'Cross-DCC pipelines involving Publishing, Farm Rendering, and Validation',
  },
  {
    label: 'Departments supported',
    value: 'FX, Lighting, Character, Groom, and related teams.',
  },
  {
    label: 'Current direction',
    value:
      'a generalist Pipeline TD, with most experience being with Houdini, USD, Unreal and Substance',
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
    meta: '2022 — Present / Trend VFX',
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
        I build production tools that help artists publish, render, debug, and hand off work across
        Houdini, USD, and Maya.
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
          I build production tools that help artists publish, render, debug, and hand off work
          across Houdini, USD, and Maya.
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
        <h2>Pipeline Technical Director for Houdini, USD, Maya and UE5</h2>
        <p class="intro">
          I am a Pipeline Technical Director based in Cairo, Egypt. I build tools and workflows that sit between
          artists and pipeline engineering: publishing, render handoff, validation, farm debugging,
          and cross-DCC support.
        </p>
        <p class="intro">
          I started in Houdini FX, so I know the artist side of the problems I now solve: heavy
          scenes, broken caches, bad paths, failed farm jobs, missing versions, and USD handoff
          issues.
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
            <h2>Selected public pipeline tools.</h2>
          </div>
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
          <a class="button primary" :href="links.email">
            <span class="button-icon" aria-hidden="true">@</span>
            <span>Email Me</span>
          </a>
          <a class="button" :href="links.resume" target="_blank" rel="noreferrer">
            <span class="button-icon" aria-hidden="true">CV</span>
            <span>Resume</span>
          </a>
          <a class="button" :href="links.github" target="_blank" rel="noreferrer">
            <span class="button-icon" aria-hidden="true">GH</span>
            <span>GitHub</span>
          </a>
          <a class="button" :href="links.linkedin" target="_blank" rel="noreferrer">
            <span class="button-icon" aria-hidden="true">in</span>
            <span>LinkedIn</span>
          </a>
          <a class="button" :href="links.youtube" target="_blank" rel="noreferrer">
            <span class="button-icon" aria-hidden="true">YT</span>
            <span>YouTube</span>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>
