<script setup lang="ts">
const { progress } = useScrollProgress()
// 인트로 연출이 끝난 뒤에 나타난다
const { done: introDone } = useIntro()

// 맨 위에서 1(꽉 참), 맨 아래에서 0(사라짐)
const scale = computed(() => 1 - progress.value)
</script>

<template>
  <!-- 데스크톱: 왼쪽 세로 게이지.
       바깥은 위치와 세로 중앙 정렬만 담당. 안쪽 transform 과 섞이지 않게 분리해둔다 -->
  <span
    data-intro-target
    class="pointer-events-none fixed left-5 top-1/2 hidden h-[62%] w-px -translate-y-1/2 transition-opacity duration-700 md:block"
    :class="introDone ? 'opacity-100' : 'opacity-0'"
    aria-hidden="true"
  >
    <!-- origin-bottom 이라 위쪽부터 깎여 내려간다 (게이지가 줄어드는 방향) -->
    <span
      class="block size-full origin-bottom bg-accent"
      :style="{ transform: `scaleY(${scale})` }"
    />
  </span>

  <!-- 모바일: 세로 게이지를 놓을 자리가 없어서 상단 진행 바로 대체한다.
       왼쪽에서 차오르는 방향이라 데스크톱과 반대로 progress 를 그대로 쓴다.
       헤더(z-50) 위에 얹혀야 보이므로 z-[60]. -->
  <span
    data-intro-target
    class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 transition-opacity duration-700 md:hidden"
    :class="introDone ? 'opacity-100' : 'opacity-0'"
    aria-hidden="true"
  >
    <span
      class="block size-full origin-left bg-accent"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </span>
</template>
