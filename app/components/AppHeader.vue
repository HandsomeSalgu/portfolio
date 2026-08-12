<script setup lang="ts">
import type { Component } from 'vue'
import { IconGithub, IconNotion } from '#components'
import { navItems, socialLinks } from '~/data/portfolio'

const { active } = useScrollSpy(navItems.map((item) => item.id))
const { resolved, toggle } = useTheme()
// 인트로 연출이 끝난 뒤에 나타난다
const { done: introDone } = useIntro()

const icons: Record<string, Component> = {
  github: IconGithub,
  notion: IconNotion,
}

// 시안에 모바일 화면이 없어서, 좁은 폭에서는 표준적인 토글 메뉴로 대체해뒀다.
const menuOpen = ref(false)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 backdrop-blur-xs transition-opacity duration-700"
    :class="introDone ? 'opacity-100' : 'pointer-events-none opacity-0'"
  >
    <div class="relative flex h-header items-center px-6 lg:px-8">
      <!-- 로고: 맨 위로 -->
      <a
        href="#top"
        class="text-2xl font-extrabold tracking-tighter text-accent"
        aria-label="맨 위로"
      >TH</a>

      <!-- 라우팅이 아니라 같은 페이지 앵커 이동이므로 NuxtLink 가 아닌 <a> 를 쓴다.
           부드러운 이동은 html 의 scroll-behavior, 헤더 가림 방지는
           각 섹션의 scroll-mt-header 가 처리한다. JS 스크롤 계산이 필요 없다. -->
      <nav
        class="absolute left-1/2 hidden -translate-x-1/2 md:block"
        aria-label="주요 섹션"
      >
        <ul class="flex items-center gap-10 lg:gap-[4.5rem]">
          <li v-for="item in navItems" :key="item.id">
            <!-- 밑줄: ::after 를 scaleX 0→1 로 키운다. origin-left 라 왼쪽에서 오른쪽으로 자란다.
                 호버 시 그어지고, 현재 보고 있는 섹션(active)에는 계속 남는다. -->
            <a
              :href="`#${item.id}`"
              class="relative text-[0.9375rem] text-accent after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100"
              :class="active === item.id ? 'font-semibold after:scale-x-100' : 'font-normal after:scale-x-0'"
              :aria-current="active === item.id ? 'true' : undefined"
            >{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="ml-auto flex items-center gap-4">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center gap-0.5 text-content transition-opacity hover:opacity-60"
        >
          <component :is="icons[link.icon]" class="size-7" />
          <span class="text-[0.5rem] leading-none">{{ link.label }}</span>
        </a>

        <button
          type="button"
          class="ml-1 p-1 text-accent transition-opacity hover:opacity-60"
          :aria-label="resolved === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'"
          @click="toggle"
        >
          <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.75">
            <template v-if="resolved === 'dark'">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" stroke-linecap="round" />
            </template>
            <path v-else d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" stroke-linejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          class="-mr-1 p-1 text-accent md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          aria-label="메뉴 열기"
          @click="menuOpen = !menuOpen"
        >
          <svg viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="1.75">
            <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
            <path v-else d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <nav
      v-show="menuOpen"
      id="mobile-nav"
      class="border-t border-line bg-surface/90 backdrop-blur-sm md:hidden"
      aria-label="주요 섹션"
    >
      <ul class="flex flex-col px-6 py-2">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="block py-3 text-accent"
            :class="active === item.id ? 'font-semibold' : 'font-normal'"
            @click="menuOpen = false"
          >{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
