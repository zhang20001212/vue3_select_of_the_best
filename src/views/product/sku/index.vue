<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-table border stripe style="margin: 10px 0">
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        />
        <el-table-column
          label="名称"
          show-overflow-tooltip
          width="300"
        ></el-table-column>
        <el-table-column
          label="描述"
          show-overflow-tooltip
          width="300"
        ></el-table-column>
        <el-table-column
          label="默认图片"
          width="150px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="重量"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          label="价格"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="300"
          align="center"
          fixed="right"
        ></el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="400"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// 当前的页码
let pageNo = ref<number>(1);
// 一页展示多少条数据
let pageSize = ref<number>(10);
onMounted(() => {
  // 函数体
  
})
</script>

<script lang="ts">
export default {
  name: "index",
};
</script>
<style lang="scss" scoped></style>
