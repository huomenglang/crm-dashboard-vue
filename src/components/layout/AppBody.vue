<template>
  <a-layout class="bg-gray-50">
    <a-layout class="px-3">
    
        <a-layout-content class="bg-white rounded-lg shadow-sm max-h-[92%] overflow-scroll mt-3 ">
        <ContentWrapper/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import ContentWrapper from './ContentWrapper.vue';
// Component accepts slot content

</script>

<style scoped>
:deep(.ant-breadcrumb) {
  font-size: 14px;
}

:deep(.ant-breadcrumb-link) {
  color: inherit !important;
}
</style>