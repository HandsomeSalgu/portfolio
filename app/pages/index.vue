<script setup lang="ts">
import { profile } from '~/data/portfolio'

useHead({
  title: `${profile.name} — Portfolio`,
  meta: [
    { name: 'description', content: `${profile.tagline} ${profile.name}입니다.` },
  ],
})
</script>

<!-- 한 페이지 구성. 헤더 탭은 라우팅 없이 아래 섹션들로 스크롤 이동한다. -->
<template>
  <div>
    <SectionHero />
    <SectionAbout />
    <SectionSkills />
    <SectionProjects />
    <SectionContact />
  </div>
</template>
