<script setup lang="tsx">
import { Class } from '@nailyjs/ioc'
import { RuleMetadata } from '@nailyjs/zod'
import { NFormItem, NSelect } from 'naive-ui'
import { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { computed } from 'vue'
import { z } from 'zod'
import { FormItemPropsMetadata, UnionSelectPropsMetadata, UnionWatermark } from '../decorators'
import 'reflect-metadata'

export interface UUnionCardProps {
  formItemProps?: FormItemPropsMetadata
  propertyKey?: string | symbol
  placeholder?: string
  schema: Class
  rule: RuleMetadata
}

const props = defineProps<UUnionCardProps>()
const value = defineModel('value', {
  type: String,
})

const unionSelectPropsMetadata: UnionSelectPropsMetadata[] = Reflect.getMetadata(UnionWatermark, props.schema) || []
const currentUnionSelectPropsMetadata = unionSelectPropsMetadata.find(item => item.propertyKey === props.propertyKey)
const options = computed<SelectMixedOption[]>(() => {
  if (currentUnionSelectPropsMetadata && currentUnionSelectPropsMetadata.options) return currentUnionSelectPropsMetadata.options
  const ruleSchema = props.rule.schema as z.ZodUnion<z.ZodUnionOptions>
  return ruleSchema.options.map(option => ({
    label: option.description || option._def.typeName,
    value: option.description || option._def.typeName,
  }))
})
</script>

<template>
  <NFormItem v-bind="formItemProps">
    <NSelect v-model:value="value" :options="options" v-bind="currentUnionSelectPropsMetadata" />
  </NFormItem>
</template>
