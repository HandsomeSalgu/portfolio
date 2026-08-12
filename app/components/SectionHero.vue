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
         이름은 연출 종료 박자(step 4 = done)에 떠서 헤더/사이드 룰과 등장이 맞는다. -->
    <div class="text-center">
      <p
        class="text-xl text-accent transition-all duration-700 ease-out-expo sm:text-2xl md:text-[1.75rem]"
        :class="step >= 3 ? 'opacity-100' : 'translate-y-3 opacity-0'"
      >
        {{ profile.tagline }}
      </p>
      <!-- 이름 강조: 이름은 크고 진하게, "입니다"는 작고 옅게 낮춰 대비를 만든다 -->
      <h1
        class="mt-1 text-5xl font-extrabold tracking-tight transition-all duration-700 ease-out-expo sm:text-6xl md:text-[5rem] md:leading-[1.15]"
        :class="step >= 4 ? 'opacity-100' : 'translate-y-3 opacity-0'"
      >
        <span class="text-accent">{{ profile.name }}</span><span
          class="text-[0.5em] font-bold text-content-muted"
        >입니다</span>
      </h1>
    </div>
  </section>
</template>
