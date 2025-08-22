<template>
  <a-layout class="h-screen">
    <AppSidebar v-model:collapsed="collapsed"/>
    <a-layout>
     <Header :collapsed="collapsed" @toggle="collapsed = !collapsed" />
      <Body>
        <!-- Your content goes here -->
        <router-view />
      </Body>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Header from './Header.vue';
import AppSidebar from './LayoutSidebar.vue';
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