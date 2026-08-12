<script setup lang="ts">
import { sortedProjects } from '~/data/portfolio'
</script>

<template>
  <BaseSection id="projects" index="03" title="Projects">
    <!-- 카드 그리드. 데스크톱 3열 기준으로 개수가 늘면 아래로 줄이 늘어난다 -->
    <ul class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <li
        v-for="project in sortedProjects"
        :key="project.slug"
        class="group flex flex-col border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-accent/50"
      >
        <p class="font-mono text-[0.625rem] tracking-wider text-accent/70">
          {{ project.period }}
        </p>
        <h3
          class="mt-2 text-xl font-extrabold tracking-tight transition-colors group-hover:text-accent"
        >
          {{ project.title }}
        </h3>
        <p class="mt-1 text-xs text-content-subtle">
          {{ project.role }}<template v-if="project.teamSize"> · {{ project.teamSize }}인</template>
        </p>

        <p class="mt-3 text-sm leading-relaxed text-content-muted">
          {{ project.summary }}
        </p>

        <ul
          v-if="project.highlights?.length"
          class="mt-4 space-y-1.5 border-l border-accent/25 pl-4"
        >
          <li
            v-for="highlight in project.highlights"
            :key="highlight"
            class="text-xs leading-relaxed text-content-muted"
          >
            {{ highlight }}
          </li>
        </ul>

        <!-- 카드 높이가 달라도 스택/링크는 항상 바닥에 붙는다 -->
        <div class="mt-auto pt-6">
          <ul class="flex flex-wrap gap-x-2 gap-y-1">
            <li
              v-for="tech in project.techStack"
              :key="tech"
              class="font-mono text-[0.625rem] text-content-subtle"
            >
              {{ tech }}
            </li>
          </ul>

          <ul v-if="project.links?.length" class="mt-4 flex gap-4 border-t border-line pt-4">
            <li v-for="link in project.links" :key="link.href">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-semibold text-accent hover:underline"
              >
                {{ link.label }} ↗
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </BaseSection>
</template>
