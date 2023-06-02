<template>
  <div>
    <el-card>
      <el-form ref="form" :inline="true" size="normal">
        <el-form-item label="一级分类">
          <el-select v-model="c1Id">
            <el-option
              v-for="categoryFirstItem in categoryOfFirstOrder"
              :key="categoryFirstItem.id"
              :label="categoryFirstItem.name"
              :value="categoryFirstItem.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select>
            <el-option label="北京"></el-option>
            <el-option label="上海"></el-option>
            <el-option label="深圳"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select>
            <el-option label="北京"></el-option>
            <el-option label="上海"></el-option>
            <el-option label="深圳"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqGetCategory1 } from "@/api/product/attr";
import { onMounted, ref } from "vue";
// 一级分类的所有属性
let categoryOfFirstOrder = ref<any>([]);
// 一级分类中所选的id
const c1Id = ref<number>();

/**
 * 获取一级分类所有属性方法
 */
async function handleGetCategoryFirst() {
  const result: any = await reqGetCategory1();
  if (result.code === 200) {
    categoryOfFirstOrder.value = result.data;
  }
}
// 组件挂载完毕初次获取一级分类所有的属性
onMounted(() => {
  // 进行获取一级分类属性的网络请求
  handleGetCategoryFirst();
});
</script>

<script lang="ts">
export default {
  name: "Category",
};
</script>
<style lang="scss" scoped></style>
