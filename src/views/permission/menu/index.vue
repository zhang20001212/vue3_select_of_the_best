<template>
  <div>
    <el-table
      :data="listOfPermission"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作" align="center">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="handleClickAddMenuItem(row)"
            :disabled="row.level === 4"
            >{{ row.level === 3 ? "添加功能" : "添加菜单" }}</el-button
          >
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 1"
            @click="handleCLickModifyMenuItem(row)"
            >编辑菜单</el-button
          >
          <el-popconfirm
            :title="`你确定要删除${row.name}吗?`"
            width="260px"
            @confirm="handleClickDeleteMenu(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" :disabled="row.level === 1"
                >删除菜单</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="showDialog"
      :title="menuData.id ? '更新菜单' : '添加菜单'"
      width="30%"
    >
      <div>
        <el-form>
          <el-form-item label="名称">
            <el-input
              v-model="menuData.name"
              placeholder="请输入菜单的名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-input
              v-model="menuData.code"
              placeholder="请输入权限值"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button type="default" size="default" @click="handleClickCancel"
          >取消</el-button
        >
        <el-button type="primary" size="default" @click="handleClickSubmit"
          >确认</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrModifyMenu, reqDeleteMenu } from "@/api/acl/menu";
import { MenuParams } from "@/api/acl/menu/types";
import { reqGetAllPermissionsList } from "@/api/acl/role";
import { MenuItem } from "@/api/acl/role/types";
// @ts-ignore
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
// 所有的菜单权限列表数据
let listOfPermission = ref<Array<MenuItem>>([]);
// 控制dialog组件的显示与隐藏
let showDialog = ref<boolean>(false);
// 携带的参数
let menuData = reactive<MenuParams>({
  name: "",
  level: 0,
  pid: 0,
  code: "",
});
// 空数据格式参数
let clearParams: MenuParams = {
  name: "",
  level: 0,
  pid: 0,
  code: "",
};
// 获取所有菜单权限数据
async function getAllListOfPermission() {
  // 解构出所需的数据
  const { code, data } = await reqGetAllPermissionsList();
  // 短路操作进行判断
  code === 200 && (listOfPermission.value = data);
}

// 添加菜单按钮的事件回调
const handleClickAddMenuItem = (rowItem: MenuItem) => {
  // 显示dialog
  showDialog.value = true;
  // 收集菜单级别等数据
  menuData.level = rowItem.level + 1;
  // 为哪一个菜单新增子菜单
  menuData.pid = rowItem.id;
};

// 修改菜单按钮的事件回调
const handleCLickModifyMenuItem = (item: MenuItem) => {
  showDialog.value = true;
  // 点击修改按钮进行收集信息
  Object.assign(menuData, item);
};

// 点击确定按钮的事件回调
const handleClickSubmit = async () => {
  // 新增或者更新已有的菜单数据
  const { code } = await reqAddOrModifyMenu(menuData);
  // code进行判断
  if (code === 200) {
    // 关闭对话框
    showDialog.value = false;
    // 全局提示
    ElMessage({
      type: "success",
      message: menuData.id ? "更新成功" : "新增成功",
    });
    // 再次获取最新的数据
    getAllListOfPermission();
    clear();
  } else {
    // 全局提示
    ElMessage({
      type: "success",
      message: menuData.id ? "更新成功" : "新增成功",
    });
  }
};

// 点击取消按钮的事件回调
const handleClickCancel = () => {
  showDialog.value = false;
  clear();
};

// 点击删除菜单按钮的事件回调
const handleClickDeleteMenu = async (menuId: number) => {
  const { code } = await reqDeleteMenu(menuId);
  if (code === 200) {
    // 全局提示
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    // 再次获取最新的数据
    getAllListOfPermission();
    clear();
  } else {
    // 全局提示
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

// 清空数据函数
function clear() {
  Object.assign(menuData, clearParams);
  delete menuData.id;
}

// 组件挂载完毕获取所有的菜单数据
onMounted(() => {
  // 获取全部的菜单数据
  getAllListOfPermission();
});
</script>

<script lang="ts">
export default {
  name: "index",
};
</script>
<style lang="scss" scoped></style>
