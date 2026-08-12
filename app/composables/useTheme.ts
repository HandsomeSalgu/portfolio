export type ThemePreference = 'light' | 'dark' | 'system'

/** nuxt.config.ts 의 FOUC 방지 인라인 스크립트와 반드시 동일해야 하는 키 */
export const THEME_STORAGE_KEY = 'portfolio-theme'

function systemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  // SSR 시점엔 사용자의 선택을 알 수 없으므로 'system' 으로 두고,
  // 실제 클래스 적용은 head 의 인라인 스크립트가 페인트 전에 끝낸다.
  const preference = useState<ThemePreference>('theme-preference', () => 'system')
  const resolved = useState<'light' | 'dark'>('theme-resolved', () => 'light')

  function apply(pref: ThemePreference) {
    const isDark = pref === 'dark' || (pref === 'system' && systemPrefersDark())
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    resolved.value = isDark ? 'dark' : 'light'
  }

  function set(pref: ThemePreference) {
    preference.value = pref
    if (pref === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
    else localStorage.setItem(THEME_STORAGE_KEY, pref)
    apply(pref)
  }

  function toggle() {
    set(resolved.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    preference.value = stored === 'light' || stored === 'dark' ? stored : 'system'
    apply(preference.value)

    // 'system' 을 고른 사용자는 OS 설정 변경을 실시간으로 따라가야 한다
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (preference.value === 'system') apply('system')
    }
    media.addEventListener('change', onChange)
    onScopeDispose(() => media.removeEventListener('change', onChange))
  })

  return { preference, resolved, set, toggle }
}
