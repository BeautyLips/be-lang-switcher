<script setup lang="ts">
import { langSwitcher } from "@/shared/tools/lang"
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<template>
  <div>
    <div class="mb-4">Lang with URL</div>

    <div class="mb-4">
      <select
        name="lang"
        :value="langSwitcher.lang.value"
        @change="(evt) => langSwitcher.switchUrl(evt?.target?.value, router)"
      >
        <option
          v-for="l in langSwitcher.langOptions"
          :key="l.value"
          :value="l.value"
        >
          {{ l.label }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      Lang without URL (your should disable settings for router (redirect &
      middleware))
    </div>

    <div class="mb-4">
      <button
        :style="{ opacity: langSwitcher.lang.value === l.value ? 1 : 0.5 }"
        v-for="l in langSwitcher.langOptions"
        :key="l.value"
        @click="() => langSwitcher.switch(l)"
      >
        {{ l.label }}
      </button>
    </div>

    <div class="mb-4">
      <div class="mb-2">Message: {{ $t("message.hello") }}</div>
    </div>

    <div class="mb-4">
      <div class="mb-2">Plural: {{ $tc("apple", 0) }}</div>
      <div class="mb-2">Plural: {{ $tc("apple", 1) }}</div>
      <div class="mb-2">Plural: {{ $tc("apple", 18) }}</div>
    </div>
  </div>
</template>
