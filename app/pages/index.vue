<script setup lang="ts">
import { profile, siteUrl } from '~/data/portfolio'

const title = `${profile.name} — Portfolio`
const description = `${profile.tagline} ${profile.name}입니다.`
// OG 이미지 · canonical 은 절대 URL 이어야 한다 (data/portfolio.ts 의 siteUrl 주석 참고)
const ogImage = `${siteUrl}/images/og.png`

// 포트폴리오는 링크로 전달되는 물건이라, 카카오톡 · 링크드인 · 슬랙에
// 붙였을 때 미리보기가 뜨는지가 제목 태그만큼 중요하다.
useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogSiteName: title,
  ogTitle: title,
  ogDescription: description,
  ogUrl: siteUrl,
  ogLocale: 'ko_KR',
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${profile.name} 포트폴리오`,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/` }],
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
