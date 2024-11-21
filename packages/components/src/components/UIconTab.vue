<script setup lang="tsx">
defineProps<{
  /**
   * The icon of the tab.
   *
   * @requires
   */
  icon: string
}>()
</script>

<template>
  <div class="flex items-center gap-1">
    <div :class="icon" />
    <div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
@unocss;
</style>
