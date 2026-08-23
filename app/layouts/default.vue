<script setup lang="ts">
// public/ 자산을 인라인 스타일에서 참조할 때는 baseURL 을 직접 붙여야 한다.
// (템플릿의 src/href 는 Nuxt 가 처리해주지만 background-image 는 손대지 않는다)
// 이렇게 두면 서브 경로 배포로 옮겨도 이 파일을 고칠 필요가 없다.
const { app } = useRuntimeConfig()
const textureUrl = `${app.baseURL}images/bg-texture.webp`
</script>

<template>
  <div class="min-h-dvh text-content">
    <!-- 배경 텍스처.
         · 파일: public/images/bg-texture.webp (없으면 그냥 단색 배경으로 동작)
         · blur + 낮은 불투명도로 깔리므로 1600px 폭이면 충분하다.
           원본 해상도를 그대로 넣으면 10MB 를 받고 흐리게 뭉개는 셈이 된다.
         · blur 를 걸면 가장자리가 투명하게 새므로 -inset-8 로 뷰포트보다 크게 깔아둔다
         · -z-10 이라 항상 콘텐츠 뒤. 이걸 위해 이 래퍼에는 bg-surface 를 주지 않는다
           (배경색은 body 가 담당 — 여기 다시 칠하면 텍스처가 그 뒤로 숨는다) -->
    <div
      class="pointer-events-none fixed -inset-8 -z-10 bg-cover bg-center opacity-50 blur-md dark:opacity-[0.06] dark:invert"
      :style="{ backgroundImage: `url('${textureUrl}')` }"
      aria-hidden="true"
    />

    <AppHeader />
    <SideRule />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
