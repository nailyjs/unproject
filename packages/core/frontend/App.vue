<script setup lang="tsx">
import hljs from 'highlight.js/lib/core'
import { darkTheme, NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider, zhCN } from 'naive-ui'
import { register } from 'virtual:uncli:hljs'
import { RouterView } from 'vue-router'
import { isDark } from './composables/dark'

await register(hljs)
hljs.registerLanguage('log', () => {
  return {
    name: 'log',
    case_insensitive: true, // 如果语言不区分大小写
    contains: [
      {
        className: 'log-date',
        begin: /\d{4}-\d{2}-\d{2}/, // 匹配日期格式，如 2021-01-01
      },
      {
        className: 'log-time',
        begin: /\d{2}:\d{2}:\d{2}/, // 匹配时间格式，如 12:00:00
      },
      {
        className: 'log-datetime',
        begin: /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/, // 匹配日期时间格式
      },
      {
        className: 'log-message',
        begin: /:/, // 假设消息部分以冒号开始
        end: /$/,
        excludeBegin: true,
      },
      {
        className: 'log-bracketed',
        begin: /\[/, // 匹配方括号
        end: /\]/, // 匹配方括号
      },
    ],
  }
})
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

<style>
.hljs-log-datetime {
  color: #f0f !important;
}

.hljs-log-bracketed {
  color: #5FBC22 !important;
}
</style>
