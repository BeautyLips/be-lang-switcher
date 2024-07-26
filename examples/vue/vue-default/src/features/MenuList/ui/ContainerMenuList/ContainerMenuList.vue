<script setup lang="ts">
import { computed } from "vue"

const sections = ["Home", "About", "Lang"]

const menu = computed(() => {
  return sections.map((section) => {
    return {
      id: section,
      label: section,
      to: { name: `Page${section}` },
    }
  })
})
</script>

<template>
  <div>
    <div v-for="page of menu" :key="page.id">
      <RouterLink :to="page.to">{{ page.label }}</RouterLink>
    </div>
  </div>
</template>
