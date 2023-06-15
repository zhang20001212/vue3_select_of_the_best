<template>
  <div class="container">
    <el-drawer
      :model-value="showDrawer"
      direction="ltr"
      title="查看商品详情"
      @close="$emit('update:showDrawer', false)"
    >
      <el-row>
        <el-col :span="6" :offset="0">Sku名称</el-col>
        <el-col :span="18" :offset="0">{{ item.skuName }}</el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6" :offset="0">Sku描述</el-col>
        <el-col :span="18" :offset="0">{{ item.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6" :offset="0">Sku价格</el-col>
        <el-col :span="18" :offset="0">￥{{ item.price }}</el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6" :offset="0">平台属性</el-col>
        <el-col :span="18" :offset="0">
          <el-tag
            v-for="baseAttr in item.skuAttrValueList"
            :key="baseAttr.id"
            type="success"
            size="small"
            effect="dark"
            style="margin: 5px"
            >{{ baseAttr.valueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6" :offset="0">销售属性</el-col>
        <el-col :span="18" :offset="0"
          ><el-tag
            v-for="baseAttr in item.skuSaleAttrValueList"
            :key="baseAttr.id"
            type="success"
            size="small"
            effect="dark"
            style="margin: 5px"
            >{{ baseAttr.saleAttrValueName }}</el-tag
          ></el-col
        >
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="0" :offset="0"></el-col>
        <el-col :span="24" :offset="0">
          <el-carousel
            :interval="4000"
            type="card"
            height="200px"
            indicator-position="outside"
          >
            <el-carousel-item
              v-for="skuImg in item.skuImageList"
              :key="skuImg.imgUrl"
            >
              <img :src="skuImg.imgUrl" style="width: 100%; height: 100%" />
            </el-carousel-item> </el-carousel
        ></el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { SkuItem } from "@/api/product/spu/types";

interface Props {
  showDrawer: boolean;
  item: SkuItem;
}
withDefaults(defineProps<Props>(), {
  showDrawer: false,
});
</script>

<script lang="ts">
export default {
  name: "drawer",
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style lang="scss" scoped></style>
