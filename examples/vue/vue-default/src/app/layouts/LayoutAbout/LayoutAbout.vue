<script setup lang="ts"></script>

<template>
  <div>
    <div>Layout About</div>

    <div>
      <RouterLink :to="{ name: 'PageHome' }">Home</RouterLink>
    </div>

    <RouterView />
  </div>
</template>
