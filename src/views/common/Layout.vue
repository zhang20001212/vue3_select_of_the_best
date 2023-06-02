<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header style="border-bottom: 1px #f5f6f9 solid">
          <TabBar></TabBar>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>底部区域</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/views/common/SideBar.vue";
import TabBar from "@/views/common/TabBar.vue";
</script>

<style scoped></style>
