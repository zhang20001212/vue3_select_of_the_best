<template>
  <div>
    <el-form ref="form" label-width="80px" :inline="false" size="normal">
      <el-form-item label="SKU名称">
        <el-input
          v-model="skuParams.skuName"
          placeholder="SKU的名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuParams.price"
          type="number"
          placeholder="价格/元"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input
          v-model="skuParams.weight"
          type="number"
          placeholder="重量/克"
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          v-model="skuParams.skuDesc"
          type="textarea"
          placeholder="SKU的描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            v-for="attr in allAttr"
            :key="attr.id"
            :label="attr.attrName"
          >
            <el-select v-model="attr.attrIdAndValueId">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName"
          >
            <el-select v-model="saleAttr.saleIdAndValueId">
              <el-option
                v-for="saleAttrVal in saleAttr.spuSaleAttrValueList"
                :key="saleAttrVal.id"
                :label="saleAttrVal.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrVal.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table ref="TABLE" :data="spuImageList" border stripe>
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="图片" align="center">
            <template #="{ row }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            prop="imgName"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template #="{ row }">
              <el-button
                type="primary"
                size="default"
                @click="handleClickSetDefaultImage(row)"
                >设置默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClickOnSubmit">保存</el-button>
        <el-button @click="handleClickChangeToWatchTable">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { reqAllAttr } from "@/api/product/attr";
import { Attr } from "@/api/product/attr/types";
import {
  reqAddSku,
  reqGetSpuImageList,
  reqGetSpuSaleAttrList,
} from "@/api/product/spu";
import {
  SpuImageItem,
  SpuItem,
  SpuSaleAttrItem,
} from "@/api/product/spu/types";
import type {
  SkuAttrValueItem,
  SkuItem,
  SkuSaleAttrValueItem,
} from "@/api/product/spu/types";
// @ts-ignore
import { ElMessage } from "element-plus";
// @ts-ignore
import { ElTable } from "element-plus";
// id的联合类型
type ID = number | string;
// 所有的平台商品属性
const allAttr = ref<Array<Attr>>([]);
// SPU下的的平台售卖属性
const spuSaleAttrList = ref<Array<SpuSaleAttrItem>>([]);
// SPU下的商品图片
const spuImageList = ref<Array<SpuImageItem>>([]);
const emit = defineEmits(["modifyVisibility"]);
// SkuItem的参数
let skuParams = reactive<SkuItem>({
  category3Id: "",
  spuId: "",
  tmId: "",
  skuName: "",
  price: "",
  weight: "",
  skuDesc: "",
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: "",
});
// table的组件实例
let TABLE = ref<InstanceType<typeof ElTable>>();
// 初始化SKU当中的数据
async function initSkuData(c1Id: ID, c2Id: ID, row: SpuItem) {
  // 对skuItem进行初步的数据收集
  skuParams.category3Id = row.category3Id;
  skuParams.spuId = row.id;
  skuParams.tmId = row.tmId;
  // 获取当前分类下的所有属性
  const allAttrResult = await reqAllAttr(c1Id, c2Id, row.category3Id);
  // 获取当前Spu下的销售属性
  const spuSaleAttrListResult = await reqGetSpuSaleAttrList(row.id as number);
  // 获取当前SPU下的所有商品图片信息
  const spuImageListResult = await reqGetSpuImageList(row.id as number);
  // code码进行成功失败判断
  if (
    allAttrResult.code === 200 &&
    spuSaleAttrListResult.code === 200 &&
    spuImageListResult.code === 200
  ) {
    // 成功存储数据
    allAttr.value = allAttrResult.data;
    spuSaleAttrList.value = spuSaleAttrListResult.data;
    spuImageList.value = spuImageListResult.data;
  }
}

// 点击取消按钮的事件回调
const handleClickChangeToWatchTable = () => {
  emit("modifyVisibility", { flag: 0, params: "" });
};
// 设置默认图片的方法回调
const handleClickSetDefaultImage = (imgItem: SpuImageItem) => {
  // 只能选中一个为默认图片，复选框同理,排他思想
  spuImageList.value.forEach((item: SpuImageItem) => {
    // 复选框选中  elementUI文档中table实例中的方法
    TABLE.value.toggleRowSelection(item, false);
  });
  // 复选框选中  elementUI文档中table实例中的方法
  TABLE.value.toggleRowSelection(imgItem, true);
  // 收集图片的地址
  skuParams.skuDefaultImg = imgItem.imgUrl;
};
// 点击保存按钮时的方法回调
const handleClickOnSubmit = async () => {
  // 调用整理参数方法
  settle();
  // 进行网络请求
  const result = await reqAddSku(skuParams);
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: `添加SKU${result.message}`,
    });
    // 切换场景为table模式
    emit("modifyVisibility", { flag: 0, params: "" });
  } else {
    ElMessage({
      type: "error",
      message: `添加SKU${result.message}`,
    });
  }
};
// 整理收集到的平台属性和销售属性参数
function settle() {
  // 整理收集到的销售属性
  let skuAttrValueList: Array<SkuAttrValueItem> = [];
  allAttr.value.forEach((item) => {
    if (item.attrIdAndValueId) {
      const [attrId, valueId] = item.attrIdAndValueId.toString().split(":");
      skuAttrValueList.push({
        attrId,
        valueId,
      });
    }
  });
  // 整理收集到的平台售卖属性数据
  let skuSaleAttrValueList: Array<SkuSaleAttrValueItem> = [];
  spuSaleAttrList.value.forEach((item) => {
    if (item.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = item.saleIdAndValueId
        .toString()
        .split(":");
      skuSaleAttrValueList.push({
        saleAttrId,
        saleAttrValueId,
      });
    }
  });
  // 将整理好的参数赋值赋值给skuAttrValueList
  skuParams.skuAttrValueList = skuAttrValueList;
  skuParams.skuSaleAttrValueList = skuSaleAttrValueList;
}
defineExpose({ initSkuData });
</script>

<script lang="ts">
export default {
  name: "SkuForm",
};
</script>
<style lang="scss" scoped></style>
