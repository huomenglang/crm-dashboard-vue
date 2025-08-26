<template>
  <a-layout-sider
    width="16%"
    class="!bg-white h-screen"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo text-center py-5">
      <span class="text-sky-600 font-bold text-[17px]">
        CRM
        <span
          v-if="!collapsed"
          class="transition ease-in-out duration-300"
        >
          Dashboard
        </span>
      </span>
    </div>

    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      @click="handleMenuClick"
      mode="inline"
      class="!border-none !bg-inherit"
    >
      <template v-for="menuItem in menuData" :key="menuItem.key">
        <!-- Sub-menu with children -->
        <a-sub-menu :key="`sub-${menuItem.key}`" v-if="menuItem.children">
          <template #title>
            <span
              class="flex items-center"
              :class="{
                '!text-sky-600 font-semibold':
                  menuItem.children.some((key: ItemMenuProps) => key.key === selectedKeys[0]), // active
                'text-gray-700': !selectedKeys.some((key: any) => key === menuItem.key) // inactive
              }"
            >
              <component :is="menuItem.icon" class="mr-2 "  />
              <span >{{ menuItem.title }}</span>
            </span>
          </template>

          <a-menu-item
            v-for="child in menuItem.children"
            :key="child.key"
            class="text-gray-600"
          >
            <span
              class="flex items-center"
              :class="{
                'text-sky-600 font-medium':
                  selectedKeys.includes(child.key), // child active
                'text-gray-700': !selectedKeys.includes(child.key)
              }"
            >
              <component :is="child.icon" class="mr-2" />
              <span>{{ child.title }}</span>
            </span>
          </a-menu-item>
        </a-sub-menu>

        <!-- Regular menu item -->
        <a-menu-item :key="`item-${menuItem.key}`" v-else>
          <span
            class="flex items-center"
            :class="{
              'text-sky-600 font-medium':
                selectedKeys.includes(`item-${menuItem.key}`)
            }"
          >
            <component :is="menuItem.icon" class="mr-2" />
            <span>{{ menuItem.title }}</span>
          </span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { menuData, type ItemMenuProps } from "../../constant/mock_data"; // Adjust path as needed
import { useRouter } from "vue-router";


const selectedKeys = ref<string[]>(["dashboard"]);
const openKeys = ref<string[]>(["customers"]);
const collapsed = defineModel<boolean>("collapsed", { default: false });
const route=useRouter();

const handleMenuClick = (item:any) => {
 let key=''
 if(item.key){
   key=item.key.replace('item-','')
 }

  console.log("Menu item clicked:", item);
  route.push(key);
};
</script>
