<script setup lang="ts">
import { Class } from '@nailyjs/ioc'
import { NFormItem, NInput, NInputNumber } from 'naive-ui'
import { FormItemPropsMetadata, NumberPropsMetadata, NumberWatermark } from '../decorators'

export interface UNumberCardProps {
  formItemProps?: FormItemPropsMetadata
  propertyKey: string | symbol
  schema: Class
}

const props = defineProps<UNumberCardProps>()
const value = defineModel('value')

const numberPropsMetadata: NumberPropsMetadata[] = Reflect.getMetadata(NumberWatermark, props.schema) || []
const currentNumberPropsMetadata: NumberPropsMetadata = numberPropsMetadata.find(item => item.propertyKey === props.propertyKey) || {} as NumberPropsMetadata
</script>

<template>
  <NFormItem v-bind="formItemProps">
    <NInputNumber
      v-if="currentNumberPropsMetadata.role === 'input-number'"
      v-model:value="(value as number)"
      v-bind="currentNumberPropsMetadata"
    />
    <NInput
      v-else v-model:value="(value as string)"
      v-bind="currentNumberPropsMetadata"
    />
  </NFormItem>
</template>
