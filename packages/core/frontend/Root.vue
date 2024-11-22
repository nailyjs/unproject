<script setup lang="ts">
import { UFallback } from '@unproject/components'
import App from './App.vue'
</script>

<template>
  <Suspense>
    <App />

    <template #fallback>
      <UFallback fixed left-0 top-0 w-full h-full src="/assets/logo.svg" />
    </template>
  </Suspense>
</template>
