<script setup lang="ts">
import { NSpin } from 'naive-ui'
import { ref } from 'vue'
import MarketHeader from '../templates/MarketHeader.vue'
import NpmSearchResult from '../templates/NpmSearchResult.vue'

const tabType = ref<'market' | 'plugin' | '本地'>('market')

const searchSelectValue = ref<'npm' | 'taobao' | 'github'>('npm')
const searchValue = ref<string>('')
const searching = ref(false)
const installing = ref(false)
const searchSignal = ref(0)

function handleSearch() {
  searching.value = true
  if (searchSelectValue.value !== 'github')
    searchSignal.value++
}
</script>

<template>
  <div>
    <MarketHeader
      v-model:search-select-value="searchSelectValue"
      v-model:search-value="searchValue"
      v-model:searching="searching"
      v-model="tabType"
      @search="handleSearch"
    />
    <NSpin v-show="tabType === 'market'" :show="searching || installing" :description="searching ? `正在搜索中...` : `正在安装中...`">
      <NpmSearchResult
        v-if="searchSelectValue !== 'github'"
        v-model:search-value="searchValue"
        v-model:searching="searching"
        v-model:installing="installing"
        v-model:search-select-value="searchSelectValue"
        :search-signal="searchSignal"
      />
    </NSpin>
  </div>
</template>
