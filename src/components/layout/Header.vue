<template>
  <a-layout-header class="!bg-white !pl-7 flex justify-between">
    <div class="flex items-center justify-between h-full">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger text-xl"
        @click="toggle"
      />
      <menu-fold-outlined v-else class="trigger text-xl" @click="toggle" />
    </div>

    
    <div class="flex items-center space-x-5">
      <div
        class="text-xl w-11 h-11 font-bold cursor-pointer hover:bg-gray-100 hover:rounded-full hover:shadow-2xl flex justify-center items-center"
      >
        <component :is="BellOutlined" class="!text-gray-500" />
      </div>
      <a-popover placement="bottomRight">
        <template #content>
          <a-menu
            v-for="item in profileMenus"
            :key="item.key"
            @click="handleMenuClick"
            class="!border-none"
          >
            <a-menu-item :key="item.key" class="!flex !items-center !space-x-2">
              <component :is="item.icons" class="!text-lg !text-gray-500 transform -translate-y-0.5" />
              <span class="text-gray-500">{{ item.title }}</span>
            </a-menu-item>
          </a-menu>
        </template>

        <template #title>
          <span>Admin Profile</span>
        </template>
        <span
          class="cursor-pointer bg-gray-200 w-11 h-11 rounded-full flex items-center justify-center shadow-2xl relative"
        >
          <span
            class="bg-green-600 border-2 border-white w-3 h-3 rounded-full absolute bottom-0 right-1"
          ></span>
          <a-avatar src="/public/assets/vue.svg" class="w-10 h-10" />
        </span>
      </a-popover>
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";

const collapsed = ref<boolean>(false);

interface DropdownProps {
  key: string;
  icons: any;
  title: string;
}
const profileMenus: DropdownProps[] = [
  {
    key: "1",
    icons: UserOutlined,
    title: "My Profile",
  },
  {
    key: "3",
    icons: PoweroffOutlined,
    title: "Logout",
  },
];

// const props = defineProps<{ collapsed: boolean }>();
const emit = defineEmits<{
  (e: "toggle"): void;
}>();

const toggle = () => {
  emit("toggle");
};

const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};
</script>

<style scoped>
/* :deep(.ant-menu-horizontal) {
  @apply !border-b-0;
}

:deep(.ant-menu-item) {
  @apply !mx-4;
}

:deep(.ant-menu-item-selected) {
  @apply !text-blue-600 !border-b-blue-600;
} */
</style>
