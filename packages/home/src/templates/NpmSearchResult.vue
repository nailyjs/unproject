<script setup lang="tsx">
import { NEmpty, NPagination, NText, useMessage } from 'naive-ui'
import { PropType, ref, watch } from 'vue'
import { NpmSearchValueItem, useHomeController } from '../common'
import NpmSearchValueCard from './NpmSearchValueCard.vue'

const { searchSignal = 0 } = defineProps<{
  searchSignal: number
}>()
const message = useMessage()
const homeController = useHomeController()

const searching = defineModel('searching', {
  default: false,
  type: Boolean,
})
const searchValue = defineModel('searchValue', {
  default: '',
  type: String,
})
const searchSelectValue = defineModel<'npm' | 'taobao'>('searchSelectValue', {
  default: 'npm',
  type: String as PropType<'npm' | 'taobao'>,
})

const showEmpty = ref(false)
const page = ref(1)
const pageSize = ref(10)
const searchResult = ref<NpmSearchValueItem[]>([])

watch([page, pageSize], handleSearch)
watch(() => searchSignal, () => {
  page.value = 1
  pageSize.value = 10
  handleSearch()
})

function handleSearch() {
  searching.value = true
  homeController.search(searchSelectValue.value, searchValue.value, {
    from: (page.value - 1) * pageSize.value,
    size: pageSize.value,
  }).then((res) => {
    if (!Array.isArray(res)) {
      searchResult.value = []
      message.error(`搜索失败: ${res.message}`)
      return
    }
    searchResult.value = res as NpmSearchValueItem[]
  }).catch((err) => {
    searchResult.value = []
    message.error(`搜索失败: ${err.message}`)
  }).finally(() => {
    showEmpty.value = true
    searching.value = false
  })
}

const installing = defineModel('installing', {
  default: false,
  type: Boolean,
})
function handleInstall(name: Partial<NpmSearchValueItem>): void {
  installing.value = true
  homeController.installPackage(name.name)
    .finally(() => {
      message.success(`安装 ${name.name} 成功`)
      installing.value = false
    })
}
</script>

<template>
  <div>
    <div p10 flex flex-col gap-5>
      <NPagination
        v-if="searchResult.length > 0 && searchResult[0].type === 'npm'"
        v-model:page="page"
        v-model:page-size="pageSize"
        :item-count="searchResult[0].total"
        show-size-picker
      />
      <div v-for="(item, index) in searchResult" :key="index">
        <NpmSearchValueCard v-if="item.type === 'npm'" v-bind="item" :search-select-value="searchSelectValue" @install="handleInstall" />
      </div>
      <NPagination
        v-if="searchResult.length > 0 && searchResult[0].type === 'npm'"
        v-model:page="page"
        v-model:page-size="pageSize"
        :item-count="searchResult[0].total"
      />
    </div>
    <NEmpty v-if="showEmpty && searchResult.length === 0" />
    <div v-if="!showEmpty" text-center>
      <NText :depth="3">
        请输入搜索内容
      </NText>
    </div>
  </div>
</template>
