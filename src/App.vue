<script setup lang="ts">
import profileImage from './assets/profile.jpg'

const links = {
  email: 'mailto:Ahmed.hindy96@gmail.com',
  github: 'https://github.com/Ahmed-Hindy',
  linkedin: 'https://www.linkedin.com/in/ahmed-hindy96/',
  resume:
    'https://drive.google.com/file/d/1Z_kxy2KLX37aWCo5lGf7RSoDb629Nnlj/view?usp=sharing',
  youtube: 'https://www.youtube.com/@axe_fx',
}

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#resume', label: 'Resume' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const summary = [
  { label: 'Location', value: 'Cairo, Egypt' },
  { label: 'Focus', value: 'Houdini pipeline tools, USD, material workflows' },
  { label: 'Stack', value: 'Python, Qt/PySide, TypeScript, Vue, GitHub Actions' },
  { label: 'Availability', value: 'Pipeline, tooling, and technical-art work' },
]

const experience = [
  {
    title: 'Pipeline / Technical Artist',
    meta: 'Houdini, USD, DCC automation',
    details:
      'Builds tools that turn production workflows into repeatable, testable systems for artists and technical teams.',
  },
  {
    title: 'Python Tool Developer',
    meta: 'CLI tools, desktop utilities, validation',
    details:
      'Works across implementation, packaging, documentation, and release checks with a focus on real runtime behavior.',
  },
  {
    title: 'Material Workflow Development',
    meta: 'USD, MaterialX, renderer-facing pipelines',
    details:
      'Develops conversion and inspection workflows for material networks, scene data, and DCC handoff.',
  },
]

const projects = [
  {
    title: 'Materials Processor',
    summary:
      'Houdini-focused material conversion and validation workflows for USD and MaterialX-oriented production pipelines.',
    tags: ['Houdini', 'USD', 'Python', 'MaterialX'],
  },
  {
    title: 'HipFile Recreator',
    summary:
      'Manifest-driven tools for rebuilding Houdini scenes, comparing outputs, and validating graph-level behavior.',
    tags: ['Houdini', 'Qt', 'Testing', 'CLI'],
  },
  {
    title: 'Denoise Utilities',
    summary:
      'Image and video denoising utilities packaged for practical local workflows and GPU-aware processing.',
    tags: ['Python', 'OptiX', 'OIDN', 'Packaging'],
  },
]

const skills = [
  'Python tooling',
  'Houdini pipeline development',
  'USD workflows',
  'Material processing',
  'Qt/PySide interfaces',
  'CLI automation',
  'GitHub Actions',
  'Release packaging',
  'Technical debugging',
  'Artist-facing UX',
]
</script>

<template>
  <div class="site-shell">
    <aside class="sidebar" aria-label="Profile sidebar">
      <img :src="profileImage" alt="Ahmed Hindy" class="sidebar-photo" />
      <p class="role">Technical Artist / Pipeline Developer</p>
      <h1>Ahmed Hindy</h1>
      <p class="sidebar-summary">
        Production-oriented tools for Houdini, USD, material workflows, and DCC automation.
      </p>

      <nav class="sidebar-nav" aria-label="Section navigation">
        <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <div class="sidebar-links" aria-label="Profile links">
        <a :href="links.resume" target="_blank" rel="noreferrer">Resume</a>
        <a :href="links.github" target="_blank" rel="noreferrer">GitHub</a>
        <a :href="links.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        <a :href="links.youtube" target="_blank" rel="noreferrer">YouTube</a>
      </div>
    </aside>

    <main class="content">
      <section class="mobile-intro">
        <img :src="profileImage" alt="Ahmed Hindy" class="mobile-photo" />
        <p class="role">Technical Artist / Pipeline Developer</p>
        <h1>Ahmed Hindy</h1>
      </section>

      <section class="section" id="about">
        <p class="section-kicker">About</p>
        <h2>Pipeline-focused technical artist building reliable production tools.</h2>
        <p class="intro">
          I work at the intersection of technical art and engineering, creating tools that make
          DCC workflows easier to run, validate, package, and hand off. My current focus is Houdini
          tooling, USD/material workflows, Python automation, and desktop utilities for production
          teams.
        </p>

        <dl class="summary-grid">
          <div v-for="item in summary" :key="item.label">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </section>

      <section class="section" id="resume">
        <div class="section-header">
          <div>
            <p class="section-kicker">Resume</p>
            <h2>Experience profile</h2>
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
        <p class="section-kicker">Selected work</p>
        <h2>Representative projects</h2>
        <div class="work-grid">
          <article v-for="project in projects" :key="project.title" class="work-card">
            <h3>{{ project.title }}</h3>
            <p>{{ project.summary }}</p>
            <ul>
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section" id="skills">
        <p class="section-kicker">Skills</p>
        <h2>Tools and production capabilities</h2>
        <ul class="skill-cloud">
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
      </section>

      <section class="section contact" id="contact">
        <div>
          <p class="section-kicker">Contact</p>
          <h2>Available for pipeline, tooling, and technical-art work.</h2>
          <p>
            For production tools, Houdini workflows, material pipelines, or technical-art support,
            email me directly or connect through GitHub and LinkedIn.
          </p>
        </div>
        <div class="contact-actions">
          <a class="button primary" :href="links.email">Email</a>
          <a class="button" :href="links.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
          <a class="button" :href="links.github" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>
    </main>
  </div>
</template>
