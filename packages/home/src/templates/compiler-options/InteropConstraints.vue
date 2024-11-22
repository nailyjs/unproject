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
  <div grid grid-cols-1 lg:grid-cols-2 gap-5>
    <UCustomSwitchCard v-model:value="compilerOptions.allowSyntheticDefaultImports" title="allowSyntheticDefaultImports">
      <!-- eslint-disable-next-line -->
      <div>当设置为 true， 并且模块没有显式指定默认导出时，启用此选项等于让<NText code>import * as React from "react"</NText>成为<NText code>import React from "react"</NText>。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('allowSyntheticDefaultImports')">删除项目</NButton>
        <TsConfigLink type="button" name="allowSyntheticDefaultImports" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.esModuleInterop" title="esModuleInterop">
      <!-- eslint-disable-next-line -->
      <div>修复某些CommonJS模块的导出，使其与ES6+模块兼容。具体内容可以点击下方文档了解详情。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('esModuleInterop')">删除项目</NButton>
        <TsConfigLink type="button" name="esModuleInterop" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.forceConsistentCasingInFileNames" title="forceConsistentCasingInFileNames">
      <!-- eslint-disable-next-line -->
      <div>在引用文件时，强制使用一致的大小写。例如，如果有一个文件叫做<NText code>MyFile.ts</NText>，那么<NText code>import x from "./myfile"</NText>将会报错。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('forceConsistentCasingInFileNames')">删除项目</NButton>
        <TsConfigLink type="button" name="forceConsistentCasingInFileNames" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.isolatedDeclarations" title="isolatedDeclarations">
      <!-- eslint-disable-next-line -->
      <div>要求对export的所有内容注明类型注释,以便其他工具可以轻松生成声明文件。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('isolatedDeclarations')">删除项目</NButton>
        <TsConfigLink type="button" name="isolatedDeclarations" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.isolatedModules" title="isolatedModules">
      <!-- eslint-disable-next-line -->
      <div>将每个文件视为独立的模块。这意味着文件之间的引用将被视为全局引用。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('isolatedModules')">删除项目</NButton>
        <TsConfigLink type="button" name="isolatedModules" />
      </template>
    </UCustomSwitchCard>
  </div>
</template>
