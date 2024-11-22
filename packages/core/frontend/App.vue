<script setup lang="tsx">
import hljs from 'highlight.js/lib/core'
import { darkTheme, NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider, zhCN } from 'naive-ui'
import { register } from 'virtual:uncli:hljs'
import { RouterView } from 'vue-router'
import { isDark } from './composables/dark'

await register(hljs)
</script>

<template>
  <NConfigProvider :hljs="hljs" :theme="isDark ? darkTheme : null" :locale="zhCN">
    <NLoadingBarProvider>
      <NMessageProvider>
        <NDialogProvider>
          <RouterView />
        </NDialogProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
