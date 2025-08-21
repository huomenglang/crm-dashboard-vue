<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/Counter'
import { Button } from 'ant-design-vue';
defineProps<{ msg: string }>()

const count = ref(0)
const counter = useCounterStore()
</script>

<template>
  <h1>{{ msg }}</h1>
<Button @click="counter.increment()" class="bg-red-300">Count: {{ counter.count }}</Button>
</template>
