<template>
  <div>
    <Category :visibility="visibility"></Category>
    <el-card style="margin: 10px 0">
      <!-- 默认展示table表格数据 -->
      <div class="default-table" v-show="visibility === 0">
        <el-button
          :disabled="categoryStore.c3Id ? false : true"
          type="primary"
          size="default"
          icon="Plus"
          @click="handleAddAttr"
          >添加属性</el-button
        >
        <el-table style="margin: 10px 0" border :data="allAttr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag
                size="normal"
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row }">
              <el-popconfirm
                :title="`你去确定删除${row.attrName}吗?`"
                width="200px"
                @confirm="handleDeleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
              <el-button
                type="warning"
                size="small"
                @click="handleEditAttr(row)"
                icon="Edit"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 点击添加平台属性按钮后，所展示的添加属性结构 -->
      <div class="add-table" v-show="visibility === 1">
        <el-form :inline="true">
          <el-form-item label="属性的名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性的名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="attrParams.attrName ? false : true"
          @click="handleAddAttrValue"
          >添加属性值</el-button
        >
        <el-button size="default" @click="handleCancelAddAttr">取消</el-button>
        <el-table
          border
          stripe
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80px" align />
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <el-input
                v-model="row.valueName"
                v-if="row.flag"
                ref="valueNameInput"
                @blur="changeDisplayMode(row, $index)"
                size="small"
                placeholder="请输入属性值名称"
                clearable
              ></el-input>
              <span
                @click="handleChangeDisplayMode(row)"
                style="color: #51a7ff"
                v-else
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ $index }">
              <el-button
                type="danger"
                size="default"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="handleSaveAttr"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          >保存</el-button
        >
        <el-button size="default" @click="handleCancelAddAttr">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrModifyAttr, reqAllAttr } from "@/api/product/attr";
import { AttrValue } from "@/api/product/attr/types";
import { Attr } from "@/api/product/attr/types";
import { reqDeleteAttr } from "@/api/product/attr";
import useCategoryStore from "@/store/modules/category";
// @ts-ignore
import { ElMessage } from "element-plus";
import { ref, watch, reactive, nextTick, onBeforeUnmount } from "vue";
// 分类仓库
const categoryStore = useCategoryStore();
// 已经分好类的所有的属性和属性值  响应式
let allAttr = ref<Array<Attr>>([]);
// 控制table两种结构切换的响应式数据,0=>显示默认的table结构,1=>显示添加与修改属性的table结构
let visibility = ref<number>(0);
// 点击新增属性按钮后用于收集收集数据的响应式对象
let attrParams = reactive<Attr>({
  attrName: "",
  categoryId: 0,
  categoryLevel: 3,
  attrValueList: [],
});
let valueNameInput = ref<HTMLInputElement>();
/**
 * 清空所有的表单数据
 */
function clearAllAttrParams() {
  const initObj = {
    attrName: "",
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
    attrValueList: [],
  };
  Object.assign(attrParams, initObj);
}

/**
 * 当table表格中的input失去焦点触发方法回调
 * @param item table表格中点击的每一个对象
 */
const changeDisplayMode = (row: AttrValue, index: number) => {
  // 进行非法情况进行判断
  if (row.valueName.trim() === "") {
    // 删除对应属性值为空的元素
    attrParams.attrValueList.splice(index, 1);
    // 提示不能为空
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
    return;
  }
  // 查找有重复的元素
  let repeatAttrValue = attrParams.attrValueList.find((item) => {
    // 把自己排除出去，否则返回的一定带有自己
    if (item !== row) {
      return item.valueName === row.valueName;
    }
  });
  // 如果有重复的元素进行提示，并终止
  if (repeatAttrValue) {
    // 将重复的属性元素从数组当中进行清除
    attrParams.attrValueList.splice(index, 1);
    // 提示不能相同
    ElMessage({
      type: "error",
      message: "属性值不能相同",
    });
    return;
  }
  row.flag = !row.flag;
};

/**
 * 当点击table表格中的span标签是触发的方法回调
 * @param item table表格中点击的每一个对象
 */
