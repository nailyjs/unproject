<script setup lang="ts">
import { UCustomSwitchCard } from '@unproject/components'
import { NButton, NText } from 'naive-ui'
import { CompilerOptions } from 'typescript'
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
</script>

<template>
  <div grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5>
    <UCustomSwitchCard v-model:value="compilerOptions.allowUnreachableCode" title="allowUnreachableCode">
      <!-- eslint-disable-next-line -->
      <div>是否允许<NText code>return</NText>、<NText code>continue</NText>、<NText code>break</NText>和<NText code>throw</NText>语句后的不可到达代码。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('allowUnreachableCode')">删除项目</NButton>
        <TsConfigLink type="button" name="allowUnreachableCode" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.allowUnusedLabels" title="allowUnusedLabels">
      <!-- eslint-disable-next-line -->
      <div>是否允许未使用的标签语句。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('allowUnusedLabels')">删除项目</NButton>
        <TsConfigLink type="button" name="allowUnusedLabels" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.alwaysStrict" title="alwaysStrict">
      <!-- eslint-disable-next-line -->
      <div>是否始终以严格模式解析和编译代码。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('alwaysStrict')">删除项目</NButton>
        <TsConfigLink type="button" name="alwaysStrict" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.exactOptionalPropertyTypes" title="exactOptionalPropertyTypes">
      <!-- eslint-disable-next-line -->
      <div>是否启用严格的可选属性<NText code>?.</NText>类型。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('exactOptionalPropertyTypes')">删除项目</NButton>
        <TsConfigLink type="button" name="exactOptionalPropertyTypes" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noFallthroughCasesInSwitch" title="noFallthroughCasesInSwitch">
      <!-- eslint-disable-next-line -->
      <div>是否启用在<NText code>switch</NText>语句中检测不可到达的<NText code>case</NText>子句。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noFallthroughCasesInSwitch')">删除项目</NButton>
        <TsConfigLink type="button" name="noFallthroughCasesInSwitch" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noImplicitAny" title="noImplicitAny">
      <!-- eslint-disable-next-line -->
      <div>是否启用隐式的任意类型。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noImplicitAny')">删除项目</NButton>
        <TsConfigLink type="button" name="noImplicitAny" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noImplicitOverride" title="noImplicitOverride">
      <!-- eslint-disable-next-line -->
      <div>是否启用在派生类中检测覆盖的方法的类型。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noImplicitOverride')">删除项目</NButton>
        <TsConfigLink type="button" name="noImplicitOverride" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noImplicitReturns" title="noImplicitReturns">
      <!-- eslint-disable-next-line -->
      <div>是否启用在函数中检测缺少的返回语句。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noImplicitReturns')">删除项目</NButton>
        <TsConfigLink type="button" name="noImplicitReturns" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noImplicitThis" title="noImplicitThis">
      <!-- eslint-disable-next-line -->
      <div>是否启用在函数中检测<NText code>this</NText>表达式的类型。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noImplicitThis')">删除项目</NButton>
        <TsConfigLink type="button" name="noImplicitThis" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noPropertyAccessFromIndexSignature" title="noPropertyAccessFromIndexSignature">
      <!-- eslint-disable-next-line -->
      <div>是否启用在索引签名中禁止使用字符串索引访问属性。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noPropertyAccessFromIndexSignature')">删除项目</NButton>
        <TsConfigLink type="button" name="noPropertyAccessFromIndexSignature" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noUncheckedIndexedAccess" title="noUncheckedIndexedAccess">
      <!-- eslint-disable-next-line -->
      <div>是否启用在索引访问表达式中检测未定义的值。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noUncheckedIndexedAccess')">删除项目</NButton>
        <TsConfigLink type="button" name="noUncheckedIndexedAccess" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noUnusedLocals" title="noUnusedLocals">
      <!-- eslint-disable-next-line -->
      <div>是否启用在函数中检测未使用的局部变量。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noUnusedLocals')">删除项目</NButton>
        <TsConfigLink type="button" name="noUnusedLocals" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.noUnusedParameters" title="noUnusedParameters">
      <!-- eslint-disable-next-line -->
      <div>是否启用在函数中检测未使用的参数。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('noUnusedParameters')">删除项目</NButton>
        <TsConfigLink type="button" name="noUnusedParameters" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.strict" title="strict">
      <!-- eslint-disable-next-line -->
      <div>是否启用所有严格类型检查选项。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('strict')">删除项目</NButton>
        <TsConfigLink type="button" name="strict" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.strictBindCallApply" title="strictBindCallApply">
      <!-- eslint-disable-next-line -->
      <div>是否启用在函数中检测<NText code>bind</NText>、<NText code>call</NText>和<NText code>apply</NText>方法的严格类型检查。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('strictBindCallApply')">删除项目</NButton>
        <TsConfigLink type="button" name="strictBindCallApply" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.strictBuiltinIteratorReturn" title="strictBuiltinIteratorReturn">
      <!-- eslint-disable-next-line -->
      <div>是否启用在迭代器中检测内置方法的返回类型。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('strictBuiltinIteratorReturn')">删除项目</NButton>
        <TsConfigLink type="button" name="strictBuiltinIteratorReturn" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.strictFunctionTypes" title="strictFunctionTypes">
      <!-- eslint-disable-next-line -->
      <div>是否启用在函数中检测函数类型的严格类型检查。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('strictFunctionTypes')">删除项目</NButton>
        <TsConfigLink type="button" name="strictFunctionTypes" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.strictNullChecks" title="strictNullChecks">
      <!-- eslint-disable-next-line -->
      <div>是否启用在函数中检测<NText code>null</NText>和<NText code>undefined</NText>的严格类型检查。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('strictNullChecks')">删除项目</NButton>
        <TsConfigLink type="button" name="strictNullChecks" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.strictPropertyInitialization" title="strictPropertyInitialization">
      <!-- eslint-disable-next-line -->
      <div>是否启用在类中检测属性初始化的严格类型检查。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('strictPropertyInitialization')">删除项目</NButton>
        <TsConfigLink type="button" name="strictPropertyInitialization" />
      </template>
    </UCustomSwitchCard>
    <UCustomSwitchCard v-model:value="compilerOptions.useUnknownInCatchVariables" title="useUnknownInCatchVariables">
      <!-- eslint-disable-next-line -->
      <div>是否启用在捕获变量中使用未知类型。</div>
      <template #action>
        <!-- eslint-disable-next-line -->
        <NButton size="tiny" type="error" @click="deleteProperty('useUnknownInCatchVariables')">删除项目</NButton>
        <TsConfigLink type="button" name="useUnknownInCatchVariables" />
      </template>
    </UCustomSwitchCard>
  </div>
</template>
