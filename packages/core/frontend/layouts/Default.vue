<script setup lang="tsx">
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import { UFallback } from '@unproject/components'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { NLayout, NLayoutContent, NLayoutFooter, NLayoutSider, NMenu } from 'naive-ui'
import { provide, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { version } from '../../package.json'
import { isDark, toggleDark } from '../composables/dark'
import { useMenuOptions } from '../composables/menu'

const route = useRoute()
const footer = ref<HTMLElement | null>(null)
provide('unproject:layout-footer', footer)
const { height: footerHeight } = useElementSize(footer)
const cutPoint = ref(768)
provide('unproject:layout-cut-point', cutPoint)
const { width: windowWidth } = useWindowSize()
const load = useMenuOptions()
const options = ref<MenuMixedOption[]>(await load())
</script>

<template>
  <NLayout id="root" position="absolute" content-class="overflow-hidden">
    <img fixed left-0 top-0 w-100vw h-100vh op-3 z-2 pointer-events-none :class="route.matched[0].path === '/:pathMatch(.*)*' ? 'op-30' : ''" src="/assets/logo.svg">
    <NLayout
      z-1 has-sider :style="{ height: `calc(100vh - ${footerHeight + 1}px)` }"
    >
      <NLayoutSider
        bordered :show-trigger="windowWidth < cutPoint ? 'bar' : 'arrow-circle'"
        :collapse-mode="windowWidth < cutPoint ? 'transform' : 'width'"
        :position="windowWidth < cutPoint ? 'absolute' : 'static'"
        :collapsed-width="windowWidth < cutPoint ? 0 : undefined"
        :native-scrollbar="false"
        z-2
      >
        <NMenu :options="options" />
      </NLayoutSider>
      <NLayoutContent :native-scrollbar="false">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <KeepAlive>
              <Suspense>
                <!-- 主要内容 -->
                <component :is="Component" />
                <!-- 加载中状态 -->
                <template #fallback>
                  <UFallback :style="`height: calc(100vh - ${footerHeight + 1}px);background: var(--unproject-bg)`" z-999 src="/assets/logo.svg" loading="Loading dashboard..." />
                </template>
              </Suspense>
            </KeepAlive>
          </template>
        </RouterView>
      </NLayoutContent>
    </NLayout>
    <NLayoutFooter ref="footer" bordered flex items-center gap1 min-h-4>
      <div>unproject v{{ version }}</div>
      <div h-full cursor-pointer @click="toggleDark()">
        <div v-if="isDark" class="i-carbon-sun" />
        <div v-else class="i-carbon-moon" />
      </div>
    </NLayoutFooter>
  </NLayout>
</template>
