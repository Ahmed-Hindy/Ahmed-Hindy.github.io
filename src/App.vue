<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'
import IconSprite from './components/IconSprite.vue'
import { useTheme } from './composables/useTheme'
import type { Project } from './data/portfolio'
import {
  experience,
  links,
  profileLinks,
  projectSections,
  summary,
} from './data/portfolio'
import profileImage from './assets/profile.jpg'
import { formatArticleDate } from '../app/utils/date'
import './fused-theme.css'

type BlogPreview = Pick<
  PageCollections['blog'],
  'path' | 'title' | 'description' | 'date' | 'tags' | 'status'
>

const { isDarkTheme, themeToggleLabel, toggleTheme } = useTheme()

const featuredProjects = projectSections[0]?.projects ?? []
const secondaryProjectSections = projectSections.slice(1)

const toolbenchGroups = [
  {
    label: 'Development',
    className: 'fusion-toolbench-build',
    tools: [
      {
        name: 'Python',
        note: 'pipeline tools · automation · validation',
        primary: true,
      },
      {
        name: 'Qt',
        note: 'artist tools · desktop interfaces',
        primary: true,
      },
    ],
  },
  {
    label: 'Pipeline systems',
    className: 'fusion-toolbench-pipeline',
    tools: [
      {
        name: 'OpenUSD',
        note: 'publishing · composition · scene validation',
      },
      {
        name: 'Deadline',
        note: 'render handoff · submission · farm debugging',
      },
    ],
  },
  {
    label: 'DCC integration',
    className: 'fusion-toolbench-dccs',
    tools: [
      {
        name: 'Houdini',
        note: 'Solaris · HDAs · PDG · FX support',
        primary: true,
      },
      {
        name: 'Maya',
        note: 'publishing · validation · scene support',
      },
      {
        name: 'Unreal',
        note: 'asset handoff · realtime workflows',
      },
      {
        name: 'Blender',
        note: 'add-ons · scene pipeline support',
      },
    ],
  },
]

const { data: articles } = await useAsyncData<BlogPreview[]>(
  'portfolio-latest-articles',
  async () => (await $fetch<BlogPreview[]>('/api/blog')).slice(0, 3),
)

const imageSrcset = (project: Project) =>
  project.media?.image?.webp.map((source) => `${source.src} ${source.width}w`).join(', ')

useHead({
  bodyAttrs: {
    class: 'fusion-body',
  },
})
</script>

