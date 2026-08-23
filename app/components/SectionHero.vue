<script setup lang="ts">
import { profile } from '~/data/portfolio'

// 인트로 시퀀스 (단계 정의는 useIntro.ts 참고)
// 이 컴포넌트가 시퀀스의 소유자다 — 타이머는 여기서만 돈다.
useIntroSequence()
const { step } = useIntro()
</script>

<template>
  <section
    id="top"
    class="relative flex min-h-dvh items-center justify-center px-6"
  >
    <!-- 박자 1~2: 인사말. 화면 중앙에 홀로 떴다가 통째로 사라진다.
         본문과 겹쳐 두기 위해 오버레이로 분리 (레이아웃에 관여하지 않음) -->
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <p
        class="text-xl text-accent transition-all duration-700 ease-out-expo sm:text-2xl md:text-[1.75rem]"
        :class="
          step < 1 ? 'translate-y-3 opacity-0'
          : step < 2 ? 'opacity-100'
          : '-translate-y-3 opacity-0'
        "
      >
        {{ profile.greeting }}
      </p>
    </div>

    <!-- 박자 3~4: 최종 히어로. 소개 문장이 먼저 제자리에 뜨고,
         이름은 연출 종료 박자(step 4 = done)에 떠서 헤더/사이드 룰과 등장이 맞는다.
         data-intro-target 은 연출이 재생될 때의 첫 페인트 숨김용 (main.css 참고) -->
    <div class="text-center">
      <p
        data-intro-target
        class="text-xl text-accent transition-all duration-700 ease-out-expo sm:text-2xl md:text-[1.75rem]"
        :class="step >= 3 ? 'opacity-100' : 'translate-y-3 opacity-0'"
      >
        {{ profile.tagline }}
      </p>
      <!-- 이름 강조: 이름은 크고 진하게, "입니다"는 작고 옅게 낮춰 대비를 만든다 -->
      <h1
        data-intro-target
        class="mt-1 text-5xl font-extrabold tracking-tight transition-all duration-700 ease-out-expo sm:text-6xl md:text-[5rem] md:leading-[1.15]"
        :class="step >= 4 ? 'opacity-100' : 'translate-y-3 opacity-0'"
      >
        <span class="text-accent">{{ profile.name }}</span><span
          class="text-[0.5em] font-bold text-content-muted"
        >입니다</span>
      </h1>
    </div>

    <!-- 스크롤 유도. 히어로가 뷰포트를 꽉 채우므로 아래에 무엇이 더 있다는
         신호가 없으면 여기서 멈추는 사람이 생긴다.
         섹션 안의 absolute 라 스크롤하면 자연히 함께 밀려 올라간다. -->
    <div
      data-intro-target
      class="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-700"
      :class="step >= 4 ? 'opacity-100' : 'opacity-0'"
      aria-hidden="true"
    >
      <span class="font-mono text-[0.625rem] tracking-[0.2em] text-content-subtle">
        SCROLL
      </span>
      <svg
        viewBox="0 0 24 24"
        class="size-4 animate-bounce text-accent/60 motion-reduce:animate-none"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
      >
        <path d="M12 5v14M6 13l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </section>
</template>
