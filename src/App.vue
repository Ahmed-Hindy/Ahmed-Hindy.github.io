<script setup lang="ts">
import heroImage from './assets/hero.png'
import profileImage from './assets/profile.jpg'

const links = {
  email: 'mailto:Ahmed.hindy96@gmail.com',
  github: 'https://github.com/Ahmed-Hindy',
  linkedin: 'https://www.linkedin.com/in/ahmed-hindy96/',
  resume:
    'https://drive.google.com/file/d/1Z_kxy2KLX37aWCo5lGf7RSoDb629Nnlj/view?usp=sharing',
  youtube: 'https://www.youtube.com/@axe_fx',
}

const projects = [
  {
    title: 'Materials Processor',
    type: 'Pipeline tooling',
    summary:
      'Houdini-focused material conversion and validation workflows for USD and MaterialX-oriented production pipelines.',
    tags: ['Houdini', 'USD', 'Python', 'MaterialX'],
  },
  {
    title: 'HipFile Recreator',
    type: 'Scene reconstruction',
    summary:
      'Manifest-driven tools for rebuilding Houdini scenes, comparing outputs, and validating graph-level behavior.',
    tags: ['Houdini', 'Qt', 'Testing', 'CLI'],
  },
  {
    title: 'Denoise Utilities',
    type: 'Desktop utility',
    summary:
      'Image and video denoising utilities packaged for practical local workflows and GPU-aware processing.',
    tags: ['Python', 'OptiX', 'OIDN', 'Packaging'],
  },
]

const skills = [
  'Python tooling',
  'Houdini pipeline development',
  'USD and material workflows',
  'Qt desktop interfaces',
  'CLI automation',
  'GitHub release workflows',
  'Technical debugging',
  'Artist-friendly UX',
]

const highlights = [
  'Develops pipeline tools that connect DCC workflows, automation, and artist-facing interfaces.',
  'Works across implementation, debugging, packaging, documentation, and release validation.',
  'Prioritizes real project files and runtime checks when evaluating tool behavior.',
]

const experience = [
  {
    label: 'Focus',
    value: 'Houdini pipeline tools, USD workflows, material processing, desktop utilities',
  },
  {
    label: 'Working style',
    value: 'Practical engineering, repeatable validation, clear handoff documentation',
  },
  {
    label: 'Preferred stack',
    value: 'Python, Qt/PySide, TypeScript, Vue, GitHub Actions, command-line tooling',
  },
]
</script>

<template>
  <header class="site-header" aria-label="Primary navigation">
    <a class="brand" href="#top" aria-label="Ahmed Hindy home">Ahmed Hindy</a>
    <nav>
      <a href="#work">Work</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero-section">
      <div class="hero-copy">
        <div class="hero-identity">
          <img :src="profileImage" alt="Ahmed Hindy" class="hero-photo" />
          <div>
            <p class="eyebrow">Technical Artist / Pipeline Developer</p>
            <h1>Ahmed Hindy</h1>
          </div>
        </div>
        <p class="lead">
          I build production-oriented tools for Houdini, USD, material workflows, and DCC
          automation. My work sits between technical direction and implementation: making artist
          workflows easier to reproduce, validate, and maintain.
        </p>
        <div class="hero-actions" aria-label="Primary actions">
          <a class="button button-primary" :href="links.email">Contact me</a>
          <a class="button button-secondary" :href="links.resume" target="_blank" rel="noreferrer">
            View resume
          </a>
        </div>
      </div>

      <aside class="hero-panel" aria-label="Profile summary">
        <div class="profile-card">
          <div class="profile-media">
            <img :src="heroImage" alt="" class="profile-mark" aria-hidden="true" />
          </div>
          <p class="profile-kicker">Profile</p>
          <dl class="profile-list">
            <div v-for="item in experience" :key="item.label">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </section>

    <section class="section-band" id="work">
      <div class="section-heading">
        <p class="eyebrow">Selected work</p>
        <h2>Representative projects and technical areas.</h2>
      </div>

      <div class="project-list">
        <article v-for="project in projects" :key="project.title" class="project-card">
          <div>
            <p class="project-type">{{ project.type }}</p>
            <h3>{{ project.title }}</h3>
          </div>
          <p class="project-summary">{{ project.summary }}</p>
          <ul class="tag-list" :aria-label="`${project.title} technologies`">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="split-section" id="skills">
      <div class="section-heading">
        <p class="eyebrow">Capabilities</p>
        <h2>Production skills across tools, pipelines, and delivery.</h2>
      </div>

      <div class="skills-wrap">
        <ul class="skill-list" aria-label="Skills and tools">
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
        <div class="highlight-list">
          <p v-for="highlight in highlights" :key="highlight">{{ highlight }}</p>
        </div>
      </div>
    </section>

    <section class="contact-section" id="contact">
      <div>
        <p class="eyebrow">Contact</p>
        <h2>Available for pipeline, tooling, and technical-art work.</h2>
        <p>
          Replace the links below with your real GitHub, LinkedIn, email, and resume once the
          public repo is ready.
        </p>
      </div>
      <div class="contact-links" aria-label="Contact links">
        <a :href="links.github" target="_blank" rel="noreferrer">GitHub</a>
        <a :href="links.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        <a :href="links.youtube" target="_blank" rel="noreferrer">YouTube</a>
        <a :href="links.email">Email</a>
        <a :href="links.resume" target="_blank" rel="noreferrer">Resume</a>
      </div>
    </section>
  </main>
</template>
