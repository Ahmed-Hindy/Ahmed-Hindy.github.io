<script setup lang="ts">
import ContactSection from './components/ContactSection.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import IconSprite from './components/IconSprite.vue'
import MobileIntro from './components/MobileIntro.vue'
import ProfileSidebar from './components/ProfileSidebar.vue'
import ProjectGrid from './components/ProjectGrid.vue'
import SkillCloud from './components/SkillCloud.vue'
import SummaryGrid from './components/SummaryGrid.vue'
import { useTheme } from './composables/useTheme'
import BlogSiteFooter from '../app/components/blog/SiteFooter.vue'
import {
  experience,
  navItems,
  profileLinks,
  projectSections,
  skills,
  summary,
} from './data/portfolio'

const featuredProjectSections = projectSections.slice(0, 1)
const secondaryProjectSections = projectSections.slice(1)

const { isDarkTheme, themeToggleLabel, toggleTheme } = useTheme()
</script>

<template>
  <IconSprite />

  <div class="site-shell">
    <ProfileSidebar
      :is-dark-theme="isDarkTheme"
      :nav-items="navItems"
      :profile-links="profileLinks"
      :theme-toggle-label="themeToggleLabel"
      @toggle-theme="toggleTheme"
    />

    <div class="portfolio-main">
      <main class="content">
        <MobileIntro
          :is-dark-theme="isDarkTheme"
          :nav-items="navItems"
          :profile-links="profileLinks"
          :theme-toggle-label="themeToggleLabel"
          @toggle-theme="toggleTheme"
        />

      <section class="section" id="overview" aria-labelledby="overview-title">
        <p class="section-kicker">Overview</p>
        <h2 id="overview-title">Pipeline Technical Director</h2>
        <p class="intro">
          I build pipelines and cross-DCC workflows for publishing, validation, render and compositing.
        </p>
        <p class="credibility-line">
          5+ years of VFX experience and 3+ years focused on pipeline work.
        </p>
        <p class="intro">
          I started in Houdini FX before moving into pipeline development. That background gives me
          practical experience with heavy scenes, caches, render failures, bad paths, missing versions,
          and asset handoff problems.
        </p>

        <SummaryGrid :items="summary" />
      </section>

      <section class="section" id="work" aria-labelledby="work-title">
        <div class="section-header">
          <div>
            <p class="section-kicker">Public Tools</p>
            <h2 id="work-title">Selected projects.</h2>
          </div>
        </div>
        <ProjectGrid :sections="featuredProjectSections" />
      </section>

      <section class="section" id="experience" aria-labelledby="experience-title">
        <div class="section-header">
          <div>
            <p class="section-kicker">Experience</p>
            <h2 id="experience-title">Pipeline work grounded in real production problems.</h2>
          </div>
        </div>

        <ExperienceTimeline :items="experience" />
      </section>

      <section class="section" aria-labelledby="more-tools-title">
        <div class="section-header">
          <div>
            <p class="section-kicker">More Tools</p>
            <h2 id="more-tools-title">Pipeline utilities, infrastructure, and side projects.</h2>
          </div>
        </div>
        <ProjectGrid :sections="secondaryProjectSections" />
      </section>

      <section class="section" id="skills" aria-labelledby="skills-title">
        <p class="section-kicker">Skills</p>
        <h2 id="skills-title">Tools and workflows I use in production.</h2>
        <SkillCloud :skills="skills" />
      </section>

      <ContactSection :profile-links="profileLinks" />

      <aside class="blog-callout blog-callout-bottom" aria-label="Blog">
        <div>
          <p class="section-kicker">Notes from the pipeline</p>
          <p>Practical write-ups on my Pipeline journey...</p>
        </div>
        <NuxtLink class="blog-callout-link" to="/blog/">
          Browse the Blog <span aria-hidden="true">→</span>
        </NuxtLink>
      </aside>
      </main>
      <BlogSiteFooter />
    </div>
  </div>
</template>
