<script setup lang="ts">
import { NCard, NSwitch } from 'naive-ui'

defineProps<{
  title: string
}>()

const value = defineModel('value', {
  type: Boolean,
})
</script>

<template>
  <NCard size="small" :title="title">
    <slot />
    <template #header-extra>
      <NSwitch v-model:value="value" />
    </template>
    <template #action>
      <div v-if="$slots.action" flex items-center gap-3>
        <slot name="action" />
      </div>
    </template>
  </NCard>
</template>
