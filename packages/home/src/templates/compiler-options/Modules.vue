<script setup lang="tsx">
import { UCustomSwitchCard } from '@unproject/components'
import { useWindowSize } from '@vueuse/core'
import { NButton, NCard, NDynamicInput, NInput, NSelect, NText } from 'naive-ui'
import { CompilerOptions, ModuleKind, ModuleResolutionKind } from 'typescript'
import { PropType, ref, watch } from 'vue'
import TsConfigLink from '../../components/TsConfigLink.vue'

const windowSize = useWindowSize()

const compilerOptions = defineModel<CompilerOptions>('compilerOptions', {
  type: Object as PropType<CompilerOptions>,
  default: {} as CompilerOptions,
  required: true,
})

function deleteProperty(key: keyof CompilerOptions) {
  compilerOptions.value[key] = undefined
}

const moduleKindOptions = Object.keys(ModuleKind)
  .map(key => ({ label: key, value: key }))
  .filter(option => Number.isNaN(Number(option.value)))
const moduleResolutionOptions = Object.keys(ModuleResolutionKind)
  .map(key => ({ label: key, value: key }))
  .filter(option => Number.isNaN(Number(option.value)))

interface Path {
  key: string
  value: string[]
}
const paths = ref<Path[]>([])
watch(paths, (newPaths) => {
  compilerOptions.value.paths = Object.fromEntries(
    newPaths.map(({ key, value }) => [key, value]),
  )
}, { deep: true })
</script>

