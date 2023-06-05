<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :visibility="visibility"></Category>
    <!-- Card -->
    <el-card shadow="always" style="margin: 10px 0">
      <el-button type="primary" size="default" icon="Plus">添加SPU</el-button>
      <el-table border stripe style="margin: 10px 0">
        <el-table-column
          type="index"
          width="80"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU名称" prop=""> </el-table-column>
        <el-table-column label="SPU描述" prop=""> </el-table-column>
        <el-table-column label="操作" prop=""> </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev,pager,next,jumper,->,sizes,total"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 控制三级联动分类组件是否禁用 0->可使用 1->禁用
let visibility = ref<number>(0);
// 分页器默认页码
let pageNo = ref<number>(1);
// 每一页所展示多少条数据
let pageSize = ref<number>(3);
/**
 * pagination中的size-change的方法回调
 */
const handleSizeChange = () => {};
/**
 * pagination中的current-change的方法回调
 */
const handleCurrentChange = () => {};
</script>
<script lang="ts">
export default {
  name: "index",
};
</script>
<style lang="scss" scoped></style>
