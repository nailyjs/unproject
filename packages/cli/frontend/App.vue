<script setup lang="tsx">
import { darkTheme, NConfigProvider, NDialogProvider, NMessageProvider, zhCN } from 'naive-ui'
import { RouterView } from 'vue-router'
import { isDark } from './composables/dark'
</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : null" :locale="zhCN">
    <NMessageProvider>
      <NDialogProvider>
        <Suspense>
          <RouterView />
        </Suspense>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
