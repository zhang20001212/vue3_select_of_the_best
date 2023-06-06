<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :visibility="visibility"></Category>
    <!-- Card -->
    <el-card shadow="always" style="margin: 10px 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
        >添加SPU</el-button
      >
      <el-table :data="records" border stripe style="margin: 10px 0">
        <el-table-column
          type="index"
          width="80"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"> </el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              title="添加SKU"
            ></el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              title="修改SPU"
            ></el-button>
            <el-button
              type="info"
              size="small"
              icon="View"
              title="查看SKU已有列表"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              title="删除SPU"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev,pager,next,jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getSpuList"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqGetSpu } from "@/api/product/spu";
import { SpuItem } from "@/api/product/spu/types";
import useCategoryStore from "@/store/modules/category";
import { ref, watch } from "vue";
// 控制三级联动分类组件是否禁用 0->可使用 1->禁用
let visibility = ref<number>(0);
// 分页器默认页码
let pageNo = ref<number>(1);
// 每一页所展示多少条数据
let pageSize = ref<number>(3);
// 总条数
let total = ref<number>(0);
// 引入分类小仓库
let categoryStore = useCategoryStore();
// 响应式数据records
let records = ref<Array<SpuItem>>([]);
/**
 * 获取Spu方法
 */
async function getSpuList(pager: number = 1) {
  // 如果页码没有变的情况的下，默认是第一页
  pageNo.value = pager;
  // 进行网络请求
  const result = await reqGetSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id
  );
  // 返回的为一个Promise可以then()catch(),try{}catch{},await的方式进行获取
  if (result.code === 200) {
    // 如果成功获取，对records的响应式数据进行赋值
    records.value = result.data.records;
    total.value = result.data.total;
  }
}

/**
 * pagination的size-change的方法回调
 */
const handleSizeChange = () => {
  // pageSize发生变化重新获取SPU数据
  getSpuList();
};

// 监听c3Id的变化，再次发送请求，获取SPU信息
watch(
  () => categoryStore.c3Id,
  () => {
    // 进行判断如果存在三级的Id就获取数据，不存在就直接终止
    if (!categoryStore.c3Id) return;
    getSpuList();
  }
);
</script>
<script lang="ts">
export default {
  name: "index",
};
</script>
<style lang="scss" scoped></style>
