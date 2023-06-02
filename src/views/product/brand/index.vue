<template>
  <div>
    <el-card shadow="always">
      <!-- 添加品牌按钮 -->
      <el-button
        type="primary"
        size="default"
        @click="handleAddBrand"
        icon="Plus"
        >添加品牌</el-button
      >
      <el-table :data="trademarkArr" border stripe style="margin: 10px 0">
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        />
        <el-table-column prop="tmName" label="品牌名称" />
        <!-- el-table-column 默认是使用div展示数据 -->
        <el-table-column label="品牌LOGO">
          <template #="{ row }">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <img
                :src="row.logoUrl"
                width="100"
                height="100"
                alt="图片资源未找到"
                :title="row.tmName"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="handleEditTradeMark(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定删除${row.tmName}品牌吗?`"
              width="200px"
              icon="Delete"
              @confirm="handleRemoveTradeMark(row)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9, 11]"
        :total="total"
        background
        layout="prev,pager,next,jumper,->,sizes,total,"
      />
    </el-card>

    <!-- 弹出对话框 -->
    <el-dialog
      v-model="dialogFromVisible"
      :title="tradeMarkParams.id ? '修改品牌' : '新增品牌'"
    >
      <el-form
        ref="form"
        :inline="false"
        size="normal"
        :model="tradeMarkParams"
        :rules="rules"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            v-model="tradeMarkParams.tmName"
            placeholder="请输入品牌名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/upload-api/admin/product/fileUpload"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
            <img
              v-if="tradeMarkParams.logoUrl"
              :src="tradeMarkParams.logoUrl"
              class="avatar"
            />
            <el-icon class="avatar-uploader-icon" v-else>
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" size="default" @click="handleClickCancel"
          >取消</el-button
        >
        <el-button type="primary" size="default" @click="handleClickConfirm"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrModifyTradeMark,
  reqDeleteTradeMark,
  reqHasTradeMark,
} from "@/api/product/trademark";
import { Records } from "@/api/product/trademark/types";
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import type { TradeMarkItem } from "@/api/product/trademark/types";
// @ts-ignore
import type { UploadProps } from "element-plus";
// @ts-ignore
import { UploadRawFile } from "element-plus";
// @ts-ignore
import { ElMessage } from "element-plus";
// @ts-ignore
import { UploadFiles } from "element-plus";
// @ts-ignore
import { FormRules } from "element-plus";
// @ts-ignore
import type { FormInstance } from "element-plus";

// 当前页码
let pageNo = ref<number>(1);
// 每一页展示多少条数据
let limit = ref<number>(3);
// 存储已有品牌数据的总数
let total = ref<number>(0);
// 已有品牌数据
let trademarkArr = ref<Records>([]);
// 控制dialog对话框的显示与隐藏
let dialogFromVisible = ref<boolean>(false);
// 收集新增品牌的数据
let tradeMarkParams = reactive<TradeMarkItem>({
  tmName: "",
  logoUrl: "",
});
// 定义个一个空的TradeMarkParams对象,进行清空
const emptyTradeMarkParams: TradeMarkItem = {
  tmName: "",
  logoUrl: "",
};
// 表单规则校验对象
const rules = reactive<FormRules>({
  // 这里的属性名就是再<el-form-item>中的prop属性,required:字段必须要校验，trigger：此规则触发的时机
  tmName: [
    { required: true, trigger: "blur", validator: validateTradeMarkTmName },
  ],
  logoUrl: [{ required: true, validator: validateTradeMarkLogoUrl }],
});
// 获取form的组件实例
const form = ref<FormInstance>();

/**
 * logoUrl的自定义表单规则的函数回调
 * @param rule 表单校验是的规则对象
 * @param value 图片的地址
 * @param callBack 回调函数
 */
function validateTradeMarkLogoUrl(rule: any, value: string, callBack: any) {
  // 防止爆红,打印rule
  console.log(rule);
  // 如果value不为空，则证明了上传了图片
  if (value) {
    // 进行回调函数
    callBack();
  } else {
    // 如果为空了，则证明没有上传图片，抛出一个错误信息
    callBack(new Error("必须上传图片"));
  }
}

/**
 * tmName的自定义表单规则的函数回调
 * @param rule 表单校验的规则对象
 * @param value 表单校验的规则对象中的文本内容
 * @param callBack 函数回调
 */
function validateTradeMarkTmName(rule: any, value: string, callBack: any) {
  // 防止rule爆红定义并未使用，直接打印一下
  console.log(rule);
  // 如果输入的文本长度大于等于2则校验通过
  if (value.trim().length >= 2) {
    // 函数回调放行
    callBack();
  }
  // 如果输入的文本长度小于2则校验失败，校验不通过
  if (value.trim().length < 2) {
    // 函数回调,并传入一个Error对象
    callBack(new Error("品牌名称应>=2 "));
  }
}

/**
 * 添加或者修改操作后对响应式对象tradeMarkParams中的数据进行清空
 */
function clearTradeMarkParams() {
  Object.assign(tradeMarkParams, emptyTradeMarkParams);
}

/**
 * 通过网络请求获取商品信息的函数
 */
