<script setup lang="tsx">
import { useDark } from '@vueuse/core'
import { NButton, NCard, NH1, NInput, NInputGroup, NLayoutHeader, NSelect, NTab, NTabs } from 'naive-ui'
import { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { PropType } from 'vue'

const emit = defineEmits(['search'])
const isDark = useDark()
const searchValue = defineModel('searchValue', {
  default: '',
  type: String,
})
const currentTab = defineModel({
  default: 'market',
  type: String as PropType<'market' | 'plugin' | '本地'>,
})
const searchSelectValue = defineModel('searchSelectValue', {
  default: 'npm',
  type: String as PropType<'npm' | 'taobao' | 'github'>,
})
const searching = defineModel('searching', {
  default: false,
  type: Boolean,
})

const searchSelectOptions: SelectMixedOption[] = [
  {
    label: 'npm',
    value: 'npm',
  },
  {
    label: '淘宝源',
    value: 'taobao',
  },
  {
    label: 'Github',
    value: 'github',
  },
]
</script>

<template>
  <div>
    <NLayoutHeader p5 sm:p10 class="pb0!" bordered>
      <NH1>市场</NH1>
      <NTabs v-model:value="currentTab" default-value="market" size="large">
        <NTab name="market">
          <div flex items-center gap-1>
            <div class="i-vscode-icons-folder-type-frontcommerce-opened" />
            市场
          </div>
        </NTab>
        <NTab name="plugin">
          <div flex items-center gap-1>
            <div class="i-vscode-icons-folder-type-plugin-opened" />
            unproject插件
          </div>
        </NTab>
        <NTab name="本地">
          <div flex items-center gap-1>
            <div class="i-vscode-icons-folder-type-light-node-opened" />
            本地
          </div>
        </NTab>
      </NTabs>
    </NLayoutHeader>

    <!-- 搜索框 -->
    <NCard v-show="currentTab === 'market'" size="huge" class="rounded-none border-t-none! border-l-none! border-r-none!" content-class="flex justify-center">
      <NInputGroup max-w-xl>
        <NSelect v-model:value="searchSelectValue" :options="searchSelectOptions" size="large" max-w-25 />
        <NInput v-model:value="searchValue" autofocus size="large" placeholder="输入搜索内容..." />
        <NButton :loading="searching" :disabled="searching" size="large" type="primary" :secondary="isDark" @click="emit('search')">
          搜索
          <template #icon>
            <div class="i-ph-magnifying-glass-duotone" />
          </template>
        </NButton>
      </NInputGroup>
    </NCard>
  </div>
</template>
