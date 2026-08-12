<script setup lang="ts">
import { profile, socialLinks } from '~/data/portfolio'
</script>

<template>
  <BaseSection id="contact" index="04" title="Contact">
    <p class="text-lg leading-relaxed text-content-muted">
      제안이나 문의는 편하게 메일 주세요.
    </p>

    <a
      :href="`mailto:${profile.email}`"
      class="mt-6 inline-block text-3xl font-extrabold tracking-tight text-accent underline-offset-8 hover:underline sm:text-4xl"
    >
      {{ profile.email }}
    </a>

    <ul class="mt-12 flex flex-wrap gap-x-8 gap-y-3">
      <li v-for="link in socialLinks" :key="link.label">
        <a
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-sm tracking-wider text-content-muted uppercase hover:text-accent"
        >
          {{ link.label }} ↗
        </a>
      </li>
    </ul>
  </BaseSection>
</template>
