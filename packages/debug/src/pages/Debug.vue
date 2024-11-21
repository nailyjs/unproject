<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import { NH1, NLayoutHeader, NTab, NTabs } from 'naive-ui'
import { inject, ref } from 'vue'

const currentTab = ref('inspect')

const header = ref<HTMLElement | null>(null)
const footer = inject<HTMLElement | null>('unproject:layout-footer')
const { height: HeaderHeight } = useElementBounding(header)
const { height: FooterHeight } = useElementBounding(footer)
</script>

<template>
  <div>
    <NLayoutHeader ref="header" p5 sm:p10 class="pb0!" bordered>
      <NH1>Debug</NH1>
      <NTabs v-model:value="currentTab" size="large">
        <NTab name="inspect">
          <div flex items-center gap-1>
            <div class="i-vscode-icons-file-type-vite" />
            <div>Inspect</div>
          </div>
        </NTab>
      </NTabs>
    </NLayoutHeader>

    <iframe src="/__inspect" :style="{ height: `calc(100vh - ${HeaderHeight + FooterHeight}px)` }" w-full border-none />
  </div>
</template>
