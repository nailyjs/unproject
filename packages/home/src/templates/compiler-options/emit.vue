<script setup lang="tsx">
import { UCustomSwitchCard } from '@unproject/components'
import { NButton, NCard, NInput, NSelect, NText } from 'naive-ui'
import { CompilerOptions, NewLineKind } from 'typescript'
import { PropType } from 'vue'
import TsConfigLink from '../../components/TsConfigLink.vue'

const compilerOptions = defineModel<CompilerOptions>('compilerOptions', {
  type: Object as PropType<CompilerOptions>,
  default: {} as CompilerOptions,
  required: true,
})

function deleteProperty(key: keyof CompilerOptions) {
  compilerOptions.value[key] = undefined
}

const newLineOptions = Object.keys(NewLineKind)
  .map(key => ({ label: key, value: key === 'CarriageReturnLineFeed' ? 'crlf' : 'lf' }))
  .filter(option => Number.isNaN(Number(option.label)))
</script>

<template>
  <div grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5>
    <UCustomSwitchCard v-model:value="compilerOptions.declaration" title="declaration">
      <!-- eslint-disable-next-line -->
      <div>生成相应的 .d.ts 文件。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('declaration')">删除项目</NButton>
        <TsConfigLink type="button" name="allowArbitraryExtensions" />
      </template>
    </UCustomSwitchCard>
    <NCard size="small" title="declarationDir">
      <div>设置生成的声明文件的输出目录。</div>
      <NInput v-model:value="compilerOptions.declarationDir" mt1 size="small" placeholder="设置目录路径..." />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('declarationDir')">删除项目</NButton>
          <TsConfigLink type="button" name="declarationDir" />
        </div>
      </template>
    </NCard>
    <UCustomSwitchCard v-model:value="compilerOptions.declarationMap" title="declarationMap">
      <!-- eslint-disable-next-line -->
      <div>生成.d.ts相应的.map文件。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('declarationMap')">删除项目</NButton>
        <TsConfigLink type="button" name="declarationMap" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.downlevelIteration" title="downlevelIteration">
      <!-- eslint-disable-next-line -->
      <div>ES5环境下，如果启用了此选项, 将 for..of与迭代器等语句降级成传统for循环。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('downlevelIteration')">删除项目</NButton>
        <TsConfigLink type="button" name="downlevelIteration" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.emitBOM" title="emitBOM">
      <!-- eslint-disable-next-line -->
      <div>控制 TypeScript 在写入输出文件时是否发出字节顺序标记（BOM）。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('emitBOM')">删除项目</NButton>
        <TsConfigLink type="button" name="emitBOM" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.emitDeclarationOnly" title="emitDeclarationOnly">
      <!-- eslint-disable-next-line -->
      <div>只生成声明文件，而不生成 JavaScript 文件。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('emitDeclarationOnly')">删除项目</NButton>
        <TsConfigLink type="button" name="emitDeclarationOnly" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.importHelpers" title="importHelpers">
      <!-- eslint-disable-next-line -->
      <div>如果启用了此选项, 各类辅助函数将从<NText code>tslib</NText>中被导入, 你需要确保tslib模块在运行时可以被导入。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('importHelpers')">删除项目</NButton>
        <TsConfigLink type="button" name="importHelpers" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.inlineSourceMap" title="inlineSourceMap">
      <!-- eslint-disable-next-line -->
      <div>设置后,TypeScript 将在.js文件中嵌入源码映射内容,而不是写入.js.map文件中。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('inlineSourceMap')">删除项目</NButton>
        <TsConfigLink type="button" name="inlineSourceMap" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.inlineSources" title="inlineSources">
      <!-- eslint-disable-next-line -->
      <div>设置后，TypeScript会将.ts文件的原始内容作为嵌入字符串包含在源码映射中（使用源码映射的sourcesContent属性）。这在与内联源码映射相同的情况下通常很有用。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('inlineSources')">删除项目</NButton>
        <TsConfigLink type="button" name="inlineSources" />
      </template>
    </UCustomSwitchCard>
    <NCard size="small" title="mapRoot">
      <div>指定调试器应查找映射文件的位置，而不是生成的位置。此字符串在源映射中按原样处理。</div>
      <NInput v-model:value="compilerOptions.mapRoot" mt1 size="small" placeholder="设置目录路径..." />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('mapRoot')">删除项目</NButton>
          <TsConfigLink type="button" name="mapRoot" />
        </div>
      </template>
    </NCard>
    <NCard size="small" title="newLine">
      <!-- eslint-disable-next-line -->
      <div>设置新行字符。<br />dos: <NText code>CRLF</NText>; unix: <NText code>LF</NText></div>
      <NSelect v-model:value="compilerOptions.newLine" mt2 :options="newLineOptions" size="small" />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('newLine')">删除项目</NButton>
          <TsConfigLink type="button" name="newLine" />
        </div>
      </template>
    </NCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noEmit" title="noEmit">
      <!-- eslint-disable-next-line -->
      <div>不生成输出文件，只进行类型检查。这为另一个工具提供了空间，例如用 Babel 或 swc 来处理将 TypeScript 转换为可以在 JavaScript 环境中运行的文件的过程。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noEmit')">删除项目</NButton>
        <TsConfigLink type="button" name="noEmit" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noEmitHelpers" title="noEmitHelpers">
      <!-- eslint-disable-next-line -->
      <div>不要使用 importHelpers 导入helper工具函数，而是可以在全局作用域中为使用的帮助函数提供实现，并完全关闭帮助函数的生成。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noEmitHelpers')">删除项目</NButton>
        <TsConfigLink type="button" name="noEmitHelpers" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noEmitOnError" title="noEmitOnError">
      <!-- eslint-disable-next-line -->
      <div>在发生错误时不生成输出文件。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noEmitOnError')">删除项目</NButton>
        <TsConfigLink type="button" name="noEmitOnError" />
      </template>
    </UCustomSwitchCard>
    <NCard size="small" title="outDir">
      <div>如果被指定, .js（以及.d.ts,.js.map等）将会被生成到这个目录下。</div>
      <NInput v-model:value="compilerOptions.outDir" mt1 size="small" placeholder="设置目录路径..." />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('outDir')">删除项目</NButton>
          <TsConfigLink type="button" name="outDir" />
        </div>
      </template>
    </NCard>
    <NCard size="small" title="outFile">
      <div>如果被指定，所有 全局 （非模块）文件将被合并到指定的单个输出文件中。</div>
      <NInput v-model:value="compilerOptions.outFile" mt1 size="small" placeholder="设置文件名..." />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('outFile')">删除项目</NButton>
          <TsConfigLink type="button" name="outFile" />
        </div>
      </template>
    </NCard>
    <UCustomSwitchCard v-model:value="compilerOptions.preserveConstEnums" size="small" title="preserveConstEnums">
      <!-- eslint-disable-next-line -->
      <div>如果启用了此选项, const枚举将被保留在编译后的代码中。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('preserveConstEnums')">删除项目</NButton>
        <TsConfigLink type="button" name="preserveConstEnums" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.removeComments" title="removeComments">
      <!-- eslint-disable-next-line -->
      <div>如果启用了此选项, TypeScript 将从生成的 JavaScript 文件中删除注释。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('removeComments')">删除项目</NButton>
        <TsConfigLink type="button" name="removeComments" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.sourceMap" title="sourceMap">
      <!-- eslint-disable-next-line -->
      <div>如果启用了此选项,将生成sourcemap文件。这些文件允许调试器和其他工具在使用实际生成的JavaScript文件时,显示原始的TypeScript代码。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('sourceMap')">删除项目</NButton>
        <TsConfigLink type="button" name="sourceMap" />
      </template>
    </UCustomSwitchCard>
    <NCard size="small" title="sourceRoot">
      <!-- eslint-disable-next-line -->
      <div>指定调试器应查找源文件的位置，而不是生成的位置。此字符串在源映射中按原样处理。</div>
      <NInput v-model:value="compilerOptions.sourceRoot" mt1 size="small" placeholder="设置目录路径..." />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('sourceRoot')">删除项目</NButton>
          <TsConfigLink type="button" name="sourceRoot" />
        </div>
      </template>
    </NCard>
    <UCustomSwitchCard v-model:value="compilerOptions.stripInternal" title="stripInternal">
      <!-- eslint-disable-next-line -->
      <div>对于在JSDoc注释中具有<NText code>@internal</NText>注释的代码，不要输出声明。<br />这是一个内部编译器选项；使用风险自负,因为编译器不会检查结果是否有效。如果您正在寻找工具来处理d.ts文件中的额外可见性级,请搜索<NText code>api-extractor</NText>。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('stripInternal')">删除项目</NButton>
        <TsConfigLink type="button" name="stripInternal" />
      </template>
    </UCustomSwitchCard>
  </div>
</template>
