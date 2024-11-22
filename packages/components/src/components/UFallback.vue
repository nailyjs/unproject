<script lang="ts" setup>
defineProps<{
  /**
   * The loading text.
   *
   * @default 'Loading unproject...'
   */
  loading?: string
  /**
   * The image source.
   *
   * @requires
   */
  src: string
}>()
</script>

<template>
  <div flex flex-col justify-center items-center class="loading">
    <img :src="src">
    {{ loading || 'Loading unproject...' }}
  </div>
</template>

<style scoped>
@unocss;

@keyframes blink {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.loading {
  animation: blink 1s infinite;
}
</style>
