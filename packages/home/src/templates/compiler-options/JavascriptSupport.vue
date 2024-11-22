<script setup lang="tsx">
import type { CompilerOptions } from 'typescript'
import type { PropType } from 'vue'
import { UCustomSwitchCard } from '@unproject/components'
import { NButton, NText } from 'naive-ui'
import TsConfigLink from '../../components/TsConfigLink.vue'

const compilerOptions = defineModel<CompilerOptions>('compilerOptions', {
  type: Object as PropType<CompilerOptions>,
  default: {} as CompilerOptions,
  required: true,
})

function deleteProperty(key: keyof CompilerOptions) {
  compilerOptions.value[key] = undefined
}
</script>

<template>
  <div grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5>
    <UCustomSwitchCard v-model:value="compilerOptions.allowJs" title="allowJs">
      <!-- eslint-disable-next-line -->
       <div>允许 JavaScript 文件在你的工程中被引入，而不是仅仅允许<NText code>.ts</NText>和<NText code>.tsx</NText>文件。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('allowJs')">删除项目</NButton>
        <TsConfigLink type="button" name="allowJs" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.checkJs" title="checkJs">
      <!-- eslint-disable-next-line -->
      <div>与<NText code>allowJs</NText>配合使用,当<NText code>checkJs</NText>被启用时,JavaScript文件中会报告错误。<br />也就是相当于在项目中所有JavaScript文件顶部包含<NText code>// @ts-check</NText>。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('checkJs')">删除项目</NButton>
        <TsConfigLink type="button" name="checkJs" />
      </template>
    </UCustomSwitchCard>
  </div>
</template>
