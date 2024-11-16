<script setup lang="tsx">
import type { PackageJson } from 'type-fest'
import { NCard, NH1, NText } from 'naive-ui'
import { ref } from 'vue'
import { useHomeController } from '../common'
import BasicPackageCard from '../templates/BasicPackageCard.vue'

const homeController = useHomeController()

const packageJson = ref<PackageJson>({})
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
    <div mt10 grid grid-cols-1 md:grid-cols-2>
      <BasicPackageCard :package-json="packageJson" />
    </div>
  </div>
</template>
