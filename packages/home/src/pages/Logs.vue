<script setup lang="ts">
/// <reference types="vite/client" />

import { UHeader } from '@unproject/components'
import { NLog } from 'naive-ui'
import { ref } from 'vue'
import { useHomeController } from '../common'

const homeController = useHomeController()
const logs = ref<string>('')

function fetchLogs() {
  homeController.getInternalLogs()
    .then((res) => {
      logs.value = res.raw.split('\n')
        .map((line) => {
          try {
            const parsed = JSON.parse(line)
            return `[Naily] ${new Date(parsed.timestamp).toLocaleString()} [${((parsed.level || '') as string).toUpperCase().charAt(0)}] ${parsed.ms} ${parsed.message}`
          }
          // eslint-disable-next-line unused-imports/no-unused-vars
          catch (e) {
            return line
          }
        })
        .join('\n')
    })
    .catch(() => logs.value = '获取日志失败')
}
fetchLogs()

import.meta.hot?.on('unproject/home:update:logs', () => fetchLogs())
</script>

<template>
  <div>
    <UHeader title="日志" />
    <div p10>
      <NLog language="log" trim :log="logs" />
    </div>
  </div>
</template>
