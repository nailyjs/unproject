<script setup lang="tsx">
import type { PackageJson } from 'type-fest'
import { NCard, NGi, NGrid, NH1, NText } from 'naive-ui'
import { ref } from 'vue'
import { useHomeController } from '../common'
import BasicPackageCard from '../templates/BasicPackageCard.vue'
import DepsTagCard from '../templates/DepsTagCard.vue'

const homeController = useHomeController()

const packageJson = ref<PackageJson | 'not-found'>({})
homeController.getPackageJson()
  .then(res => packageJson.value = res)
  .catch(err => console.error(err))
</script>

<template>
  <div p10>
    <NCard>
      <NH1>📦 欢迎使用unproject!</NH1>
      <NText>通过面板，快速管理、了解、熟悉当前项目✨</NText>
    </NCard>
    <NGrid mt5 cols="1 m:2" responsive="screen" :x-gap="15" :y-gap="15">
      <NGi v-if="typeof packageJson === 'object'">
        <BasicPackageCard :package-json="packageJson" />
      </NGi>
      <NGi v-if="typeof packageJson === 'object'">
        <DepsTagCard :package-json="packageJson" />
      </NGi>
    </NGrid>
  </div>
</template>
