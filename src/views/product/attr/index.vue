<template>
  <div>
    <Category></Category>
    <el-card style="margin: 10px 0">
      <el-button
        :disabled="categoryStore.c3Id ? false : true"
        type="primary"
        size="default"
        icon="Plus"
        >添加属性</el-button
      >
      <el-table style="margin: 10px 0" border>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性名称" width="120px"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { watch } from "vue";
const categoryStore = useCategoryStore();
// 监听三级分类的id有变化就发送请求
watch(
  () => categoryStore.c3Id,
  () => {
    categoryStore.getAttrValue();
  }
);
</script>

<script lang="ts">
export default {
  name: "index",
};
</script>
<style lang="scss" scoped></style>