const handleChangeDisplayMode = (item: AttrValue) => {
  item.flag = !item.flag;
  // input自动获取焦点
  nextTick(() => {
    // 函数体
    valueNameInput.value?.focus();
  });
};

/**
 * 点击保存按钮的方法回调
 */
const handleSaveAttr = async () => {
  // 进行网络请求
  const result = await reqAddOrModifyAttr(attrParams);
  // 进行code判断
  if (result.code === 200) {
    // 成功进行提示，并且再次请求获取所有的属性
    ElMessage({
      type: "success",
      message: !attrParams.id
        ? `添加属性${result.message}`
        : `修改属性${result.message}`,
    });
    // 获取所有的属性
    getAllAttr();
    visibility.value = 0;
  } else {
    // 没有成功发送请求
    ElMessage({
      type: "error",
      message: !attrParams.id
        ? `添加属性${result.message}`
        : `修改属性${result.message}`,
    });
  }
};

/**
 * 取消添加新的属性的回调方法
 */
const handleCancelAddAttr = () => {
  visibility.value = 0;
};

/**
 * 添加新的属性方法
 */
const handleAddAttr = () => {
  // 清空每一次的数据
  clearAllAttrParams();
  // 修改visibility的值为1 切换为添加与修改属性的table结构
  visibility.value = 1;
};

/**
 * 添加新的属实的新的属性值的点击事件
 */
const handleAddAttrValue = () => {
  // 点击了添加属性值就像attrParams的attrValueList中添加一个新的对象
  attrParams.attrValueList.push({
    valueName: "",
    flag: true, // 控制编辑模式和显示模式的切换属性
  });
  // input自动获取焦点
  nextTick(() => {
    // 函数体
    valueNameInput.value?.focus();
  });
};

/**
 * 点击table表格中修改按钮修改Attr事件的回调
 */
const handleEditAttr = (rowItem: Attr) => {
  // 修改visibility的值为1 切换为添加与修改属性的table结构
  visibility.value = 1;
  // 将点击的rowItem对象赋值给attrParams
  // 用户点击取消时，还是会保存当前值，此处需要进行一次深拷贝，将深拷贝的值在赋值给attrParams
  Object.assign(attrParams, JSON.parse(JSON.stringify(rowItem)));
};

/**
 * 点击table表格中删除按钮删除Attr事件的回调
 */
const handleDeleteAttr = async (id: number) => {
  // 进行网络请求
  const result = await reqDeleteAttr(id);
  // code判断
  if (result.code === 200) {
    // 成功进行全局提示
    ElMessage({
      type: "success",
      message: `删除属性${result.message}`,
    });
    // 再次获取所有的属性
    getAllAttr();
  } else {
    // 失败进行全局提示
    ElMessage({
      type: "error",
      message: `删除属性${result.message}`,
    });
  }
};

/**
 * 获取已经分好类的所有属性和属性值函数
 */
async function getAllAttr() {
  let { c1Id, c2Id, c3Id } = categoryStore;
  // 进行网络请求获取所有分类好的属性和属性值
  const result = await reqAllAttr(c1Id, c2Id, c3Id);
  // code为200进行存储
  if (result.code === 200) {
    // 存储到响应式数据当中
    allAttr.value = result.data;
  }
}
// 监听三级分类的id有变化就发送请求
watch(
  () => categoryStore.c3Id,
  () => {
    // 三级id发生了变化清楚allAttr响应式数据
    allAttr.value = [];
    // 防止没有三级id的情况下频繁发请求判断
    categoryStore.c3Id && getAllAttr();
  }
);

// 每次路由切换,三级联动选择器里的数据并不会进行销毁,因为使用了全局状态管理,所以在每一次销毁之前进行仓库数据的清空
onBeforeUnmount(() => {
  // 调用pinia身上自带的reset方法进行仓库数据所有的清空
  categoryStore.$reset();
});
</script>

<script lang="ts">
export default {
  name: "index",
};
</script>
<style lang="scss" scoped></style>