<template>
  <IconSprite />

  <div class="fusion-site">
    <header class="fusion-nav-shell">
      <nav class="fusion-nav" aria-label="Primary navigation">
        <a class="fusion-brand" href="#overview" aria-label="Ahmed Hindy, home">
          <span class="fusion-brand-mark" aria-hidden="true">AH</span>
          <span>
            <strong>Ahmed Hindy</strong>
            <small>Pipeline TD</small>
          </span>
        </a>

        <div class="fusion-nav-links" aria-label="Page sections">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>

        <div class="fusion-nav-actions">
          <button
            class="fusion-theme-toggle"
            type="button"
            :aria-label="themeToggleLabel"
            :title="themeToggleLabel"
            @click="toggleTheme"
          >
            <span aria-hidden="true">{{ isDarkTheme ? '☀' : '☾' }}</span>
          </button>
          <NuxtLink class="fusion-nav-cta" to="/blog/">Blog</NuxtLink>
        </div>

        <details class="fusion-mobile-menu">
          <summary>Menu</summary>
          <div>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </details>
      </nav>
    </header>

    <main>
      <section id="overview" class="fusion-hero">
        <div class="fusion-hero-grid">
          <div class="fusion-hero-copy">
            <div class="fusion-hero-identity">
              <img :src="profileImage" alt="Ahmed Hindy" width="600" height="600" />
              <div>
                <p class="fusion-kicker">Ahmed Hindy</p>
                <p>Pipeline TD · Cairo, Egypt</p>
              </div>
            </div>
            <h1>Pipeline Technical Director</h1>
            <p class="fusion-hero-intro">
              I build Python tools and cross-DCC workflows for publishing, validation, render
              handoff, and production debugging.
            </p>

            <div class="fusion-hero-actions">
              <a class="fusion-button fusion-button-quiet" href="#work">View public tools</a>
              <NuxtLink class="fusion-button fusion-button-primary" to="/blog/">
                Browse the blog
              </NuxtLink>
            </div>

            <dl class="fusion-hero-facts" aria-label="Professional summary">
              <div>
                <dt>5+</dt>
                <dd>Years in VFX</dd>
              </div>
              <div>
                <dt>3+</dt>
                <dd>Years in pipeline</dd>
              </div>
            </dl>
          </div>

          <div class="fusion-hero-visual">
            <div class="fusion-hero-gridlines" aria-hidden="true"></div>
            <div class="fusion-hero-window">
              <div class="fusion-window-bar" aria-hidden="true">
                <span></span><span></span><span></span>
                <small>ahmed_toolbench / working_stack</small>
              </div>

              <div class="fusion-toolbench" aria-label="Ahmed Hindy's working toolbench">
                <section
                  v-for="(group, groupIndex) in toolbenchGroups"
                  :key="group.label"
                  class="fusion-toolbench-group"
                  :class="group.className"
                >
                  <header>
                    <span>{{ group.label }}</span>
                    <small>{{ String(groupIndex + 1).padStart(2, '0') }}</small>
                  </header>
                  <div class="fusion-toolbench-tools">
                    <article
                      v-for="tool in group.tools"
                      :key="tool.name"
                      class="fusion-toolbench-tool"
                      :class="{ 'fusion-toolbench-tool-primary': tool.primary }"
                    >
                      <strong>{{ tool.name }}</strong>
                      <small>{{ tool.note }}</small>
                    </article>
                  </div>
                </section>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section class="fusion-section fusion-about" aria-labelledby="about-title">
        <div class="fusion-about-grid">
          <div class="fusion-about-heading">
            <p class="fusion-kicker">Overview</p>
            <h2 id="about-title">From Houdini FX to pipeline development.</h2>
          </div>

          <div class="fusion-about-copy">
            <p class="fusion-lede">
              I started in Houdini FX, so I know the artist side of the problems I now solve:
              heavy scenes, broken caches, bad paths, failed farm jobs, missing versions, and USD
              composition issues.
            </p>
            <p>
              Outside production, I like tinkering with C++ game mods, basic Rust, Docker homelab
              setups, local LLMs, and Vue JS projects.
            </p>
          </div>
        </div>

        <dl class="fusion-summary-grid">
          <div v-for="item in summary" :key="item.label">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </section>

      <section id="work" class="fusion-section fusion-work" aria-labelledby="work-title">
        <header class="fusion-section-heading">
          <div>
            <p class="fusion-kicker">Public tools</p>
            <h2 id="work-title">Production tools, experiments, and side quests.</h2>
          </div>
          <p>A selection of public projects, with the rest grouped below.</p>
        </header>

        <div class="fusion-featured-projects">
          <article
            v-for="(project, index) in featuredProjects"
            :key="project.title"
            class="fusion-project"
          >
            <div class="fusion-project-media">
              <video
                v-if="project.media?.video"
                :poster="project.media.video.poster"
                :aria-label="`${project.title} demonstration`"
                controls
                muted
                playsinline
                preload="metadata"
              >
                <source :src="project.media.video.src" type="video/mp4" />
              </video>
              <picture v-else-if="project.media?.image">
                <source
                  v-if="imageSrcset(project)"
                  type="image/webp"
                  :srcset="imageSrcset(project)"
                  sizes="(max-width: 900px) 92vw, 58vw"
                />
                <img
                  :src="project.media.image.src"
                  :alt="project.media.image.alt"
                  :width="project.media.image.width"
                  :height="project.media.image.height"
                  loading="lazy"
                />
              </picture>
              <span class="fusion-project-index" aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <div class="fusion-project-copy">
              <p class="fusion-project-type">Featured tool</p>
              <h3>{{ project.title }}</h3>
              <p>{{ project.summary }}</p>
              <ul class="fusion-tech-list" :aria-label="`${project.title} technologies`">
                <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
              </ul>
              <a
                v-if="project.href"
                class="fusion-text-link"
                :href="project.href"
                target="_blank"
                rel="noreferrer"
              >
                View repository <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="experience" class="fusion-section fusion-experience" aria-labelledby="experience-title">
        <header class="fusion-section-heading fusion-section-heading-compact">
          <div>
            <p class="fusion-kicker">Experience</p>
            <h2 id="experience-title">Pipeline work grounded in real production problems.</h2>
          </div>
        </header>

        <ol class="fusion-timeline">
          <li v-for="(item, index) in experience" :key="item.title">
            <div class="fusion-timeline-marker" aria-hidden="true">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <div class="fusion-timeline-meta">{{ item.meta }}</div>
            <div class="fusion-timeline-copy">
              <h3>{{ item.title }}</h3>
              <p>{{ item.details }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="fusion-section fusion-directory" aria-labelledby="directory-title">
        <header class="fusion-section-heading">
          <div>
            <p class="fusion-kicker">More tools</p>
            <h2 id="directory-title">Pipeline, USD, infrastructure, and side projects.</h2>
          </div>
          <p>Smaller projects grouped by area.</p>
        </header>

        <div class="fusion-directory-groups">
          <section v-for="section in secondaryProjectSections" :key="section.title">
            <h3>{{ section.title }}</h3>
            <div class="fusion-directory-list">
              <article v-for="project in section.projects" :key="project.title">
                <div>
                  <h4>{{ project.title }}</h4>
                  <p>{{ project.summary }}</p>
                  <small>{{ project.tags.join(' · ') }}</small>
                </div>
                <a
                  v-if="project.href"
                  :href="project.href"
                  target="_blank"
                  rel="noreferrer"
                  :aria-label="`View ${project.title} repository`"
                >
                  ↗
                </a>
              </article>
            </div>
          </section>
        </div>
      </section>

      <section class="fusion-section fusion-articles" aria-labelledby="articles-title">
        <header class="fusion-section-heading">
          <div>
            <p class="fusion-kicker">Blog</p>
            <h2 id="articles-title">Notes from the pipeline.</h2>
          </div>
          <NuxtLink class="fusion-text-link" to="/blog/">
            Browse all articles <span aria-hidden="true">→</span>
          </NuxtLink>
        </header>

        <div v-if="articles?.length" class="fusion-article-grid">
          <NuxtLink
            v-for="(article, index) in articles"
            :key="article.path"
            :to="article.path"
            class="fusion-article-card"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <small>{{ formatArticleDate(article.date) }}</small>
            <h3>{{ article.title }}</h3>
            <p>{{ article.description }}</p>
            <div>
              <span v-for="tag in article.tags?.slice(0, 3)" :key="tag">{{ tag }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section id="contact" class="fusion-contact" aria-labelledby="contact-title">
        <div>
          <p class="fusion-kicker">Contact</p>
          <h2 id="contact-title">Get in touch.</h2>
          <p>I am open to Pipeline TD and VFX Pipeline Developer opportunities.</p>
        </div>

        <div class="fusion-contact-actions">
          <a class="fusion-button fusion-button-primary" :href="links.email">Send an email</a>
          <a
            class="fusion-button fusion-button-quiet"
            :href="links.resume"
            target="_blank"
            rel="noreferrer"
          >
            View résumé
          </a>
        </div>

        <div class="fusion-social-links" aria-label="Profile links">
          <a
            v-for="link in profileLinks"
            :key="link.label"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noreferrer' : undefined"
          >
            <svg aria-hidden="true"><use :href="`#icon-${link.icon}`" /></svg>
            {{ link.label }}
          </a>
        </div>
      </section>
    </main>

    <footer class="fusion-footer">
      <p>Ahmed Hindy</p>
      <a href="#overview">Back to top ↑</a>
    </footer>
  </div>
</template>