<template>
  <div grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5>
    <UCustomSwitchCard v-model:value="compilerOptions.allowArbitraryExtensions" title="allowArbitraryExtensions">
      <!-- eslint-disable-next-line -->
      <div>是否允许在导入语句中省略文件扩展名。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('allowArbitraryExtensions')">删除项目</NButton>
        <TsConfigLink type="button" name="allowArbitraryExtensions" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.allowImportingTsExtensions" title="allowImportingTsExtensions">
      <!-- eslint-disable-next-line -->
      <div>是否允许导入扩展名为<NText code>.ts</NText>和<NText code>.tsx</NText>的文件。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('allowImportingTsExtensions')">删除项目</NButton>
        <TsConfigLink type="button" name="allowImportingTsExtensions" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.allowUmdGlobalAccess" title="allowUmdGlobalAccess">
      <!-- eslint-disable-next-line -->
      <div>是否允许在全局作用域中访问UMD库。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('allowUmdGlobalAccess')">删除项目</NButton>
        <TsConfigLink type="button" name="allowUmdGlobalAccess" />
      </template>
    </UCustomSwitchCard>
    <NCard size="small" title="baseUrl">
      <div>指定解析非相对模块名称的基本目录。</div>
      <NInput v-model:value="compilerOptions.baseUrl" placeholder="输入基本目录..." mt1 size="small" />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('baseUrl')">删除项目</NButton>
          <TsConfigLink type="button" name="baseUrl" />
        </div>
      </template>
    </NCard>
    <NCard size="small" title="customConditions">
      <div>自定义条件。</div>
      <NSelect v-model:value="compilerOptions.customConditions" placeholder="添加自定义条件..." mt1 size="small" filterable multiple tag />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('customConditions')">删除项目</NButton>
          <TsConfigLink type="button" name="customConditions" />
        </div>
      </template>
    </NCard>
    <NCard size="small" title="module">
      <div>指定模块代码生成。</div>
      <NSelect v-model:value="compilerOptions.module" placeholder="选择模块代码生成..." mt1 size="small" :options="moduleKindOptions" />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('module')">删除项目</NButton>
          <TsConfigLink type="button" name="module" />
        </div>
      </template>
    </NCard>
    <NCard size="small" title="moduleResolution">
      <div>指定模块解析策略。</div>
      <NSelect v-model:value="compilerOptions.moduleResolution" placeholder="选择模块解析策略..." mt1 size="small" :options="moduleResolutionOptions" />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('moduleResolution')">删除项目</NButton>
          <TsConfigLink type="button" name="moduleResolution" />
        </div>
      </template>
    </NCard>
    <NCard size="small" title="moduleSuffixes">
      <div>指定模块后缀。</div>
      <NSelect v-model:value="compilerOptions.moduleSuffixes" placeholder="添加模块后缀..." mt1 size="small" filterable multiple tag />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('moduleSuffixes')">删除项目</NButton>
          <TsConfigLink type="button" name="moduleSuffixes" />
        </div>
      </template>
    </NCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noResolve" title="noResolve">
      <!-- eslint-disable-next-line -->
      <div>是否禁用解析。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noResolve')">删除项目</NButton>
        <TsConfigLink type="button" name="noResolve" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noUncheckedSideEffectImports" title="noUncheckedSideEffectImports">
      <!-- eslint-disable-next-line -->
      <div>是否禁用未检查的副作用导入。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noUncheckedSideEffectImports')">删除项目</NButton>
        <TsConfigLink type="button" name="noUncheckedSideEffectImports" />
      </template>
    </UCustomSwitchCard>
    <NCard size="small" title="paths" lg:col-span-2>
      <template #header-extra>
        指定路径映射。
      </template>
      <NDynamicInput v-model:value="paths" w-full :show-sort-button="windowSize.width.value > 540" @create="() => ({ key: '', value: '' })">
        <template #default="{ value }">
          <div flex flex-col gap-2 w-full>
            <NInput v-model:value="value.key" w-full placeholder="输入路径..." size="small" />
            <NSelect v-model:value="value.value" w-full placeholder="输入映射路径..." size="small" filterable multiple tag />
          </div>
        </template>
      </NDynamicInput>
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('paths')">删除项目</NButton>
          <TsConfigLink type="button" name="paths" />
        </div>
      </template>
    </NCard>
    <UCustomSwitchCard v-model:value="compilerOptions.resolveJsonModule" title="resolveJsonModule">
      <!-- eslint-disable-next-line -->
      <div>是否解析JSON模块。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('resolveJsonModule')">删除项目</NButton>
        <TsConfigLink type="button" name="resolveJsonModule" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.resolvePackageJsonExports" title="resolvePackageJsonExports">
      <!-- eslint-disable-next-line -->
      <div>是否解析package.json的exports字段。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('resolvePackageJsonExports')">删除项目</NButton>
        <TsConfigLink type="button" name="resolvePackageJsonExports" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.resolvePackageJsonImports" title="resolvePackageJsonImports">
      <!-- eslint-disable-next-line -->
      <div>是否解析package.json的imports字段。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('resolvePackageJsonImports')">删除项目</NButton>
        <TsConfigLink type="button" name="resolvePackageJsonImports" />
      </template>
    </UCustomSwitchCard>
    <NCard size="small" title="rootDir">
      <div>指定根目录。</div>
      <NInput v-model:value="compilerOptions.rootDir" placeholder="输入根目录..." mt1 size="small" />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('rootDir')">删除项目</NButton>
          <TsConfigLink type="button" name="rootDir" />
        </div>
      </template>
    </NCard>
    <NCard size="small" title="rootDirs">
      <div>指定根目录列表。</div>
      <NSelect v-model:value="compilerOptions.rootDirs" placeholder="添加根目录..." mt1 size="small" filterable multiple tag />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('rootDirs')">删除项目</NButton>
          <TsConfigLink type="button" name="rootDirs" />
        </div>
      </template>
    </NCard>
    <NCard size="small" title="typeRoots">
      <div>指定类型定义根路径。</div>
      <NSelect v-model:value="compilerOptions.typeRoots" placeholder="添加类型定义根路径..." mt1 size="small" filterable multiple tag />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('typeRoots')">删除项目</NButton>
          <TsConfigLink type="button" name="typeRoots" />
        </div>
      </template>
    </NCard>
    <NCard size="small" title="types">
      <div>指定类型声明文件。</div>
      <NSelect v-model:value="compilerOptions.types" placeholder="添加类型声明文件..." mt1 size="small" filterable multiple tag />
      <template #action>
        <div flex items-center gap-3>
          <!-- eslint-disable-next-line -->
          <NButton size="tiny" type="error" @click="deleteProperty('types')">删除项目</NButton>
          <TsConfigLink type="button" name="types" />
        </div>
      </template>
    </NCard>
  </div>
</template>
