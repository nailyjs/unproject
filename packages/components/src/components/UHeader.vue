<script setup lang="tsx">
import { NH1, NLayoutHeader } from 'naive-ui'

defineProps<{
  /**
   * The title of the header.
   *
   * @requires
   */
  title: string
}>()
</script>

<template>
  <NLayoutHeader p5 sm:p10 class="pb0!" bordered>
    <div>
      <NH1>{{ title }}</NH1>
      <slot name="extra" />
    </div>
    <slot />
  </NLayoutHeader>
</template>

<style scoped>
@unocss;
</style>
