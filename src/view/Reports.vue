<template>
  <div>
    <h1>Reports Customer {{ customerId }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

  const router=useRoute();
  const customerId=router.params.customerId;

</script>
