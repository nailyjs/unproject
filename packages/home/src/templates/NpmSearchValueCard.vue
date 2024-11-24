<script setup lang="ts">
import { NButton, NCard, NTag, NText } from 'naive-ui'
import { NpmSearchValueItem } from '../common'

defineProps<Partial<NpmSearchValueItem>>()
defineEmits<{
  install: [Partial<NpmSearchValueItem>]
}>()
</script>

<template>
  <NCard size="small" :title="name">
    <div v-if="type === 'npm' && keywords && keywords.length" mb3 flex gap-2 flex-wrap>
      <NTag v-for="(tagItem, tagIndex) in keywords" :key="tagIndex">
        {{ tagItem }}
      </NTag>
    </div>
    <NText :depth="3">
      {{ description }}
    </NText>
    <template #header-extra>
      <div flex items-center gap-3>
        <NButton type="primary" size="small" @click="$emit('install', $props)">
          安装
        </NButton>
        <NButton tag="a" text type="primary" size="small" :href="href" target="_blank">
          打开 <template #icon>
            <div class="i-ph-arrow-square-out-duotone" />
          </template>
        </NButton>
      </div>
    </template>
  </NCard>
</template>
