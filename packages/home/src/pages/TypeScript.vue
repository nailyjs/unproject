<script setup lang="ts">
import { UHeader, UIconTab } from '@unproject/components'
import { NCard, NH3, NSwitch, NTab, NTabs, NText } from 'naive-ui'
import path from 'path-browserify'
import { computed, ref } from 'vue'
import { TypeScriptConfiguration, useHomeController } from '../common'

const homeController = useHomeController()

const tsconfig = ref<Record<string, TypeScriptConfiguration>>({})
const tsconfigPaths = computed(() => Object.keys(tsconfig.value))
const parseLabel = (filePath: string) => filePath.replace(path.dirname(filePath), '').replace(/^\//, '')
homeController.getTypeScriptConfigurationLayer().then((configuration) => {
  tsconfig.value = configuration
}).catch(err => console.error(err))

const tsconfigPath = ref<number>(0)
</script>

<template>
  <div>
    <UHeader title="TypeScript">
      <NTabs v-model:value="tsconfigPath" animated :default-value="0" size="large">
        <NTab :name="0" tab="基础信息" />
        <NTab v-for="(filePath, index) in tsconfigPaths" :key="index" :name="index + 1">
          <UIconTab icon="i-vscode-icons-file-type-tsconfig">
            {{ parseLabel(filePath) }}
          </UIconTab>
        </NTab>
      </NTabs>
    </UHeader>

    <div p5 sm:p10>
      <NH3>编译器选项</NH3>
      <div flex flex-col gap-5>
        <NCard size="small" title="allowImportingTsExtensions">
          <!-- eslint-disable-next-line -->
        <div>是否允许导入<NText code>.ts</NText>扩展名。</div>
          <template #header-extra>
            <NSwitch />
          </template>
        </NCard>

        <NCard size="small" title="allowJs">
          <!-- eslint-disable-next-line -->
        <div>是否允许编译<NText code>.js</NText>文件。</div>
          <template #header-extra>
            <NSwitch />
          </template>
        </NCard>
      </div>
    </div>
  </div>
</template>
