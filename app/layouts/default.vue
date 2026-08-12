<template>
  <div class="min-h-dvh text-content">
    <!-- 배경 텍스처.
         · 파일: public/images/bg-texture.jpg (없으면 그냥 단색 배경으로 동작)
         · blur 를 걸면 가장자리가 투명하게 새므로 -inset-8 로 뷰포트보다 크게 깔아둔다
         · -z-10 이라 항상 콘텐츠 뒤. 이걸 위해 이 래퍼에는 bg-surface 를 주지 않는다
           (배경색은 body 가 담당 — 여기 다시 칠하면 텍스처가 그 뒤로 숨는다) -->
    <div
      class="pointer-events-none fixed -inset-8 -z-10 bg-cover bg-center opacity-50 blur-md dark:opacity-[0.06] dark:invert"
      style="background-image: url('/images/bg-texture.jpg')"
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
