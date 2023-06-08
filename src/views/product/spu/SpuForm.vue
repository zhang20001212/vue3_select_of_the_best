<template>
  <div>
    <el-form label-width="96px">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请输入SPU的名称"
          v-model="spuParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spuParams.tmId">
          <el-option
            v-for="item in allTradeMark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuParams.description"
          type="textarea"
          placeholder="请输入SPU的描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="allSpuImageList"
          action="/upload-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handlePictureRemove"
          :before-upload="handlePictureBeforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogVisibleImage"
            alt="图片资源无法显示"
            style="width: 100%; height: 100%"
          />
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
        <el-table border stripe style="margin-top: 10px" :data="allSpuSaleAttr">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          />
          <el-table-column label="属性名" width="100px" prop="saleAttrName">
          </el-table-column>
          <el-table-column label="属性值">
            <template #="{ row }">
              <el-tag
                v-for="tag in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                style="margin-left: 10px"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px">
            <template #="{ $index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="allSpuSaleAttr.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
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
import { reqGetAllBaseSaleAttrList } from "@/api/product/spu";
import {
  reqGetSpuImageList,
  reqGetSpuSaleAttrList,
  reqGetTradeMarkAllAttribute,
} from "@/api/product/spu";
import {
  BaseSaleAttrItem,
  SpuImageItem,
  SpuItem,
  SpuSaleAttrItem,
} from "@/api/product/spu/types";
import { TradeMarkItem } from "@/api/product/trademark/types";
// @ts-ignore
import { UploadFile } from "element-plus";
// @ts-ignore
import { UploadProps } from "element-plus";
// @ts-ignore
import { UploadRawFile } from "element-plus";
// @ts-ignore
import { ElMessage } from "element-plus";
import { computed, reactive, ref } from "vue";
// 控制dialog的显示/隐藏
let dialogVisible = ref<boolean>(false);
// dialog显示的图片
let dialogVisibleImage = ref<string>("");
// 所有销售品牌
let allTradeMark = ref<Array<TradeMarkItem>>([]);
// 该Spu下的销售的商品图片
let allSpuImageList = ref<Array<SpuImageItem>>([]);
// 该Spu下的销售属性
let allSpuSaleAttr = ref<Array<SpuSaleAttrItem>>([]);
// 平台中的所有销售属性
let allSaleAttr = ref<Array<BaseSaleAttrItem>>([]);
// 存储已有的SPU
let spuParams = reactive<SpuItem>({
  spuName: "",
  description: "",
  tmId: "",
  category3Id: "",
  spuImageList: [],
  spuSaleAttrList: [],
});
let emit = defineEmits(["modifyVisibility"]);
// 点击取消按钮的函数回调
const onModifyVisibility = () => {
  // 触发自定义事件
  emit("modifyVisibility", 0);
};
// 初始化SpuForm组件中的数据
const initSpuFormData = async (spuItem: SpuItem) => {
  // 将spuItem赋值给spuParams
  Object.assign(spuParams, spuItem);
  // spuItem为父组件传递过的数据，利用spuItem中的属性进行网络请求
  // 获取所有的销售品牌属性
  const tardeMarkResult = await reqGetTradeMarkAllAttribute();
  // 进行code判断层层递进
  if (tardeMarkResult.code === 200 && spuItem.id) {
    // 获取某一个SPU下的所有商品图片
    const spuImageListResult = await reqGetSpuImageList(spuItem.id);
    // 进行code判断层层递进
    if (spuImageListResult.code === 200) {
      // 获取某个SPU下的所有销售属性
      const spuSaleAttrResult = await reqGetSpuSaleAttrList(spuItem.id);
      // 进行code状态码判断
      if (spuSaleAttrResult.code === 200) {
        const baseSaleAttrResult = await reqGetAllBaseSaleAttrList();
        if (baseSaleAttrResult.code === 200) {
          // 发挥的数据存储到响应式数据
          allTradeMark.value = tardeMarkResult.data;
          // 由于elementUI中upload组件中的prop数据属性名规定为name和url所以此处添加上name和url字段。
          allSpuImageList.value = spuImageListResult.data.map((item) => {
            return {
              imgName: item.imgName,
              imgUrl: item.imgUrl,
              name: item.imgName,
              url: item.imgUrl,
            };
          });
          allSpuSaleAttr.value = spuSaleAttrResult.data;
          allSaleAttr.value = baseSaleAttrResult.data;
          for (const key in allSpuImageList.value) {
            console.log(Object.keys(allSpuImageList.value[key]));
          }
        }
      }
    }
  }
};
// upload组件中on-preview的事件回调
const handlePictureCardPreview = (
  uploadFile: UploadFile
): UploadProps["onPreview"] => {
  // 弹出对话框
  dialogVisible.value = true;
  dialogVisibleImage.value = uploadFile.url;
};
// upload组件的before-upload的事件回调，可以约束文件的大小及格式
const handlePictureBeforeUpload = (rawFile: UploadRawFile) => {
  // 约束文件的格式为png、jpg、gif
  if (
    rawFile.type === "image/png" ||
    rawFile.type === "image/jpeg" ||
    rawFile.type === "image/gif"
  ) {
    // 约束文件大小不大于3M
    if (rawFile.size / 1024 / 1024 < 3) {
      // 执行上传
      return true;
    } else {
      // 如果大于3M，弹出消息框警告用户
      ElMessage({
        type: "error",
        message: "上传图片大小应小于3M！",
      });
      // 并且终止上传
      return false;
    }
  } else {
    // 如果文件不符合规定弹出消息框警告用户
    ElMessage({
      type: "error",
      message: "上传图片格式应为PNG/JPEG/GIF！",
    });
    // 终止上传
    return false;
  }
};
// upload组件中on-remove 的事件回调
const handlePictureRemove = () => {};
// 计算出当前SPU下未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  // 过滤掉当前SPU下已拥有的属性
  return allSaleAttr.value.filter((item) => {
    return allSpuSaleAttr.value.every((ele) => {
      return item.name !== ele.saleAttrName;
    });
  });
});
// 由于setup语法糖不会对外进行暴露方法，需要使用组合式函数defineExpose方法进行暴露需要使用的数据及方法
defineExpose({ initSpuFormData });
</script>

<script lang="ts">
export default {
  name: "SpuForm",
};
</script>
<style lang="scss" scoped></style>
