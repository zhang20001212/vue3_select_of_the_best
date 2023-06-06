<template>
  <div>
    <el-form label-width="96px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU的名称"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select>
          <el-option label="华为"></el-option>
          <el-option label="Vivo"></el-option>
          <el-option label="Apple"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入SPU的描述"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog>
          <img w-full alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <!-- 展示销售属性的下拉菜单 -->
        <el-select>
          <el-option label="华为"></el-option>
          <el-option label="Vivo"></el-option>
          <el-option label="Apple"></el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          style="margin-left: 10px"
          >添加属性值</el-button
        >
        <!-- table展示销售属性和属性值数据的区域 -->
        <el-table border stripe style="margin-top: 10px">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          />
          <el-table-column label="属性名" width="100px"> </el-table-column>
          <el-table-column label="属性值"> </el-table-column>
          <el-table-column label="操作" width="80px"> </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="normal" size="default" @click="onModifyVisibility"
          >取消</el-button
        >
        <el-button type="primary" size="default">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reqGetTradeMarkAllAttribute } from "@/api/product/spu";
import { SpuItem } from "@/api/product/spu/types";

let emit = defineEmits(["modifyVisibility"]);
// 点击取消按钮的函数回调
const onModifyVisibility = () => {
  // 触发自定义事件
  emit("modifyVisibility", 0);
};
// 初始化SpuForm组件中的数据
const initSpuFormData = (spuItem: SpuItem) => {
  console.log("@@@@@", spuItem);
  // spuItem为父组件传递过的数据，利用spuItem中的属性进行网络请求
  // 获取所有的销售品牌属性
  reqGetTradeMarkAllAttribute();
};
// 由于setup语法糖不会对外进行暴露方法，需要使用组合式函数defineExpose方法进行暴露需要使用的数据及方法
defineExpose({ initSpuFormData });
</script>

<script lang="ts">
export default {
  name: "SpuForm",
};
</script>
<style lang="scss" scoped></style>
