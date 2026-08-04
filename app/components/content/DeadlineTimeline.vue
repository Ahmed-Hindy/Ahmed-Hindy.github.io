<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type TimelineEvent = {
  date: string
  href: string
  label: string
  track?: 'cloud'
}

const events: TimelineEvent[] = [
  { date: '2001', label: 'Frantic R&D', href: '#from-frantic-films-to-thinkbox' },
  { date: '2010', label: 'Thinkbox', href: '#from-frantic-films-to-thinkbox' },
  { date: '2017', label: 'AWS acquisition', href: '#aws-buying-the-farm' },
  { date: '2022', label: 'Free', href: '#then-the-pace-changed' },
  { date: '2024', label: 'Cloud', href: '#deadline-cloud-rose-in-a-different-body', track: 'cloud' },
  { date: '2025', label: 'Maintenance', href: '#deadline-10-on-life-support' },
]

const anchor = ref<HTMLElement>()
const hasEntered = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hasEntered.value = true
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return

    hasEntered.value = true
    observer?.disconnect()
  }, { threshold: 0.35 })

  if (anchor.value) observer.observe(anchor.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="anchor" class="deadline-timeline-anchor">
    <nav
      class="deadline-timeline"
      :class="{ 'has-entered': hasEntered }"
      aria-label="Deadline history"
    >
      <p>Deadline</p>
      <ol>
        <li
          v-for="event in events"
          :key="event.date"
          :class="event.track && `is-${event.track}`"
        >
          <a :href="event.href">
            <time>{{ event.date }}</time>
            <span>{{ event.label }}</span>
          </a>
        </li>
      </ol>
    </nav>
  </div>
</template>

<style scoped>
.deadline-timeline-anchor {
  position: relative;
  height: 1px;
}

.deadline-timeline {
  --deadline-line: color-mix(in srgb, var(--blog-mist) 44%, transparent);
  --deadline-blue: #87acd1;
  --deadline-cloud: #e4a83f;
  display: none;
}

.deadline-timeline > p {
  margin: 0;
  color: var(--blog-mist);
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.deadline-timeline ol {
  position: relative;
  display: grid;
  height: 100%;
  align-content: space-between;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.deadline-timeline ol::before {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: -12px;
  width: 1px;
  background: var(--deadline-line);
  content: '';
  transform: scaleY(1);
  transform-origin: top;
}

.deadline-timeline.has-entered ol::before {
  animation: deadline-line-draw 1000ms cubic-bezier(0.2, 0.75, 0.3, 1) both;
}

.deadline-timeline li {
  position: relative;
  list-style: none !important;
}

.deadline-timeline li::before {
  position: absolute;
  top: 4px;
  left: -15px;
  width: 5px;
  height: 5px;
  border: 1px solid var(--deadline-blue);
  border-radius: 999px;
  background: var(--blog-deep);
  content: '';
}

.deadline-timeline li.is-cloud::before {
  border-color: var(--deadline-cloud);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--deadline-cloud) 13%, transparent);
}

.deadline-timeline li.is-cloud::after {
  position: absolute;
  top: 6px;
  left: -9px;
  width: 12px;
  border-top: 1px solid var(--deadline-cloud);
  content: '';
  transform: skewY(-24deg);
  transform-origin: left;
}

.deadline-timeline.has-entered li {
  animation: deadline-event-reveal 360ms cubic-bezier(0.2, 0.75, 0.3, 1) both;
}

.deadline-timeline.has-entered li:nth-child(1) { animation-delay: 100ms; }
.deadline-timeline.has-entered li:nth-child(2) { animation-delay: 220ms; }
.deadline-timeline.has-entered li:nth-child(3) { animation-delay: 340ms; }
.deadline-timeline.has-entered li:nth-child(4) { animation-delay: 460ms; }
.deadline-timeline.has-entered li:nth-child(5) { animation-delay: 580ms; }
.deadline-timeline.has-entered li:nth-child(6) { animation-delay: 700ms; }

.deadline-timeline a {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 6px;
  color: var(--blog-ink);
  font-size: 0.69rem;
  font-weight: 650;
  line-height: 1.3;
  text-decoration: none;
}

.deadline-timeline time {
  color: var(--deadline-blue);
  font-size: 0.66rem;
  font-weight: 850;
}

.deadline-timeline li.is-cloud time {
  color: var(--deadline-cloud);
}

.deadline-timeline a:hover span,
.deadline-timeline a:focus-visible span {
  color: var(--blog-signal);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.deadline-timeline a:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 4px;
}

@keyframes deadline-line-draw {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

@keyframes deadline-event-reveal {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 1350px) {
  .deadline-timeline {
    position: absolute;
    top: 0;
    left: calc(100% + 28px);
    display: grid;
    grid-template-rows: auto 1fr;
    width: 152px;
    height: 720px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .deadline-timeline *,
  .deadline-timeline *::before,
  .deadline-timeline *::after {
    animation-duration: 0.01ms !important;
  }
}
</style>
