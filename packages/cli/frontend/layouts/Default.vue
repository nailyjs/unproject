<script setup lang="tsx">
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import { useElementSize } from '@vueuse/core'
import { NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader, NLayoutSider, NMenu } from 'naive-ui'
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useMenuOptions } from '../composables/menu'

const header = ref<HTMLElement | null>(null)
provide('uncli:layout-header', header)
const footer = ref<HTMLElement | null>(null)
provide('uncli:layout-footer', footer)
const { height: headerHeight } = useElementSize(header)
const { height: footerHeight } = useElementSize(footer)
const load = await useMenuOptions()

const options = ref<MenuMixedOption[]>(await load())
</script>

<template>
  <NLayout position="absolute" content-class="overflow-hidden">
    <NLayoutHeader ref="header" bordered>
      uncli
    </NLayoutHeader>
    <NLayout has-sider :style="{ height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)` }">
      <NLayoutSider bordered show-trigger="arrow-circle">
        <NMenu :options="options" />
      </NLayoutSider>
      <NLayoutContent>
        <RouterView />
      </NLayoutContent>
    </NLayout>
    <NLayoutFooter ref="footer" bordered>
      Footer
    </NLayoutFooter>
  </NLayout>
</template>
