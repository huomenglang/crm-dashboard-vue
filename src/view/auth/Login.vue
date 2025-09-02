<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <a-card class="w-full max-w-md shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <a-form @submit.prevent="handleSubmit" layout="vertical">
        <a-form-item label="Username">
           <AntInput v-model:value="formState.username"  placeholder="Username" size="large" />
        </a-form-item>

        <a-form-item label="Password" class="!mb-2">
           <AntInput v-model:value="formState.password" placeholder="Password" size="large"  type="password"/>
        </a-form-item>
        <a-form-item>
          <!-- <a-button @submit="handleSubmit" class="w-full" > Submit </a-button> -->
           <Button @submit="handleSubmit" class="w-full">submit</Button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AntInput from "@/components/base/input/AntInput.vue";


const router = useRouter();
const auth = useAuthStore();

const formState = ref({
  username: "",
  password: "",
});
const loading = ref(false);

const handleSubmit = async () => {
  console.log("Submitting form with", formState.value);
  loading.value = true;

  try {
    // simulate delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { username, password } = formState.value;
    if (!username || !password) {
      message.error("Please fill in all fields.");
      return;
    }

    const user = await auth.login(username, password);
    if (user) {
      message.success("Login successful!");
      router.push("/dashboard");
    }
  } catch (err: any) {
    message.error(err.message || "Login failed");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
