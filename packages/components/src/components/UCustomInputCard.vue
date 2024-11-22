<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { NCard, NInput } from 'naive-ui'

defineProps<{
  title: string
}>()

const value = defineModel('value', {
  type: String,
})

const windowSize = useWindowSize()
</script>

<template>
  <NCard size="small" :title="title">
    <slot />
    <template #header-extra>
      <!-- @vue-ignore -->
      <NInput v-model:value="value" :size="windowSize.width < 540 ? 'small' : 'tiny'" />
    </template>
    <template #action>
      <div v-if="$slots.action" flex items-center gap-3>
        <slot name="action" />
      </div>
    </template>
  </NCard>
</template>
