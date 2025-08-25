

<script setup lang="ts">
import { ref } from 'vue';
import RoundButton from './RoundButton.vue';


// emits declaration
const emit = defineEmits<{
  (e: 'submit'): Promise<void> | void
}>()

// handler
const handleSubmit= async () => {
  loading.value = true
  try {
    // 🔹 Wait for parent to finish
    await emit('submit')
  } finally {
    loading.value = false
  }
}
const message=defineProps<{
  message?:string
}>()


const loading = ref<boolean>(false);
</script>

<template>
   <round-button :loading="loading" @click="handleSubmit">Login</round-button>
  
</template>
<style scoped>

</style>