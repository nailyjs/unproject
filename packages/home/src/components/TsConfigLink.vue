<script lang="ts" setup>
import { NA, NButton } from 'naive-ui'

const { type = 'a' } = defineProps<{ name: string, type?: 'a' | 'button' }>()
</script>

<template>
  <NA v-if="type === 'a'" :href="`https://www.typescriptlang.org/tsconfig#${name}`" target="_blank">
    文档链接
  </NA>
  <NButton v-else type="info" tag="a" size="tiny" :href="`https://www.typescriptlang.org/tsconfig#${name}`" target="_blank">
    文档链接
  </NButton>
</template>
