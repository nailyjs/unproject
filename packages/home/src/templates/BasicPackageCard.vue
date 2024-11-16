<script setup lang="tsx">
import type { PackageJson } from 'type-fest'
import { NCard, NTable, NTag, NText } from 'naive-ui'
import IconTitle from './IconTitle.vue'
import TinySettingButton from './TinySettingButton.vue'

defineProps<{
  packageJson: PackageJson
}>()
</script>

<template>
  <NCard>
    <template #header-extra>
      <NText :depth="3">
        信息来自 package.json
      </NText>
    </template>
    <template #header>
      <IconTitle title="基础信息" icon="i-vscode-icons-file-type-node" />
    </template>
    <NTable bordered>
      <thead>
        <tr>
          <th>项目</th>
          <th>内容</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>项目名称</td>
          <td flex items-center gap-2>
            <span v-if="packageJson.name">
              {{ packageJson.name }}
            </span>
            <NText v-else type="error">
              未设置项目名称
            </NText>
            <TinySettingButton />
          </td>
        </tr>
        <tr>
          <td>版本号</td>
          <td flex items-center gap-2>
            <span v-if="packageJson.version">
              {{ packageJson.version }}
            </span>
            <NText v-else type="error">
              未设置版本号
            </NText>
            <TinySettingButton />
          </td>
        </tr>
        <tr>
          <td>描述</td>
          <td flex items-center gap-2>
            <span v-if="packageJson.description">
              {{ packageJson.description }}
            </span>
            <NText v-else type="error">
              未设置描述
            </NText>
            <TinySettingButton />
          </td>
        </tr>
        <tr>
          <td>作者</td>
          <td flex items-center gap-2>
            <span v-if="packageJson.author">
              {{ packageJson.author }}
            </span>
            <NText v-else type="error">
              未设置作者
            </NText>
            <TinySettingButton />
          </td>
        </tr>
        <tr>
          <td>许可证</td>
          <td flex items-center gap-2>
            <span v-if="packageJson.license">
              {{ packageJson.license }}
            </span>
            <NText v-else type="error">
              未设置许可证
            </NText>
            <TinySettingButton />
          </td>
        </tr>
        <tr>
          <td>仓库信息</td>
          <td flex items-center gap-2>
            <span v-if="packageJson.repository">
              {{ packageJson.repository }}
            </span>
            <NText v-else type="error">
              未设置仓库信息
            </NText>
            <TinySettingButton />
          </td>
        </tr>
        <tr>
          <td>包管理器</td>
          <td flex items-center gap-2>
            <span v-if="packageJson.packageManager">
              {{ packageJson.packageManager }}
            </span>
            <NText v-else type="error">
              未设置包管理器
            </NText>
            <TinySettingButton />
          </td>
        </tr>
        <tr>
          <td>引擎</td>
          <td flex items-center gap-2>
            <span v-if="Object.keys(packageJson.engines || {}).length === 0">
              <NText type="error">未设置引擎</NText>
            </span>
            <span v-else>
              <NTag v-for="(value, key) in packageJson.engines" :key="key" type="success">
                {{ key }}: {{ value }}
              </NTag>
            </span>
            <TinySettingButton />
          </td>
        </tr>
      </tbody>
    </NTable>
  </NCard>
</template>
