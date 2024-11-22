<script setup lang="ts">
import type { CompilerOptions } from 'typescript'
import { NEmpty, NTab, NTabs } from 'naive-ui'
import { PropType, ref } from 'vue'
import EditorSupport from './compiler-options/EditorSupport.vue'
import Emit from './compiler-options/emit.vue'
import InteropConstraints from './compiler-options/InteropConstraints.vue'
import JavascriptSupport from './compiler-options/JavascriptSupport.vue'
import Modules from './compiler-options/Modules.vue'
import TypeChecking from './compiler-options/TypeChecking.vue'

const compilerOptions = defineModel<CompilerOptions>('compilerOptions', {
  type: Object as PropType<CompilerOptions>,
  default: {} as CompilerOptions,
})

const showTab = defineModel<boolean>('showTab', {
  type: Boolean,
  default: true,
})

export type CompilerOptionsType = 'type-checking' | 'modules' | 'emit' | 'javascript-support' | 'editor-support' | 'interop-constraints' | 'backwards-compatibility' | 'language-and-environment' | 'compiler-diagnostics' | 'projects' | 'output-formatting' | 'completeness' | 'command-line' | 'watch-options'
const currentTab = ref<CompilerOptionsType>('type-checking')
</script>

<template>
  <div>
    <div flex gap-2 md:gap-4>
      <NTabs v-show="showTab" v-model:value="currentTab" w-auto type="card" placement="left">
        <NTab name="type-checking" label="类型检查" />
        <NTab name="modules" label="模块" />
        <NTab name="emit" label="输出" />
        <NTab name="javascript-support" label="JavaScript支持" />
        <NTab name="editor-support" label="编辑器支持" />
        <NTab name="interop-constraints" label="互操作性约束" />
        <NTab name="backwards-compatibility" label="向后兼容性" />
        <NTab name="language-and-environment" label="语言与环境" />
        <NTab name="compiler-diagnostics" label="编译器诊断" />
        <NTab name="projects" label="项目" />
        <NTab name="output-formatting" label="输出格式" />
        <NTab name="completeness" label="完整性" />
        <NTab name="command-line" label="命令行" />
        <NTab name="watch-options" label="监听选项" />
      </NTabs>

      <div w-full>
        <TypeChecking v-if="currentTab === 'type-checking'" v-model:compiler-options="compilerOptions" />
        <Modules v-else-if="currentTab === 'modules'" v-model:compiler-options="compilerOptions" />
        <Emit v-else-if="currentTab === 'emit'" v-model:compiler-options="compilerOptions" />
        <JavascriptSupport v-else-if="currentTab === 'javascript-support'" v-model:compiler-options="compilerOptions" />
        <EditorSupport v-else-if="currentTab === 'editor-support'" v-model:compiler-options="compilerOptions" />
        <InteropConstraints v-else-if="currentTab === 'interop-constraints'" v-model:compiler-options="compilerOptions" />
        <NEmpty v-else>
          开发中
        </NEmpty>
      </div>
    </div>
  </div>
</template>