async function getTradeMark() {
  // 通过API进行请求，返回为Promise通过then()或者await形式进行获取
  const result = await reqHasTradeMark(pageNo.value, limit.value);
  // 如果code为200为成功
  if (result.code === 200) {
    // 总条数进行赋值
    total.value = result.data.total;
    // 商品信息进行赋值
    trademarkArr.value = result.data.records;
  }
}

/**
 * 添加商品信息事件回调函数
 */
const handleAddBrand = () => {
  // 对dialog进行显示
  dialogFromVisible.value = true;
  // 清空上一次的数据
  clearTradeMarkParams();
  // 清空校验规则的提示信息
  nextTick(() => {
    form.value.clearValidate("tmName");
    form.value.clearValidate("logoUrl");
  });
};

/**
 * table中修改按钮回调
 * @param row 点击table表格中当前的对象
 */
const handleEditTradeMark = (row: TradeMarkItem) => {
  Object.assign(tradeMarkParams, row);
  // 对dialog进行隐藏
  dialogFromVisible.value = true;
  // 清空校验规则的提示信息
  nextTick(() => {
    form.value.clearValidate("tmName");
    form.value.clearValidate("logoUrl");
  });
};

/**
 * table中删除按钮的回调也是popconfirm的confirm事件的回调函数
 * @param row 点击table表格中删除按钮当前的对象
 */
const handleRemoveTradeMark = async (row: TradeMarkItem) => {
  // 进行网络请求
  const result = await reqDeleteTradeMark(row.id as number);
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: `删除品牌${result.message}`,
    });
    getTradeMark();
  } else {
    ElMessage({
      type: "error",
      message: `删除品牌${result.message}`,
    });
  }
};
/**
 * dialog取消按钮回调函数
 */
const handleClickCancel = () => {
  // 清空上一次的数据
  clearTradeMarkParams();
  // 对tardeMarkParams上的id字段进行删除
  delete tradeMarkParams.id;
  // 对dialog进行隐藏
  dialogFromVisible.value = false;
};

/**
 * dialog确定按钮回调函数
 */
const handleClickConfirm = () => {
  // 进行网络请求之前对整个的form表单进行校验通过才可以进行请求
  form.value
    .validate()
    .then(async () => {
      // 进行网络请求
      const result = await reqAddOrModifyTradeMark(tradeMarkParams);
      // 对返回码code进行判断
      if (result.code === 200) {
        // code为200 对 dialog进行隐藏
        dialogFromVisible.value = false;
        // 全局message进行提示
        ElMessage({
          type: "success",
          message: tradeMarkParams.id
            ? `修改品牌${result.message}`
            : `添加品牌${result.message}`,
        });
        // 再次进行获取所有商品信息
        getTradeMark();
      } else {
        // code不为200 进行错误处理 全居message消息提示信息
        ElMessage({
          type: "success",
          message: tradeMarkParams.id
            ? `修改品牌${result.message}`
            : `添加品牌${result.message}`,
        });
      }
      // 清空上一次的数据
      clearTradeMarkParams();
      // 对tardeMarkParams上的id字段进行删除
      delete tradeMarkParams.id;
    })
    .catch((err: Error) => {
      console.log(err.message);
    });
};

/**
 * 上传图片之前upload组件before-upload方法的回调，此函数时图片上传之前进行触发，在此处进行上传文件的类型及大小的约束
 * @param rawFile 当前上传的图片对象所有属性
 */
const beforeAvatarUpload: UploadProps["beforeUpload"] = (
  rawFile: UploadRawFile
) => {
  // 限制图片格式为jpg或者png或者gif，大小<=4M
  if (
    rawFile.type === "image/png" ||
    rawFile.type === "image/jpeg" ||
    rawFile.type === "image/gif"
  ) {
    // 得出的rawFile.size是以字节为单位的B => M
    if (rawFile.size / 1024 / 1024 <= 4) {
      // 小于等于4M
      return true;
    } else {
      // 超出了大小限制>=4M
      ElMessage({
        type: "error",
        message: "上传文件大小必须小于等于4M",
      });
      return false;
    }
  } else {
    // 超出了限制
    ElMessage({
      type: "error",
      message: "上传文件格式必须为PNG、JPG、GIF",
    });
    return false;
  }
};

/**
 * 上传图片之前upload组件on-success方法的回调，此函数时图片上传成功之后进行触发，在此处进行对tradeMarkParams中的logoUrl进行赋值
 * @param response 为当前图片上传成功后所返回的数据
 * @param uploadFile 为当前图片上传成功后当前图片的信息
 */
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response: any,
  // @ts-ignore
  uploadFile: UploadFiles
) => {
  // 对tradeMarkParams中的logoUrl进行赋值
  tradeMarkParams.logoUrl = response.data;
  // 图片上传成功了，清除掉上传图片组件校验的
  form.value.clearValidate("logoUrl");
};

// 通过watch监听pagination中的pageNo和size，改变重新进行请求
watch([() => pageNo.value, () => limit.value], () => {
  // 获取商品信息
  getTradeMark();
});

// 当此组件在页面进行挂载时进行网络请求
onMounted(() => {
  // 进行网络网络请求的方法
  getTradeMark();
});
</script>

<script lang="ts">
export default {
  name: "index",
};
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
