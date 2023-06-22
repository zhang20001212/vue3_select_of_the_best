<template>
  <div class="container">
    <el-card style="height: 75px">
      <el-form :inline="true" class="form">
        <el-form-item label="职位搜索">
          <el-input
            v-model="keywords"
            placeholder="请输入职位关键字"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" size="default">搜索</el-button> -->
          <el-button type="default" size="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="handleClickAddRole"
        >添加职位</el-button
      >
      <el-table :data="roleList" style="margin: 10px 0" border stripe>
        <el-table-column type="index" width="50" label="#" align="center" />
        <el-table-column prop="id" align="center" label="ID"> </el-table-column>
        <el-table-column prop="roleName" align="center" label="职位名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          align="center"
          label="更新时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column align="center" label="操作" width="280px">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="handleClickAssignPermissions(row)"
              >分配权限</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="handleClickModifyRole(row)"
              >编辑</el-button
            >
            <el-popconfirm
              :title="`确认删除${row.roleName}`"
              @confirm="handleClickRemoveRole(row)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="pageNo"
        v-model:page-size="pageSize"
        @current-change="getAllRoleList"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 30, 40]"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <!-- 添加/修改角色信息Dialog组件 -->
    <roleEditDialog
      v-model:show="show"
      :roleParams="roleParams"
    ></roleEditDialog>
    <!-- 为角色分配权限Drawer组件 -->
    <PermissionDrawer
      v-model:showDrawer="showDrawer"
      :menuPermissions="permissions"
      :selectedId="selectedOptionId"
      :roleId="roleId"
    ></PermissionDrawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqDeleteRoleById,
  reqGetAllRoleList,
  reqGetPermissionAndParticleSizeBtnByRoleId,
} from "@/api/acl/role";
import { MenuItem, RoleListItem } from "@/api/acl/role/types";
import { onMounted, reactive, ref, watch } from "vue";
import roleEditDialog from "./roleEditDialog.vue";
import PermissionDrawer from "./PermissionDrawer.vue";
// @ts-ignore
import { ElMessage } from "element-plus";
// 当前页码
let pageNo = ref<number>(1);
// 一页多少条
let pageSize = ref<number>(10);
// 查询职位名称关键字
let keywords = ref<string>("");
// 所有角色信息
let roleList = ref<Array<RoleListItem>>([]);
// 总条数
let total = ref<number>();
// 控制dialog的显示与隐藏
let show = ref<boolean>(false);
// 控制drawer的显示与隐藏
let showDrawer = ref<boolean>(false);
// 新增岗位的数据
let roleParams = reactive<RoleListItem>({
  roleName: "",
});
// 用户权限的数据
let permissions = ref<Array<MenuItem>>([]);
// 默认勾选的option的id
let selectedOptionId = ref<Array<number>>([]);
// 当前点击的角色ID
let roleId = ref<number>(0);

// 删除一个职位信息
const handleClickRemoveRole = async (rowItem: RoleListItem) => {
  const { code, message } = await reqDeleteRoleById(rowItem.id as number);
  if (code === 200) {
    ElMessage({
      type: "success",
      message: `删除${message}`,
    });
    getAllRoleList(roleList.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: "error",
      message: `删除${message}`,
    });
  }
};

// 过滤出已经勾选上的数据
function filterHasSelectedOptions(
  permission: Array<MenuItem>,
  filteredOutId: Array<number>
): Array<number> {
  // 进行遍历所有的权限集
  permission.forEach((item: MenuItem) => {
    // 由于select组件的特性,父option为勾选状态，子option就会勾选，而勾选了子option，父option会变为临界勾选状态
    // 由于该后台提供的权限集只有一到四级，第四级为颗粒度权限集，所有只需要从第四级的option进行过滤
    if (item.select && item.level === 4) {
      // 如果option被勾选，并且为4级权限，就进行空数组后追加一个元素id
      filteredOutId.push(item.id);
    }
    // 如果每个option下存在着children元素而且children的数据长度大于0就进行递归操作
    if (item.children && item.children.length > 0) {
      filterHasSelectedOptions(item.children, filteredOutId);
    }
  });
  return filteredOutId;
}

// 分配权限按钮的方法回调
const handleClickAssignPermissions = async (row: RoleListItem) => {
  // 展示drawer组件
  showDrawer.value = true;
  // 解构出所需要使用的数据
  const { code, data } = await reqGetPermissionAndParticleSizeBtnByRoleId(
    row.id as number
  );
  // code码判断成功与失败
  if (code === 200) {
    // 进行存储数据
    permissions.value = data;
    selectedOptionId.value = filterHasSelectedOptions(permissions.value, []);
  }
  roleId.value = row.id as number;
};
// 点击编辑按钮的方法回调
const handleClickModifyRole = (rowItem: RoleListItem) => {
  // 显示dialog
  show.value = true;
  Object.assign(roleParams, rowItem);
};

// 点击添加职位按钮的方法回调
const handleClickAddRole = () => {
  // 显示dialog
  show.value = true;
  roleParams.roleName = "";
  roleParams.createTime = "";
  roleParams.updateTime = "";
  delete roleParams.id;
};

// 分页器pageSize属性变化的方法回调
const handleSizeChange = () => {
  getAllRoleList();
};

// 获取所有角色信息的函数
async function getAllRoleList(pager: number = 1) {
  // 修改当前的页码
  pageNo.value = pager;
  // 进行网络请求
  const result = await reqGetAllRoleList(
    pageNo.value,
    pageSize.value,
    keywords.value
  );
  // code判断成功与失败
  if (result.code === 200) {
    // 存储数据
    roleList.value = result.data.records;
    total.value = result.data.total;
  }
}

// 监听关键字变化,变化进行网络请求
watch([show, keywords], ([showNewVal, keyNewVal]) => {
  console.log(showNewVal, keyNewVal);
  getAllRoleList();
});

// 组件挂载完毕获取所有的角色信息
onMounted(() => {
  // 获取所有的角色信息
  getAllRoleList();
});
</script>

<script lang="ts">
export default {
  name: "index",
};
</script>
<style lang="scss" scoped>
.container {
  .form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
