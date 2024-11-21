<script setup lang="ts">
import { USchema } from '@unproject/components'
import { darkTheme, NCard, NConfigProvider, NForm, NH1 } from 'naive-ui'
import { ref } from 'vue'
import { User } from './test.schema'

const result = ref({})
</script>

<template>
  <NConfigProvider p5 md:p20 lg:p30 :theme="darkTheme">
    <NH1>测试表单</NH1>
    <NCard mb10>
      {{ result }}
    </NCard>
    <NForm>
      <USchema v-model:value="result" :schema="User" />
    </NForm>
  </NConfigProvider>
</template>

<style>
html {
  background: black;
}
</style>
