<template>
  <a-layout class="bg-gray-50">
    <a-layout class="px-7">
      <a-breadcrumb class="!py-4">
        <a-breadcrumb-item class="text-gray-500">Home</a-breadcrumb-item>
        <a-breadcrumb-item class="text-gray-500">List</a-breadcrumb-item>
        <a-breadcrumb-item class="text-gray-700 font-medium">App</a-breadcrumb-item>
      </a-breadcrumb>
        <a-layout-content class="bg-white rounded-lg shadow-sm p-6 max-h-[92%] overflow-scroll ">
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