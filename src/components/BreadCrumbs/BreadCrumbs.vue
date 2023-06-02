<template>
  <el-breadcrumb separator-icon="ArrowRightBold">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title !== ''"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.matched);
</script>

<script lang="ts">
export default {
  name: "BreadCrumbs",
};
</script>
<style lang="scss" scoped></style>
