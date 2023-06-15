<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-table :data="skuList" border stripe style="margin: 10px 0">
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        />
        <el-table-column
          label="名称"
          prop="skuName"
          show-overflow-tooltip
          width="300"
        ></el-table-column>
        <el-table-column
          label="描述"
          prop="skuDesc"
          show-overflow-tooltip
          width="300"
        ></el-table-column>
        <el-table-column label="默认图片" width="150px" align="center">
          <template #="{ row }">
            <img width="100" height="100" :src="row.skuDefaultImg" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          prop="weight"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          label="价格"
          prop="price"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="300" align="center" fixed="right">
          <template #="{ row }">
            <el-button
              :type="row.isSale === 1 ? 'info' : 'success'"
              size="default"
              :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
              @click="handleClickPutAwayProduct(row)"
            ></el-button>
            <el-button
              type="warning"
              size="default"
              icon="Edit"
              @click="handleClickEditProduct"
            ></el-button>
            <el-button
              type="info"
              size="default"
              icon="InfoFilled"
              @click="handleClickViewOneProduct(row)"
            ></el-button>
            <el-popconfirm
              :title="`你确定删除${row.skuName}吗?`"
              @confirm="handleClickDeleteOneProduct(row)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="default"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        :total="total"
        @current-change="getSkuList"
        @size-change="handleSizeChange"
        layout=" prev, pager, next, jumper,->,total, sizes"
      />
      <!-- 点击查看某一个SKU显示抽屉组件 -->
      <drawer v-model:showDrawer="showDrawer" :item="item"></drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  reqCancelSaleOneSku,
  reqDeleteSkuItem,
  reqGetAllSkuList,
  reqGetOneSkuInfo,
  reqOnSaleOneSku,
} from "@/api/product/sku";
import { SkuItem } from "@/api/product/spu/types";
import drawer from "./drawer.vue";
// @ts-ignore
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
// 当前的页码
let pageNo = ref<number>(1);
// 一页展示多少条数据
let pageSize = ref<number>(10);
// 总条数
let total = ref<number>(0);
// 所有的sku信息
let skuList = ref<Array<SkuItem>>([]);
// 显示抽屉组件
let showDrawer = ref<boolean>(false);
// 抽屉所需要展示的数据
let item = ref<SkuItem>();

// 获取所有SKU的函数
async function getSkuList(pager: number = 1) {
  // 当前的分页器页码
  pageNo.value = pager;
  // 进行网络请求
  const result = await reqGetAllSkuList(pageNo.value, pageSize.value);
  // code判断成功与失败
  if (result.code === 200) {
    // 成功存储数据
    total.value = result.data.total;
    skuList.value = result.data.records;
  }
}

// 上下架一个SKU单品
const handleClickPutAwayProduct = async (rowItem: SkuItem) => {
  // 进行逻辑判断isSale===1是上架状态,0为下架状态
  if (rowItem.isSale === 1) {
    // 进行下架网络请求
    const result = await reqCancelSaleOneSku(rowItem.id as number);
    // 进行用户提示操作成功与失败
    ElMessage({
      type: "success",
      message: `下架${result.message}`,
    });
    // 再次获取全部的Sku信息
    getSkuList(pageNo.value);
    return "下架成功";
  } else if (rowItem.isSale === 0) {
    // 进行上架操作
    const result = await reqOnSaleOneSku(rowItem.id as number);
    // 进行用户提示操作成功与失败
    ElMessage({
      type: "success",
      message: `上架${result.message}`,
    });
    // 再次获取全部的Sku信息
    getSkuList(pageNo.value);
    return "上架成功";
  }
};

// 修改一个SKU单品
const handleClickEditProduct = () => {
  ElMessage({
    type: "warning",
    message: "后台的懒B接口没开发出来,业务实现不了！！！",
  });
};

// 查看一个SKU的单品
const handleClickViewOneProduct = async (rowItem: SkuItem) => {
  // 进行网络请求获取指定的SKU信息
  const result = await reqGetOneSkuInfo(rowItem.id as number);
  // code码判断成功
  if (result.code === 200) {
    item.value = result.data;
  }
  // 显示抽屉组件
  showDrawer.value = true;
};

// 删除一个SKU单品
const handleClickDeleteOneProduct = async (rowItem: SkuItem) => {
  // 进行网络请求
  const result = await reqDeleteSkuItem(rowItem.id as number);
  // code码判断成功与失败
  if (result.code === 200) {
    // 成功进行提示信息
    ElMessage({
      type: "success",
      message: `删除${result.message}`,
    });
    // 再次进行获取全部的Sku信息
    getSkuList(skuList.value.length > 1 ? pageNo.value : pageNo.value - 1);
    return 1;
  } else {
    // 失败进行提示信息
    ElMessage({
      type: "error",
      message: `删除${result.message}`,
    });
    return 0;
  }
};

// 分页器每页显示条数变化时触发的函数回调
const handleSizeChange = () => {
  // 条数发生变化进行页码归1
  getSkuList();
};
// 组件挂载完毕时进行初始化请求数据
onMounted(() => {
  getSkuList();
});
</script>

<script lang="ts">
export default {
  name: "Sku",
};
</script>
<style lang="scss" scoped></style>
