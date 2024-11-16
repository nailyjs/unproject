<script setup lang="tsx">
import { NH2 } from 'naive-ui'

defineProps<{
  title: string
  icon: string
}>()
</script>

<template>
  <div flex items-center gap-2 text-size-18px>
    <div :class="`${icon}`" />
    <NH2 m0 text-size-18px>
      {{ title }}
    </NH2>
  </div>
</template>
