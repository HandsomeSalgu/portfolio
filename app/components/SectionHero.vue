<script setup lang="ts">
import { profile } from '~/data/portfolio'
</script>

<template>
  <section
    id="top"
    class="relative flex min-h-dvh items-center justify-center px-6"
  >
    <!-- 좌측 세로 룰은 페이지 전체에 고정돼야 해서 레이아웃의 SideRule 로 옮겼다 -->
    <div class="text-center">
      <p class="text-xl text-accent sm:text-2xl md:text-[1.75rem]">
        {{ profile.tagline }}
      </p>
      <h1
        class="mt-1 text-5xl font-extrabold tracking-tight text-accent sm:text-6xl md:text-[5rem] md:leading-[1.15]"
      >
        {{ profile.name }}입니다
      </h1>
    </div>
  </section>
</template>
