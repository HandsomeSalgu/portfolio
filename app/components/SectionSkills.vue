<script setup lang="ts">
import { skillGroups } from '~/data/portfolio'
</script>

<template>
  <BaseSection id="skills" index="02" title="Skills">
    <dl class="divide-y divide-line">
      <div
        v-for="group in skillGroups"
        :key="group.category"
        class="grid gap-3 py-7 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-8"
      >
        <dt class="text-sm font-semibold tracking-widest text-accent uppercase">
          {{ group.category }}
        </dt>
        <dd class="flex flex-wrap gap-x-2.5 gap-y-2">
          <span
            v-for="skill in group.items"
            :key="skill"
            class="border border-accent/20 px-3 py-1 text-sm text-content-muted"
          >
            {{ skill }}
          </span>
        </dd>
      </div>
    </dl>
  </BaseSection>
</template>
