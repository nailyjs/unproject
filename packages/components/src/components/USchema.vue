<script setup lang="ts">
import { Class } from '@nailyjs/ioc'
import { RULE_METADATA_WATERMARK, RuleMetadata } from '@nailyjs/zod'
import { z } from 'zod'
import { FormItemPropsMetadata, FormItemWatermark } from '../decorators'
import { useReflector } from '../utils/reflector'
import UNumberCard from './UNumberCard.vue'
import UStringCard from './UStringCard.vue'
import USwitchCard from './USwitchCard.vue'
import UUnionCard from './UUnionCard.vue'
import 'reflect-metadata'

const props = defineProps<{
  schema: Class
}>()

const reflector = useReflector(props.schema)

const metadata: RuleMetadata[] = Reflect.getMetadata(RULE_METADATA_WATERMARK, props.schema) || []
const formItemProps: FormItemPropsMetadata[] = Reflect.getMetadata(FormItemWatermark, props.schema) || []
const designTypes = reflector.getDesignTypes(metadata.map(rule => rule.propertyKey))

const value = defineModel('value', {
  type: Object,
  default: {},
})
</script>

<template>
  <div v-for="(rule, index) in metadata" :key="index">
    <UUnionCard
      v-if="(rule.schema instanceof z.ZodUnion)"
      v-model:value="value[rule.propertyKey]"
      :form-item-props="formItemProps.find(item => item.propertyKey === rule.propertyKey)"
      :property-key="rule.propertyKey"
      :schema="props.schema"
      :rule="rule"
    />
    <UStringCard
      v-else-if="(rule.schema instanceof z.ZodString) || (rule.schema instanceof z.ZodLiteral) || designTypes[rule.propertyKey] === String"
      v-model:value="value[rule.propertyKey]"
      :form-item-props="formItemProps.find(item => item.propertyKey === rule.propertyKey)"
      :property-key="rule.propertyKey"
    />
    <UNumberCard
      v-else-if="(rule.schema instanceof z.ZodNumber) || designTypes[rule.propertyKey] === Number"
      v-model:value="value[rule.propertyKey]"
      :form-item-props="formItemProps.find(item => item.propertyKey === rule.propertyKey)"
      :property-key="rule.propertyKey"
      :schema="props.schema"
    />
    <USwitchCard
      v-else-if="(rule.schema instanceof z.ZodBoolean) || designTypes[rule.propertyKey] === Boolean"
      v-model:value="value[rule.propertyKey]"
      :form-item-props="formItemProps.find(item => item.propertyKey === rule.propertyKey)"
      :property-key="rule.propertyKey"
      :schema="props.schema"
    />
  </div>
</template>
