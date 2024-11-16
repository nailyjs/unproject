<script setup lang="ts">
import { createAxiosClient } from '@nailyjs/rpc/axios'
import { WelcomeController } from '../common/welcome.protocol'

createAxiosClient({ urlOrAxiosInstance: '/rpc', ssr: false })
  .request<WelcomeController>(WelcomeController)
  .sayHello()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })
</script>

<template>
  <div>Hello test page~</div>
</template>
