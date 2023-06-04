<template>
  <div>
    <el-card>
      <el-form ref="form" :inline="true" size="normal">
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.c1Id"
            :disabled="visibility === 0 ? false : true"
            @change="handleSelectOneChange"
          >
            <el-option
              v-for="c1 in categoryStore.categoryOne"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="categoryStore.c2Id"
            :disabled="visibility === 0 ? false : true"
            @change="handleSelectTwoChange"
          >
            <el-option
              v-for="c2 in categoryStore.categoryTwo"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            v-model="categoryStore.c3Id"
            :disabled="visibility === 0 ? false : true"
          >
            <el-option
              v-for="c3 in categoryStore.categoryThree"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { onMounted } from "vue";
// 分类仓库引入
let categoryStore = useCategoryStore();
// 接受父组件传递过来的控制select是否禁用的值
defineProps({
  visibility: {
    type: Number,
    default: 0,
  },
});
// 从仓库中获取一级分类所有的option
function getCategoryOne() {
  categoryStore.getOneCategory();
}
/**
 * 一级分类菜单的change事件回调 ==> 在option选中的时候会进行触发
 * 保证了一级分类的ID已经存在了
 */
const handleSelectOneChange = () => {
  // 调用仓库中的方法，获取二级分类的数据
  categoryStore.getTwoCategory();
  // 监听一级分类的数据,如果发生了变化，清空二三级的数据
  categoryStore.clear();
};
/**
 * 二级分类惨淡的change事件回调 => 在option选中的时候会进行触发
 */
const handleSelectTwoChange = () => {
  // 调用仓库中的方法，获取三级分类的数据
  categoryStore.getThreeCategory();
};
// 该组件挂载完毕通知仓库发送请求，获得一二三级的所有分类
onMounted(() => {
  // 获取一级分类的数据
  getCategoryOne();
});
</script>

<script lang="ts">
export default {
  name: "Category",
};
</script>
<style lang="scss" scoped></style>
