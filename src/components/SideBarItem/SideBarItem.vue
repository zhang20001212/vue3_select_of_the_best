<template>
  <div class="container">
    <div v-for="(item, index) in routes" :key="index">
      <template v-if="item && !item.children">
        <el-menu-item :index="item.name" :route="{ name: item.name }">
          <template #title>
            {{ item.meta.title }}
          </template>
          <el-icon> <component :is="item.meta.icon"></component> </el-icon>
        </el-menu-item>
      </template>
      <template v-if="item && item.children">
        <el-sub-menu :index="item.name">
          <template #title>
            <el-icon> <component :is="item.meta.icon"></component> </el-icon>
            {{ item.meta.title }}
          </template>
          <SideBarItem :routes="item.children"></SideBarItem>
        </el-sub-menu>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["routes"]);
</script>

<style scoped lang="scss"></style>
