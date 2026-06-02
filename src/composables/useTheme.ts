import { computed, ref } from 'vue'

export type Theme = 'light' | 'dark'

const themeStorageKey = 'theme'

const canUseDOM = () => typeof window !== 'undefined' && typeof document !== 'undefined'

const getSystemTheme = (): Theme => {
  if (!canUseDOM() || typeof window.matchMedia !== 'function') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getStoredTheme = (): Theme | null => {
  if (!canUseDOM()) {
    return null
  }

  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey)
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null
  } catch {
    return null
  }
}

const storeTheme = (nextTheme: Theme) => {
  if (!canUseDOM()) {
    return
  }

  try {
    window.localStorage.setItem(themeStorageKey, nextTheme)
  } catch {
    // Ignore storage failures; the toggle still works for the current page view.
  }
}

const applyTheme = (nextTheme: Theme) => {
  if (!canUseDOM()) {
    return
  }

  document.documentElement.dataset.theme = nextTheme
}

const getInitialTheme = (): Theme => getStoredTheme() ?? getSystemTheme()

export const useTheme = () => {
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

  return {
    isDarkTheme,
    themeToggleLabel,
    toggleTheme,
  }
}
