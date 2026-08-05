<script setup lang="ts">
import { computed, ref } from 'vue'
import IconSprite from './components/IconSprite.vue'
import profileImage from './assets/profile.jpg'
import {
  experience,
  links,
  profileLinks,
  projectSections,
  skills,
  summary,
} from './data/portfolio'

const mobileMenuOpen = ref(false)

const featuredProjects = projectSections[0]?.projects ?? []
const supportingProjects = projectSections.slice(1).flatMap((section) =>
  section.projects.map((project) => ({ ...project, group: section.title })),
)
const skillGroups = computed(() => skills.map((group) => ({ ...group, count: group.skills.length })))

useHead({
  bodyAttrs: {
    class: 'cinematic-prototype-active',
  },
})

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <IconSprite />

  <div class="cinematic-home" :class="{ 'is-menu-open': mobileMenuOpen }">
    <header class="cinematic-header">
      <nav class="cinematic-nav" aria-label="Primary navigation">
        <NuxtLink class="cinematic-brand" to="/" aria-label="Ahmed Hindy home">
          <span class="cinematic-brand-mark">AH</span>
          <span class="cinematic-brand-name">Ahmed Hindy</span>
        </NuxtLink>

        <ul class="cinematic-nav-links">
          <li><a href="#about">About</a></li>
          <li class="nav-dot" aria-hidden="true"></li>
          <li><a href="#work">Work</a></li>
          <li class="nav-dot" aria-hidden="true"></li>
          <li><a href="#experience">Experience</a></li>
          <li class="nav-dot" aria-hidden="true"></li>
          <li><NuxtLink to="/blog/">Articles</NuxtLink></li>
        </ul>

        <a class="cinematic-nav-cta" :href="links.email">Let’s talk</a>

        <button
          class="cinematic-menu-button"
          type="button"
          :aria-expanded="mobileMenuOpen"
          aria-controls="cinematic-mobile-menu"
          aria-label="Toggle navigation"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>

    <div id="cinematic-mobile-menu" class="cinematic-mobile-menu" :aria-hidden="!mobileMenuOpen">
      <button class="mobile-menu-close" type="button" aria-label="Close navigation" @click="closeMobileMenu">
        ×
      </button>
      <nav aria-label="Mobile navigation">
        <a href="#about" @click="closeMobileMenu">About</a>
        <a href="#work" @click="closeMobileMenu">Work</a>
        <a href="#experience" @click="closeMobileMenu">Experience</a>
        <NuxtLink to="/blog/" @click="closeMobileMenu">Articles</NuxtLink>
        <a href="#contact" @click="closeMobileMenu">Contact</a>
      </nav>
    </div>

    <main>
      <section class="cinematic-hero" aria-labelledby="hero-title">
        <div class="hero-media" aria-hidden="true">
          <video
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            poster="/projects/h-denoise-utils/demo-poster-640w.webp"
          >
            <source src="/projects/h-denoise-utils/demo.mp4" type="video/mp4">
          </video>
          <div class="hero-media-grid"></div>
          <div class="hero-media-shade"></div>
        </div>

        <div class="hero-content cinematic-container">
          <div class="hero-copy">
            <p class="cinematic-eyebrow">
              <span class="status-dot" aria-hidden="true"></span>
              Pipeline TD · Cairo, Egypt
            </p>
            <h1 id="hero-title">
              Systems for artists.
              <em>Built for production.</em>
            </h1>
            <p class="hero-intro">
              I build pipeline tools across Houdini, USD, Maya and Unreal—turning fragile handoffs,
              publishing steps and render failures into workflows artists can trust.
            </p>
            <div class="hero-actions">
              <a class="cinematic-button cinematic-button-primary" href="#work">
                Explore selected work
                <span aria-hidden="true">↘</span>
              </a>
              <a class="cinematic-button cinematic-button-ghost" :href="links.resume" target="_blank" rel="noreferrer">
                View résumé
              </a>
            </div>
          </div>

          <div class="hero-meta" aria-label="Portfolio summary">
            <div>
              <span>Focus</span>
              <strong>USD · Publishing · Render handoff</strong>
            </div>
            <div>
              <span>Working across</span>
              <strong>Houdini · Maya · Unreal · Deadline</strong>
            </div>
            <div>
              <span>Current role</span>
              <strong>Pipeline Technical Director</strong>
            </div>
          </div>
        </div>

        <a class="hero-scroll" href="#about">
          <span>Scroll to enter</span>
          <span class="hero-scroll-line" aria-hidden="true"></span>
        </a>
      </section>

      <section id="about" class="cinematic-section about-section">
        <div class="cinematic-container about-layout">
          <div class="about-portrait-wrap">
            <div class="portrait-index">01 / Profile</div>
            <img :src="profileImage" alt="Ahmed Hindy" class="about-portrait">
            <div class="portrait-caption">
              <span>Pipeline TD</span>
              <span>VFX · Tools · USD</span>
            </div>
          </div>

          <div class="about-copy">
            <p class="cinematic-kicker">The technical bridge</p>
            <h2>I started on the artist side of the pipeline.</h2>
            <p class="about-lead">
              That means I understand the scenes behind the tickets: heavy caches, broken paths,
              missing versions, farm failures and USD composition problems that only appear under pressure.
            </p>
            <p>
              Today I design and maintain artist-facing tools for publishing, validation, render submission,
              asset handoff and production debugging. My goal is not to add another layer of process—it is to
              make the existing process clearer, faster and harder to break.
            </p>

            <dl class="about-stats">
              <div v-for="item in summary" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="work" class="cinematic-section work-section">
        <div class="cinematic-container">
          <div class="cinematic-section-heading">
            <div>
              <p class="cinematic-kicker">Selected work</p>
              <h2>Tools built around real production friction.</h2>
            </div>
            <p>
              Standalone utilities, DCC integrations and pipeline experiments designed to remove repetitive work
              without hiding what the pipeline is doing.
            </p>
          </div>

          <div class="featured-work-grid">
            <article
              v-for="(project, index) in featuredProjects"
              :key="project.title"
              class="featured-project"
              :class="{ 'featured-project-wide': index === 0 }"
            >
              <a
                class="featured-project-link"
                :href="project.href"
                target="_blank"
                rel="noreferrer"
                :aria-label="`Open ${project.title} on GitHub`"
              >
                <div class="featured-project-media">
                  <video
                    v-if="project.media?.video"
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="none"
                    :poster="project.media.video.poster"
                  >
                    <source :src="project.media.video.src" type="video/mp4">
                  </video>
                  <picture v-else-if="project.media?.image">
                    <source
                      v-for="source in project.media.image.webp.slice().reverse()"
                      :key="source.src"
                      :srcset="source.src"
                      type="image/webp"
                      :media="`(min-width: ${source.width}px)`"
                    >
                    <img
                      :src="project.media.image.src"
                      :alt="project.media.image.alt"
                      :width="project.media.image.width"
                      :height="project.media.image.height"
                      loading="lazy"
                      decoding="async"
                    >
                  </picture>
                  <div class="project-media-overlay"></div>
                  <span class="project-number">{{ String(index + 1).padStart(2, '0') }}</span>
                  <span class="project-open" aria-hidden="true">↗</span>
                </div>

                <div class="featured-project-copy">
                  <div>
                    <p class="project-type">Public tool</p>
                    <h3>{{ project.title }}</h3>
                  </div>
                  <p>{{ project.summary }}</p>
                  <ul class="project-tags" aria-label="Technologies">
                    <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
                  </ul>
                </div>
              </a>
            </article>
          </div>

          <div class="supporting-work">
            <div class="supporting-work-heading">
              <p class="cinematic-kicker">More experiments</p>
              <span>{{ supportingProjects.length }} repositories and side quests</span>
            </div>

            <a
              v-for="(project, index) in supportingProjects"
              :key="project.title"
              class="supporting-project-row"
              :href="project.href || '#work'"
              :target="project.href ? '_blank' : undefined"
              :rel="project.href ? 'noreferrer' : undefined"
            >
              <picture v-if="project.media?.image" hidden aria-hidden="true">
                <source
                  v-for="source in project.media.image.webp.slice().reverse()"
                  :key="source.src"
                  :srcset="source.src"
                  type="image/webp"
                  :media="`(min-width: ${source.width}px)`"
                >
                <img
                  :src="project.media.image.src"
                  alt=""
                  :width="project.media.image.width"
                  :height="project.media.image.height"
                  loading="lazy"
                  decoding="async"
                >
              </picture>
              <span class="supporting-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="supporting-title">{{ project.title }}</span>
              <span class="supporting-group">{{ project.group }}</span>
              <span class="supporting-summary">{{ project.summary }}</span>
              <span class="supporting-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section id="experience" class="cinematic-section experience-section">
        <div class="cinematic-container experience-layout">
          <div class="experience-intro">
            <p class="cinematic-kicker">Production history</p>
            <h2>Pipeline engineering grounded in shot work.</h2>
            <p>
              Five years in VFX, moving from Houdini FX into pipeline development while staying close to the
              artists and departments using the tools.
            </p>
            <a class="text-link" :href="links.linkedin" target="_blank" rel="noreferrer">
              Full history on LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ol class="experience-list">
            <li v-for="(item, index) in experience" :key="item.title">
              <span class="experience-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="experience-title">
                <h3>{{ item.title }}</h3>
                <p>{{ item.meta }}</p>
              </div>
              <p class="experience-details">{{ item.details }}</p>
            </li>
          </ol>
        </div>
      </section>

      <section class="cinematic-section articles-section">
        <div class="cinematic-container articles-panel">
          <div class="article-mark" aria-hidden="true">{ }</div>
          <div class="articles-copy">
            <p class="cinematic-kicker">Notes from the pipeline</p>
            <h2>Failures, experiments and tools worth documenting.</h2>
            <p>
              Technical write-ups about Houdini, USD, rendering, open-source tools and the production problems
              behind the code.
            </p>
          </div>
          <NuxtLink class="cinematic-button cinematic-button-primary" to="/blog/">
            Read the articles <span aria-hidden="true">↗</span>
          </NuxtLink>
        </div>
      </section>

      <section id="skills" class="cinematic-section skills-section">
        <div class="cinematic-container">
          <div class="cinematic-section-heading compact-heading">
            <div>
              <p class="cinematic-kicker">Working knowledge</p>
              <h2>A practical toolkit, not a logo wall.</h2>
            </div>
          </div>

          <div class="skills-grid">
            <article v-for="(group, index) in skillGroups" :key="group.title" class="skill-group">
              <header>
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <h3>{{ group.title }}</h3>
                <small>{{ group.count }} areas</small>
              </header>
              <ul>
                <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="cinematic-contact">
        <div class="cinematic-container contact-layout">
          <div>
            <p class="cinematic-kicker">Start a conversation</p>
            <h2>Building a pipeline, a tool, or a team?</h2>
          </div>
          <div class="contact-copy">
            <p>
              I am interested in Pipeline TD and VFX pipeline roles where I can stay close to production,
              solve practical problems and build tools artists actually want to use.
            </p>
            <a class="contact-email" :href="links.email">
              ahmed.hindy96@gmail.com
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="cinematic-footer">
      <div class="cinematic-container footer-layout">
        <p>Ahmed Hindy · Pipeline Technical Director</p>
        <nav aria-label="Social links">
          <a
            v-for="item in profileLinks"
            :key="item.label"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noreferrer' : undefined"
          >
            {{ item.label }}
          </a>
        </nav>
        <a href="#top" @click.prevent="scrollToTop">Back to top ↑</a>
      </div>
    </footer>
  </div>
</template>

<style src="./dawid-prototype.css"></style>
