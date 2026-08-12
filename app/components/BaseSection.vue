<script setup lang="ts">
defineProps<{
  /** 내비게이션 앵커 대상. data/portfolio.ts 의 navItems 와 일치해야 한다 */
  id: string
  title: string
  /** "01" 같은 섹션 번호 */
  index: string
}>()
</script>

<template>
  <!-- scroll-mt-header: 앵커로 이동했을 때 고정 헤더가 제목을 가리지 않게 띄운다 -->
  <section
    :id="id"
    class="scroll-mt-header px-6 lg:px-8"
    :aria-labelledby="`${id}-heading`"
  >
    <div class="mx-auto max-w-content border-t border-accent/25 py-16 md:py-24">
      <div class="grid gap-10 md:grid-cols-[12rem_1fr] md:gap-8">
        <!-- 제목은 스크롤 중에도 붙어 있어서 지금 어느 섹션인지 계속 보이게 한다 -->
        <div class="md:sticky md:top-[calc(var(--spacing-header)+3rem)] md:self-start">
          <p class="font-mono text-xs tracking-widest text-accent/50">
            {{ index }}
          </p>
          <h2
            :id="`${id}-heading`"
            class="mt-2 text-3xl font-extrabold tracking-tight text-accent sm:text-4xl"
          >
            {{ title }}
          </h2>
        </div>

        <div class="min-w-0">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
