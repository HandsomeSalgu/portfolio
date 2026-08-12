<script setup lang="ts">
import { profile } from '~/data/portfolio'

// 정적 생성 시점에 박히는 값이라 매년 갱신되지 않는다. 재빌드하면 맞춰진다.
const year = new Date().getFullYear()
</script>

<template>
  <footer class="px-6 pb-12 lg:px-8">
    <div
      class="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 border-t border-accent/25 pt-8"
    >
      <p class="font-mono text-xs tracking-wider text-content-subtle">
        © {{ year }} {{ profile.name }}
      </p>
      <a
        href="#top"
        class="font-mono text-xs tracking-wider text-content-subtle hover:text-accent"
      >BACK TO TOP ↑</a>
    </div>
  </footer>
</template>
