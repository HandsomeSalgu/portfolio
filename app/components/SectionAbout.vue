<script setup lang="ts">
import { experience, profile } from '~/data/portfolio'
</script>

<template>
  <BaseSection id="about" index="01" title="About Me">
    <div class="grid items-start gap-10 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14">
      <!-- 프로필 사진. data/portfolio.ts 의 profile.avatar 에 경로를 넣으면 표시된다.
           예: public/images/profile.jpg 에 파일을 두고 avatar: '/images/profile.jpg' -->
      <figure class="mx-auto w-full max-w-60 md:mx-0 md:max-w-none">
        <div class="aspect-3/4 overflow-hidden border border-accent/25 bg-surface-muted">
          <img
            v-if="profile.avatar"
            :src="profile.avatar"
            :alt="`${profile.name} 프로필 사진`"
            class="size-full object-cover"
          >
          <div
            v-else
            class="flex size-full flex-col items-center justify-center gap-3 text-accent/40"
          >
            <svg viewBox="0 0 24 24" class="size-12" fill="none" stroke="currentColor" stroke-width="1.25">
              <circle cx="12" cy="8.5" r="3.5" />
              <path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" stroke-linecap="round" />
            </svg>
            <span class="font-mono text-[0.625rem] tracking-wider">profile.avatar</span>
          </div>
        </div>
      </figure>

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

      <!-- 경력 · 교육 가로 타임라인.
           각 항목이 줄의 1/N 구간을 차지하고, 구간 줄과 동그라미 색이
           type(근무=accent, 교육=brand-300)에 따라 갈라진다.
           상세는 호버로, 터치/키보드에선 동그라미 포커스로 뜬다. -->
      <div v-if="experience.length">
        <div class="mb-8 flex justify-end gap-5 text-xs text-content-subtle">
          <span class="flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-accent" aria-hidden="true" /> 근무
          </span>
          <span class="flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-brand-300" aria-hidden="true" /> 교육
          </span>
        </div>

        <ol class="flex">
          <li
            v-for="(item, i) in experience"
            :key="item.organization + item.period"
            class="group relative flex-1"
          >
            <!-- 이 항목이 차지하는 구간의 가로줄 -->
            <span
              class="absolute inset-x-0 top-[5px] h-px"
              :class="item.type === 'education' ? 'bg-brand-300' : 'bg-accent'"
              aria-hidden="true"
            />

            <div class="flex flex-col items-center">
              <button
                type="button"
                class="relative z-10 size-[11px] rounded-full ring-4 ring-surface transition-transform group-hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                :class="item.type === 'education' ? 'bg-brand-300' : 'bg-accent'"
                :aria-label="`${item.organization} 상세 보기`"
              />
              <p class="mt-4 px-1 text-center text-sm font-semibold">
                {{ item.organization }}
              </p>
              <p class="mt-1 px-1 text-center font-mono text-[0.625rem] tracking-wider text-content-subtle">
                {{ item.period }}
              </p>
            </div>

            <!-- 상세 카드: 줄 위로 뜬다. 첫/끝 항목은 화면 밖으로 새지 않게 가장자리 정렬 -->
            <div
              class="pointer-events-none absolute bottom-full z-20 mb-4 w-64 translate-y-1 opacity-0 transition duration-300 ease-out-expo group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:w-72"
              :class="
                i === 0 ? 'left-0'
                : i === experience.length - 1 ? 'right-0'
                : 'left-1/2 -translate-x-1/2'
              "
            >
              <div
                class="border bg-surface p-5 text-left"
                :class="item.type === 'education' ? 'border-brand-300/60' : 'border-accent/40'"
              >
                <p class="font-mono text-[0.625rem] tracking-wider text-accent/70">
                  {{ item.period }}
                </p>
                <p class="mt-1.5 font-bold">{{ item.organization }}</p>
                <p class="mt-0.5 text-xs leading-relaxed text-content-muted">
                  {{ item.position }}
                </p>
                <ul v-if="item.description?.length" class="mt-3 space-y-1.5 border-t border-line pt-3">
                  <li
                    v-for="line in item.description"
                    :key="line"
                    class="text-xs leading-relaxed text-content-muted"
                  >
                    {{ line }}
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ol>
      </div>
      </div>
    </div>
  </BaseSection>
</template>
