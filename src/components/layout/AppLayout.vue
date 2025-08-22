<template>
  <a-layout class="h-screen">
    <AppSidebar v-model:collapsed="collapsed"/>
    <a-layout>
     <Header :collapsed="collapsed" @toggle="collapsed = !collapsed" />
      <Body/>
       
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
//@ts-ignore
import Header from './Header.vue';
//@ts-ignore
import AppSidebar from './LayoutSidebar.vue';
//@ts-ignore
import Body from './AppBody.vue';
import { ref } from 'vue';

 const collapsed = ref<boolean>(false);
 

</script>

<style>
/* Global styles if needed */
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>