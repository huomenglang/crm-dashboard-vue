
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
//@ts-ignore
import AppLayout from './components/layout/AppLayout.vue'

const route = useRoute()

const layout = computed(() => {
  return route.meta.layout === false ? 'div' : AppLayout
})
</script>
