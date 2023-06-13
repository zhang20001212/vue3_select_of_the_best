<template>
  <div>
    <el-dialog
      model-value="show"
      title="SKU商品列表"
      @close="$emit('update:show', false)"
    >
      <el-table :data="skuInfo" border stripe>
        <el-table-column label="SKU名字" prop="skuName" />
        <el-table-column label="SKU价格" prop="price" />
        <el-table-column label="SKU重量" prop="weight" />
        <el-table-column label="SKU图片">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" width="100" height="100" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { SkuItem } from "@/api/product/spu/types";

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  skuInfo: {
    type: Array<SkuItem>,
    default: [],
  },
});
defineEmits(["update:show"]);
</script>

<script lang="ts">
export default {
  name: "dialogSku",
};
</script>
<style lang="scss" scoped></style>
