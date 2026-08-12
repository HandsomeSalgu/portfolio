<script setup lang="ts">
import { experience, profile } from '~/data/portfolio'
</script>

<template>
  <BaseSection id="about" index="01" title="About Me">
    <div class="space-y-14">
      <div>
        <p
          v-for="(paragraph, i) in profile.bio"
          :key="i"
          class="text-lg leading-relaxed text-content-muted not-first:mt-5 sm:text-xl"
        >
          {{ paragraph }}
        </p>
      </div>

      <dl class="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
        <div>
          <dt class="text-xs tracking-widest text-content-subtle uppercase">Name</dt>
          <dd class="mt-1.5 font-medium">{{ profile.name }}</dd>
        </div>
        <div v-if="profile.location">
          <dt class="text-xs tracking-widest text-content-subtle uppercase">Location</dt>
          <dd class="mt-1.5 font-medium">{{ profile.location }}</dd>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <dt class="text-xs tracking-widest text-content-subtle uppercase">Email</dt>
          <dd class="mt-1.5 font-medium">
            <a :href="`mailto:${profile.email}`" class="hover:text-accent">
              {{ profile.email }}
            </a>
          </dd>
        </div>
      </dl>

      <!-- 경력 타임라인. 세로 룰은 히어로 좌측 룰과 같은 언어 -->
      <ol v-if="experience.length" class="border-l border-accent/25 pl-6 md:pl-8">
        <li
          v-for="item in experience"
          :key="item.organization + item.period"
          class="relative pb-10 last:pb-0"
        >
          <span
            class="absolute -left-[1.6875rem] top-2 size-1.5 rounded-full bg-accent md:-left-[2.1875rem]"
            aria-hidden="true"
          />
          <p class="font-mono text-xs tracking-wider text-accent/70">{{ item.period }}</p>
          <p class="mt-2 text-lg font-bold">{{ item.organization }}</p>
          <p class="mt-0.5 text-sm text-content-muted">{{ item.position }}</p>
          <ul v-if="item.description?.length" class="mt-3 space-y-1.5">
            <li
              v-for="line in item.description"
              :key="line"
              class="text-sm leading-relaxed text-content-muted"
            >
              {{ line }}
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </BaseSection>
</template>
