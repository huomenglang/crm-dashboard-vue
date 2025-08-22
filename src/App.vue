<script setup lang="ts">
//@ts-ignore
import AppLayout from './components/layout/AppLayout.vue';

</script>

<template>
    <AppLayout>
      <router-view />
      <slot />
    </AppLayout>
</template>
