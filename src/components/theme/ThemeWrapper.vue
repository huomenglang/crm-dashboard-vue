<script setup lang="ts">
import { ConfigProvider, theme as antdTheme } from 'ant-design-vue'
import { ref, computed } from 'vue'

// Toggle dark/light mode if needed
const isDark = ref(false)

// Ant Design theme configuration
const themeConfig = computed(() => ({
  token: {
    colorPrimary: '#27aae0', // Primary color
  },
  algorithm: isDark.value ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
}))

// Optional: toggle dark mode
// function toggleDark() {
//   isDark.value = !isDark.value
// }
</script>

<template>
  <div
    :class="[
      isDark ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900',
      'w-full h-full transition-colors duration-300'
    ]"
  >
    <ConfigProvider :theme="themeConfig">
      <!-- App content goes here -->
      <slot />
    </ConfigProvider>
  </div>
</template>
