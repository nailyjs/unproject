<script setup lang="tsx">
import { darkTheme, NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider, zhCN } from 'naive-ui'
import { RouterView } from 'vue-router'
import { isDark } from './composables/dark'
</script>

<template>
  <Suspense>
    <NLoadingBarProvider>
      <NConfigProvider :theme="isDark ? darkTheme : null" :locale="zhCN">
        <NMessageProvider>
          <NDialogProvider>
            <RouterView />
          </NDialogProvider>
        </NMessageProvider>
      </NConfigProvider>
    </NLoadingBarProvider>

    <template #fallback>
      <div>Loading unproject...</div>
    </template>
  </Suspense>
</template>
