<template>
  <div class="container">
    <el-card shadow="always" style="height: 75px; margin-bottom: 15px">
      <el-form :inline="true" size="normal" class="top-form">
        <el-form-item label="用户名:">
          <el-input
            v-model="searchKeyWords"
            placeholder="请输入搜索的用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="searchKeyWords ? false : true"
            @click="handleClickSearchByCondition"
            >搜索</el-button
          >
          <el-button type="default" size="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" size="default" @click="handleClickAddOneUser"
        >添加用户</el-button
      >
      <el-button
        type="danger"
        size="default"
        :disabled="batchUserId.length ? false : true"
        @click="handleClickBatchUser"
        >批量删除</el-button
      >
      <el-table
        :data="records"
        style="margin: 10px 0"
        border
        @selection-change="handleTableSelectionChange"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          type="index"
          width="80"
          label="#序号"
        ></el-table-column>
        <el-table-column align="center" label="#ID" prop="id"></el-table-column>
        <el-table-column
          align="center"
          label="#用户名字"
          show-overflow-tooltip
          prop="username"
        ></el-table-column>
        <el-table-column
          align="center"
          label="#用户名称"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="#用户角色"
          show-overflow-tooltip
          prop="roleName"
        ></el-table-column>
        <el-table-column
          align="center"
          label="#创建时间"
          show-overflow-tooltip
          prop="createTime"
        ></el-table-column>
        <el-table-column
          align="center"
          label="#更新时间"
          show-overflow-tooltip
          prop="updateTime"
        ></el-table-column>
        <el-table-column align="center" label="#操作" width="300">
          <template #="{ row }">
            <!-- <el-button type="primary" size="small" icon="User"
              >分配角色</el-button
            > -->
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="handleEditUserInfo(row)"
              >编辑用户</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="handleDeleteUserById(row)"
              >删除用户</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="getAllUserList"
        @size-change="handleSizeChange"
      />
      <!-- 修改添加用户dialog组件 -->
      <Dialog
        v-model:show="show"
        :data="userFormData"
        :userRoles="userRoles"
      ></Dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  reqBatchRemoveUser,
  reqDeleteUserById,
  reqGetAllUserList,
  reqGetRoleListByUserId,
} from "@/api/acl/user";
import { RoleListItem, UserType } from "@/api/acl/user/types";
import { Ref, onMounted, reactive, ref, watch } from "vue";
import Dialog from "./dialog.vue";
// @ts-ignore
import { ElMessage } from "element-plus";
// 当前第几页
let pageNo = ref<number>(1);
// 当前页有几条
let pageSize = ref<number>(5);
// 总条数
let total: Ref<number> = ref(0);
// 所有的用户信息
let records = ref<Array<UserType>>([]);
// 控制dialog显示与隐藏
let show = ref<boolean>(false);
// dialog中默认空的表单数据格式
let userFormData = reactive<UserType>({
  username: "",
  name: "",
  password: "",
  updateTime: "",
  createTime: "",
  roleName: "",
});
// 指定用户下的角色信息
let userRoles = ref<Array<RoleListItem>>([]);
// 批量删除的用户id
let batchUserId = ref<Array<number>>([]);
// 搜索框中的关键字
let searchKeyWords = ref<string>("");

// 获取所有的用户账号信息
async function getAllUserList() {
  // 网络请求
  const result = await reqGetAllUserList(
    pageNo.value,
    pageSize.value,
    searchKeyWords.value
  );
  // 判断成功与否
  if (result.code === 200) {
    // 存储数据
    total.value = result.data.total;
    records.value = result.data.records;
  }
}

// 修改用户信息的事件回调
const handleEditUserInfo = async (rowItem: UserType) => {
  // 进行网络请求获取选中的用户的角色信息
  const result = await reqGetRoleListByUserId(rowItem.id as number);
  // 进行用户信息表单赋值操作
  Object.assign(userFormData, rowItem);
  // 进行角色信息赋值操作
  userRoles.value = result.data.assignRoles;
  // 展示dialog
  show.value = true;
};

// 删除用户信息的事件回调
const handleDeleteUserById = async (rowItem: UserType) => {
  // 进行网络请求删除用户信息的操作
  const result = await reqDeleteUserById(rowItem.id as number);
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: `删除${result.message}`,
    });
    // 再次获取所有的用户信息
    getAllUserList();
    return "ok";
  } else {
    ElMessage({
      type: "error",
      message: `删除${result.message}`,
    });
    return "failed";
  }
};

// 当table表格勾选项发生变化时触发的函数回调
const handleTableSelectionChange = (value: Array<UserType>) => {
  // 声明新的数组对象进行存储id
  let newArr: Array<number> = [];
  value.forEach((element) => {
    newArr.push(element.id as number);
  });
  // 进行赋值
  batchUserId.value = newArr;
};

// 批量删除按钮事件回调
const handleClickBatchUser = async () => {
  const result = await reqBatchRemoveUser(batchUserId.value);
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: `批量删除${result.message}`,
    });
    // 再次获取所有的用户信息
    getAllUserList();
    return "ok";
  } else {
    ElMessage({
      type: "error",
      message: `批量删除${result.message}`,
    });
    return "failed";
  }
};

// 条件搜索按钮的事件回调
const handleClickSearchByCondition = () => {
  // 根据关键字再次获取数据
  getAllUserList();
  // 清空关键字
  searchKeyWords.value = "";
};

// 添加用户信息的事件回调
const handleClickAddOneUser = () => {
  // 显示dialog组件
  show.value = true;
};
// pagination中的size-change的事件回调
const handleSizeChange = () => {
  getAllUserList();
};

// 监听records数据的变化, 有变化发请求;
watch([show, searchKeyWords], () => {
  getAllUserList();
});

// 组件挂载完毕进行第一次捞取数据
onMounted(async () => {
  // 执行获取所有用户账号信息函数
  getAllUserList();
});
</script>

<script lang="ts">
export default {
  name: "index",
};
</script>
<style lang="scss" scoped>
.container {
  .top-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
