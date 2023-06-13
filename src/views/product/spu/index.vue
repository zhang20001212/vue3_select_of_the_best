<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :visibility="visibility"></Category>
    <!-- Card -->
    <el-card shadow="always" style="margin: 10px 0">
      <!-- 展示table表格数据 -->
      <div v-show="visibility === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="handleClickAddSpuItem"
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
          <el-table-column label="操作" align="center">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="handleClickAddSkuItem(row)"
              ></el-button>
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpuItem(row)"
              ></el-button>
              <el-button
                type="info"
                size="small"
                icon="View"
                title="查看SKU已有列表"
                @click="handleClickViewOneSkuList(row)"
              ></el-button>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗?`"
                width="200px"
                confirmButtonText="确定"
                cancelButtonText="取消"
                confirmButtonType="primary"
                cancelButtonType="text"
                icon="el-icon-question"
                iconColor="#f90"
                hideIcon="false"
                @confirm="handleClickDeleteOneSpuItem(row)"
              >
                <template #reference
                  ><el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  ></el-button
                ></template>
              </el-popconfirm>
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
      </div>
      <!-- 添加Spu和修改Spu结构 -->
      <SpuForm
        v-show="visibility === 1"
        ref="SPU"
        @modifyVisibility="changeVisibility"
      ></SpuForm>
      <!-- 添加一个Sku的结构 -->
      <SkuForm
        v-show="visibility === 2"
        ref="SKU"
        @modifyVisibility="changeVisibility"
      ></SkuForm>
    </el-card>
    <!-- 是否显示展示某个SPU下的SKU的对话框 -->
    <dialogSku
      v-model:show="show"
      :skuInfo="skuInfo"
      v-if="show === true"
    ></dialogSku>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import {
  reqDeleteOneSpuItem,
  reqGetSkuList,
  reqGetSpu,
} from "@/api/product/spu";
import { SkuItem, SpuItem } from "@/api/product/spu/types";
import useCategoryStore from "@/store/modules/category";
import SpuForm from "./SpuForm.vue";
import SkuForm from "./SkuForm.vue";
import dialogSku from "./dialogSku.vue";
// @ts-ignore
import { ElMessage } from "element-plus";
// 控制三级联动分类组件是否禁用 0->三级联动选择器可使用，并且表示显示已有的SPU场景  1 -> 禁用三级联动选择器，表示添加或修改SPU  2 ->  添加SKU场景
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
// SpuForm组件的实例
let SPU = ref<InstanceType<typeof SpuForm>>();
let SKU = ref<InstanceType<typeof SkuForm>>();
// 某一个Sku的信息
let skuInfo = ref<Array<SkuItem>>([]);
// 控制dialog显示与隐藏
let show = ref<boolean>(false);
/**
 * 获取Spu方法
 * @param pager 页码数，如果没有修改默认为1
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

// pagination的size-change的方法回调
const handleSizeChange = () => {
  // pageSize发生变化重新获取SPU数据
  getSpuList();
};

// 点击修改SPU按钮时的方法回调
const updateSpuItem = (row: SpuItem) => {
  // 调用子组件的初始化数据方法
  SPU.value?.initModifySpuFormData(row);
  // 膝盖visibility的值为1，切换到添加或修改的场景
  visibility.value = 1;
};

// 点击添加SPU按钮时的方法回调
const handleClickAddSpuItem = () => {
  // 调用子组件的初始化数据方法
  SPU.value?.initAddSpuFormData(categoryStore.c3Id);
  // 修改visibility的值为1，切换到添加或修改场景
  visibility.value = 1;
};

// 自定义事件modifyVisibility的事件回调
const changeVisibility = (obj: { flag: number; params: string }) => {
  // 将子组件传递过来的值赋值给visibility切换回场景0展示table表格显示所有的SPU信息
  visibility.value = obj.flag;
  // 判断是更新还是新增
  if (obj.params === "update") {
    // 更新的情况停留在当前页数
    getSpuList(pageNo.value);
  }
  if (obj.params === "add") {
    // 新增回到第一页
    getSpuList();
  }
};

// 给当前的Spu追加一个商品Sku
const handleClickAddSkuItem = (row: SpuItem) => {
  // 切换为添加SKU场景页面
  visibility.value = 2;
  // 在父组件中触发子组件中初始化方法
  SKU.value?.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);
};

// 查看某一个SPU下的SKU列表数据
const handleClickViewOneSkuList = async (row: SpuItem) => {
  // 进行网络请求
  const result = await reqGetSkuList(row.id as number);
  // code码进行判断
  if (result.code === 200) {
    // 成功存储数据
    skuInfo.value = result.data;
    // 展示dialogSKU
    show.value = true;
  }
};

// 删除某一个SPU
const handleClickDeleteOneSpuItem = async (row: SpuItem) => {
  // 进行网络请求
  const result = await reqDeleteOneSpuItem(row.id as number);
  // code码判断
  if (result.code === 200) {
    // 成功提示
    ElMessage({
      type: "success",
      message: `删除${result.message}`,
    });
    // 重新获取剩余的SPU数据
    getSpuList();
  } else {
    // 失败提示
    ElMessage({
      type: "error",
      message: `删除${result.message}`,
    });
  }
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

// 切换路由清空Category组件的数据
onBeforeUnmount(() => {
  // 清空分类仓库中的数据
  categoryStore.$reset();
});
</script>
<script lang="ts">
export default {
  name: "Spu",
  components: { SpuForm, SkuForm },
};
</script>
<style lang="scss" scoped></style>
