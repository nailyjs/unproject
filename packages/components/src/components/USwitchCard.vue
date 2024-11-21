<script setup lang="tsx">
import { Class } from '@nailyjs/ioc'
import { NFormItem, NSwitch } from 'naive-ui'
import { FormItemPropsMetadata } from '../decorators'
import 'reflect-metadata'

export interface USwitchCardProps {
  formItemProps?: FormItemPropsMetadata
  propertyKey?: string | symbol
  schema: Class
}

defineProps<USwitchCardProps>()
const value = defineModel('value', {
  type: String,
})
</script>

<template>
  <NFormItem v-bind="formItemProps">
    <NSwitch v-model:value="value" />
  </NFormItem>
</template>
