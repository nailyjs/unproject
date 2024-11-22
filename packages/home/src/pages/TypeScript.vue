<script setup lang="tsx">
import { UHeader, UIconTab } from '@unproject/components'
import { useWindowSize } from '@vueuse/core'
import { NA, NButton, NCard, NCode, NH3, NTab, NTabs, useMessage } from 'naive-ui'
import path from 'path-browserify'
import { version } from 'typescript'
import { computed, ref, watch } from 'vue'
import { TypeScriptConfiguration, useHomeController } from '../common'
import CompilerOptions from '../templates/CompilerOptions.vue'
import 'vue-i18n'

const message = useMessage()
const homeController = useHomeController()

const tsconfig = ref<Record<string, TypeScriptConfiguration>>({})
const tsconfigPaths = computed(() => Object.keys(tsconfig.value))
const parseLabel = (filePath: string) => filePath.replace(path.dirname(filePath), '').replace(/^\//, '')

function fetchTypeScriptConfiguration() {
  homeController.getTypeScriptConfigurationLayer().then((configuration) => {
    tsconfig.value = configuration
  }).catch(err => console.error(err))
}
fetchTypeScriptConfiguration()

const currentTab = ref<number>(0)
const currentConfiguration = computed(() => {
  return tsconfig.value[tsconfigPaths.value[currentTab.value - 1]]
})

const isSaving = ref(false)
function save() {
  isSaving.value = true
  homeController.updateTypeScriptConfiguration(tsconfigPaths.value[currentTab.value - 1], currentConfiguration.value)
    .then(() => message.success('保存成功'))
    .catch(err => message.error(`保存失败: ${err.message}`))
    .finally(() => isSaving.value = false)
    .then(fetchTypeScriptConfiguration)
}

const windowSize = useWindowSize()
const showTab = ref(true)
watch(windowSize.width, () => {
  if (windowSize.width.value > 540) showTab.value = true
})
</script>

<template>
  <div>
    <UHeader title="TypeScript">
      <NTabs v-model:value="currentTab" animated :default-value="0" size="large">
        <NTab :name="0" tab="基础信息" />
        <NTab v-for="(filePath, index) in tsconfigPaths" :key="index" :name="index + 1">
          <UIconTab icon="i-vscode-icons-file-type-tsconfig">
            {{ parseLabel(filePath) }}
          </UIconTab>
        </NTab>
      </NTabs>
    </UHeader>

    <div v-if="currentTab === 0" p5 sm:p10>
      <NH3>基础信息</NH3>
      <div>
        当前TypeScript版本: v{{ version }}
        <NA target="_blank" :href="`https://devblogs.microsoft.com/typescript/announcing-typescript-${version.split('.')[0]}-${version.split('.')[1]}`">
          查看更新日志
        </NA>
      </div>
    </div>

    <div v-else p5 sm:p10>
      <div flex items-center gap4 mb4 flex-wrap>
        <!-- eslint-disable-next-line -->
        <NH3 m0>编译器选项</NH3>
        <div flex gap3>
          <NButton type="primary" size="small" :loading="isSaving" :disabled="isSaving" @click="save">
            保存
          </NButton>
          <NButton type="info" size="small" @click="fetchTypeScriptConfiguration">
            刷新
          </NButton>
          <NButton v-if="windowSize.width.value < 540" type="warning" size="small" @click="showTab = !showTab">
            {{ showTab ? '隐藏' : '显示' }}选项卡
          </NButton>
        </div>
      </div>
      <CompilerOptions
        v-model:show-tab="showTab"
        v-model:compiler-options="tsconfig[tsconfigPaths[currentTab - 1]].compilerOptions"
      />
      <NH3>当前配置</NH3>
      <NCard>
        <NCode
          language="json"
          :code="JSON.stringify(currentConfiguration, null, 2)"
          :word-wrap="true"
        />
      </NCard>
    </div>
  </div>
</template>
