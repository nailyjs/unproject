<script setup lang="tsx">
import type { CompilerOptions } from 'typescript'
import type { PropType } from 'vue'
import { NEmpty, NH2 } from 'naive-ui'

const _compilerOptions = defineModel<CompilerOptions>('compilerOptions', {
  type: Object as PropType<CompilerOptions>,
  default: {} as CompilerOptions,
  required: true,
})
</script>

<template>
  <div>
    <NH2>插件</NH2>
    <NEmpty>开发中</NEmpty>
  </div>
</template>
