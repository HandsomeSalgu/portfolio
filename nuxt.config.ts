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

// 인트로를 "재생할지" 를 페인트 전에 확정한다.
//
// 서버 렌더 결과는 항상 '연출 완료' 상태다 (JS 가 없거나 하이드레이션이 실패해도
// 페이지가 백지가 되지 않게 하려는 것). 그래서 연출을 재생해야 하는 경우에만
// 여기서 html[data-intro="play"] 를 붙여, main.css 의 규칙이 첫 페인트부터
// 연출 대상들을 숨기게 한다. 연출이 끝나면 useIntro.ts 가 이 속성을 지운다.
//
// 건너뛰는 조건:
//   · #projects 같은 앵커로 들어온 경우 — 연출이 스크롤을 맨 위로 되돌려버린다
//   · 이번 세션에 이미 본 경우 — 매 새로고침마다 2.6초를 기다릴 이유가 없다
//   · 모션 최소화를 켠 경우
// 키 이름은 app/composables/useIntro.ts 의 INTRO_SESSION_KEY 와 동일해야 한다.
const introInitScript = `
(function () {
  try {
    if (location.hash) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (sessionStorage.getItem('portfolio-intro-seen')) return
    sessionStorage.setItem('portfolio-intro-seen', '1')
    document.documentElement.dataset.intro = 'play'
    // 안전장치: 하이드레이션이 실패하면 이 속성을 지워줄 사람이 없어서
    // 숨김 규칙이 영구히 남는다. 연출은 2.6초에 끝나므로 5초면 충분히 여유롭고,
    // 정상 재생 중이라면 Vue 쪽 opacity-0 이 계속 화면을 붙잡고 있으므로
    // 이 타이머가 먼저 지워도 연출이 깨지지 않는다.
    setTimeout(function () { delete document.documentElement.dataset.intro }, 5000)
  } catch (e) {}
})()
`.trim()

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    // Vercel 배포라 루트 경로다. 서브 경로(예: GitHub Pages 의 /portfolio/)로
    // 옮긴다면 여기만 바꾸면 된다 — public/ 자산 경로는 모두
    // useRuntimeConfig().app.baseURL 을 거치도록 해뒀다.
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
      script: [
        { innerHTML: themeInitScript, tagPosition: 'head' },
        { innerHTML: introInitScript, tagPosition: 'head' },
      ],
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
