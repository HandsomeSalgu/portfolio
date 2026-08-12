<script setup lang="ts">
import { sortedProjects } from '~/data/portfolio'
</script>

<template>
  <BaseSection id="projects" index="03" title="Projects">
    <ol class="divide-y divide-line">
      <li
        v-for="project in sortedProjects"
        :key="project.slug"
        class="group py-10 first:pt-0 last:pb-0"
      >
        <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 class="text-2xl font-extrabold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
            {{ project.title }}
          </h3>
          <p class="font-mono text-xs tracking-wider text-accent/70">
            {{ project.period }}
          </p>
        </div>

        <p class="mt-1.5 text-sm text-content-subtle">
          {{ project.role }}<template v-if="project.teamSize"> · {{ project.teamSize }}인</template>
        </p>

        <p class="mt-4 leading-relaxed text-content-muted">{{ project.summary }}</p>

        <ul v-if="project.highlights?.length" class="mt-5 space-y-2 border-l border-accent/25 pl-5">
          <li
            v-for="highlight in project.highlights"
            :key="highlight"
            class="text-sm leading-relaxed text-content-muted"
          >
            {{ highlight }}
          </li>
        </ul>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ul class="flex flex-wrap gap-x-2.5 gap-y-1.5">
            <li
              v-for="tech in project.techStack"
              :key="tech"
              class="font-mono text-xs text-content-subtle"
            >
              {{ tech }}
            </li>
          </ul>

          <ul v-if="project.links?.length" class="flex gap-5">
            <li v-for="link in project.links" :key="link.href">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-semibold text-accent hover:underline"
              >
                {{ link.label }} ↗
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </BaseSection>
</template>
