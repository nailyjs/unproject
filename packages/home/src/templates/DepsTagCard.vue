<script setup lang="tsx">
import type { PackageJson } from 'type-fest'
import { NButton, NCard, NTag, NText } from 'naive-ui'
import IconTitle from './IconTitle.vue'

defineProps<{
  packageJson: PackageJson
}>()
</script>

<template>
  <NCard>
    <template #header>
      <IconTitle title="依赖" icon="i-vscode-icons-file-type-node" />
    </template>
    <template #header-extra>
      <NButton size="tiny" round type="info" @click="$router.push('/dashboard/dependencies')">
        查看详情
      </NButton>
    </template>

    <div mb0.5>
      <NText :depth="3">
        #
      </NText>
      Dependencies
    </div>
    <div flex flex-wrap gap-3>
      <NTag v-for="(item, name) in (packageJson.dependencies || {})" :key="name" type="success" size="small">
        {{ name }}@{{ item }}
      </NTag>
    </div>
    <NText v-if="!Object.keys(packageJson.dependencies || {}).length" :depth="3">
      无
    </NText>

    <div mb0.5 mt4>
      <NText :depth="3">
        #
      </NText>DevDependencies
    </div>
    <div flex flex-wrap gap-3>
      <NTag v-for="(item, name) in (packageJson.devDependencies || {})" :key="name" size="small" type="warning">
        {{ name }}@{{ item }}
      </NTag>
    </div>
    <NText v-if="!Object.keys(packageJson.devDependencies || {}).length" :depth="3">
      无
    </NText>

    <div mb0.5 mt4>
      <NText :depth="3">
        #
      </NText>PeerDependencies
    </div>
    <div flex flex-wrap gap-3>
      <NTag v-for="(item, name) in (packageJson.peerDependencies || {})" :key="name" type="error" size="small">
        {{ name }}@{{ item }}
      </NTag>
    </div>
    <NText v-if="!Object.keys(packageJson.peerDependencies || {}).length" :depth="3">
      无
    </NText>
  </NCard>
</template>
