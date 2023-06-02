<template>
  <div class="page">
    <Logo></Logo>
    <el-scrollbar class="page__scroll">
      <el-menu
        class="menu"
        mode="vertical"
        :router="true"
        :unique-opened="true"
        :default-active="$route.name"
      >
        <SideBarItem :routes="routes"></SideBarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/components/Logo/Logo.vue";
import SideBarItem from "@/components/SideBarItem/SideBarItem.vue";
import { useUserStore } from "@/store/modules/user";
const routes = useUserStore().menuRoutes;
</script>

<style scoped lang="scss">
.page__scroll {
  height: calc(100vh - 60px);
  overflow: hidden;
  .menu {
    height: 100vh;
    overflow: hidden;
  }
}
</style>
