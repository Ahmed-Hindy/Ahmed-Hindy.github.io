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
import {
  experience,
  focusChips,
  navItems,
  profileLinks,
  projectSections,
  skills,
  summary,
} from './data/portfolio'
import profileImage from './assets/profile.jpg'
import profileImageWebp from './assets/profile.webp'

const { isDarkTheme, themeToggleLabel, toggleTheme } = useTheme()
</script>

<template>
  <IconSprite />

  <div class="site-shell">
    <ProfileSidebar
      :focus-chips="focusChips"
      :is-dark-theme="isDarkTheme"
      :nav-items="navItems"
      :profile-image="profileImage"
      :profile-image-webp="profileImageWebp"
      :profile-links="profileLinks"
      :theme-toggle-label="themeToggleLabel"
      @toggle-theme="toggleTheme"
    />

    <main class="content">
      <MobileIntro
        :focus-chips="focusChips"
        :is-dark-theme="isDarkTheme"
        :profile-image="profileImage"
        :profile-image-webp="profileImageWebp"
        :profile-links="profileLinks"
        :theme-toggle-label="themeToggleLabel"
        @toggle-theme="toggleTheme"
      />

      <section class="section" id="overview">
        <p class="section-kicker">Overview</p>
        <h2>Pipeline Technical Director for Houdini, USD, Maya and UE5</h2>
        <p class="intro">
          I am a Pipeline Technical Director based in Cairo, Egypt. I build tools and workflows that sit between
          artists and pipeline engineering: publishing, render handoff, validation, farm debugging,
          and cross-DCC support.
        </p>
        <p class="credibility-line">
          5+ years of VFX experience and 3+ years focused on pipeline work.
        </p>
        <p class="intro">
          I started in Houdini FX, so I know the artist side of the problems I now solve: heavy scenes,
          broken caches, bad paths, failed farm jobs, missing versions, and USD composition issues.
          Outside production, I like tinkering with C++ game mods, basic Rust, Docker homelab setups,
          local LLMs, and Vue JS projects.
        </p>

        <SummaryGrid :items="summary" />
      </section>

      <section class="section" id="experience">
        <div class="section-header">
          <div>
            <p class="section-kicker">Experience</p>
            <h2>Pipeline work grounded in real production problems.</h2>
          </div>
        </div>

        <ExperienceTimeline :items="experience" />
      </section>

      <section class="section" id="work">
        <div class="section-header">
          <div>
            <p class="section-kicker">Public Tools</p>
            <h2>Production tools, experiments, and side quests.</h2>
          </div>
        </div>
        <ProjectGrid :sections="projectSections" />
      </section>

      <section class="section" id="skills">
        <p class="section-kicker">Skills</p>
        <h2>Tools and workflows I use in production.</h2>
        <p class="intro">
          My strongest area is Python pipeline development for DCC tools, USD workflows,
          validation, farm support, and artist-facing interfaces.
        </p>
        <SkillCloud :skills="skills" />
      </section>

      <ContactSection :profile-links="profileLinks" />
    </main>
  </div>
</template>
