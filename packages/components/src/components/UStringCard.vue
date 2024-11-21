<script setup lang="tsx">
import { NFormItem, NInput } from 'naive-ui'
import { FormItemPropsMetadata } from '../decorators'
import 'reflect-metadata'

export interface UStringCardProps {
  formItemProps?: FormItemPropsMetadata
  propertyKey?: string | symbol
}

defineProps<UStringCardProps>()
const value = defineModel('value', {
  type: String,
})
</script>

<template>
  <NFormItem v-bind="formItemProps">
    <NInput v-model:value="value" />
  </NFormItem>
</template>
