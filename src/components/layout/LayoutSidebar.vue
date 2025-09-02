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
    mode="inline"
    theme="light"
    :class="['custom-menu']"
  >
    <template v-for="item in menuData" :key="item.key">
      <!-- Single menu items -->
      <a-menu-item 
        v-if="!item.children" 
        :key="`sub-${item.key}`"
        :class="{ 'selected-menu-item': isMenuItemActive(item) }"
      >
        <template #icon>
          <component :is="item.icon" />
        </template>
        <router-link :to="generatePath(item.path!)">
          {{ item.title }}
        </router-link>
      </a-menu-item>

      <!-- Submenu (only for Reports) -->
      <a-sub-menu 
        v-else 
        :key="item.key"
        :class="{ 'selected-submenu': isSubmenuActive(item) }"
      >
        <template #icon>
          <component :is="item.icon" />
        </template>
        <template #title>
          <span :class="{ 'selected-submenu-title': isSubmenuActive(item) }">
            {{ item.title }}
          </span>
        </template>
        <a-menu-item 
          v-for="child in item.children" 
          :key="child.key"
          :class="{ 'selected-menu-item': isChildMenuItemActive(child) }"
        >
          <template #icon>
            <component :is="child.icon" />
          </template>
          <router-link :to="generatePath(child.path!)">
            {{ child.title }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>


  <!-- <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      @click="handleMenuClick"
      mode="inline"
      class="!border-none !bg-inherit"
    >
      <template v-for="menuItem in menuData" :key="menuItem.key">
       
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
    </a-menu> -->
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { generatePath, isMenuActive, menuData, type ItemMenuProps } from "@/router/menu"; // Adjust path as needed
import { useRoute } from "vue-router";


// const selectedKeys = ref<string[]>(["dashboard"]);
// const openKeys = ref<string[]>(["customers"]);
const collapsed = defineModel<boolean>("collapsed", { default: false });


const handleMenuClick = (item:any) => {
 let key=''
 if(item.key){
   key=item.key.replace('item-','')
 }

  console.log("Menu item clicked:", item);
  // route.push(key);
};


const route = useRoute();
const openKeys = ref<string[]>([]);

// Auto-open reports submenu when on reports pages
watch(() => route.path, (newPath) => {
  if (newPath.includes('/reports')) {
    openKeys.value = ['reports'];
  } else {
    openKeys.value = [];
  }
}, { immediate: true });

// Set selected menu item based on current route
const selectedKeys = computed(() => {
  const keys: string[] = [];
  
  menuData.forEach(item => {
    if (isMenuItemActive(item)) {
      keys.push(item.key);
    }
    
    if (item.children) {
      const activeChild = item.children.find(child => isChildMenuItemActive(child));
      if (activeChild) {
        keys.push(activeChild.key);
      }
    }
  });
  
  return keys;
});

// Check if a main menu item is active
const isMenuItemActive = (item: any): boolean => {
  return item.path ? isMenuActive(route.path, item.path) : false;
};

// Check if a submenu is active (has active children)
const isSubmenuActive = (item: any): boolean => {
  return item.children ? item.children.some((child: any) => isChildMenuItemActive(child)) : false;
};

// Check if a child menu item is active
const isChildMenuItemActive = (child: any): boolean => {
  return child.path ? isMenuActive(route.path, child.path) : false;
};
</script>
<style scoped>
/* Custom styles for selected menu items */
:deep(.ant-menu-dark .ant-menu-item-selected),
:deep(.ant-menu-dark .ant-menu-item-selected:hover) {
  background-color: rgb(8 145 178) !important; /* bg-cyan-600 */
  font-weight: bold !important;
}

:deep(.ant-menu-dark .ant-menu-item-selected .ant-menu-title-content a),
:deep(.ant-menu-dark .ant-menu-item-selected .ant-menu-title-content) {
  color: white !important;
  font-weight: bold !important;
}

/* Style for selected submenu title */
.selected-submenu-title {
  color: white !important;
  font-weight: bold !important;
}

/* Style for submenu when active */
:deep(.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title) {
  color: white !important;
}

:deep(.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title:hover) {
  color: white !important;
}

/* Ensure icons are visible in submenu items */
:deep(.ant-menu-item .ant-menu-item-icon) {
  font-size: 16px;
  margin-right: 8px;
}

:deep(.ant-menu-submenu .ant-menu-item-icon) {
  font-size: 16px;
  margin-right: 8px;
}

/* Custom menu styling */
.custom-menu {
  border-right: none;
}

/* Hover effects */
:deep(.ant-menu-dark .ant-menu-item:hover),
:deep(.ant-menu-dark .ant-menu-submenu-title:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
