import tailwindcss from '@tailwindcss/vite'

// 페인트 전에 .dark 클래스를 확정지어 다크모드 깜빡임(FOUC)을 막는다.
// 키 이름은 app/composables/useTheme.ts 의 THEME_STORAGE_KEY 와 동일해야 한다.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('portfolio-theme')
    var isDark = stored === 'dark' || (!stored && matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  } catch (e) {}
})()
`.trim()

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    // GitHub Pages(HandsomeSalgu/portfolio)로 배포한다면 '/portfolio/' 로 바꿔야 한다.
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'ko' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
        },
      ],
      script: [{ innerHTML: themeInitScript, tagPosition: 'head' }],
    },
  },

  // 정적 사이트로 뽑는다 (npm run generate → .output/public)
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/404.html'],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
