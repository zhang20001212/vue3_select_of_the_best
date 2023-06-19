<template>
  <div class="container">
    <el-dialog
      :model-value="show"
      :title="!formData.id ? '添加用户' : '修改用户'"
      @close="handleClearData"
    >
      <el-form>
        <el-form-item label="用户名字">
          <el-input v-model="formData.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="formData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input
            v-model="formData.password"
            autocomplete="off"
            :disabled="formData.id"
          />
        </el-form-item>
        <el-form-item label="角色信息">
          <div>
            <el-checkbox
              v-model="checkAll"
              @change="handleCheckAllChange"
              :disabled="!formData.id"
              :indeterminate="isIndeterminate"
              >全选</el-checkbox
            >
            <el-checkbox-group
              v-model="assignRoles"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="role in allRoles"
                :key="role.id"
                :label="role"
                :disabled="!formData.id"
                >{{ role.roleName }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('update:show', false)">取消</el-button>
          <el-button type="primary" @click="handleClickSubmit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOneUser,
  reqAssignRoleByUserId,
  reqGetRoleListByUserId,
} from "@/api/acl/user";
import { RoleListItem, UserType, AssignRoleData } from "@/api/acl/user/types";
// @ts-ignore
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref, watch } from "vue";
interface Props {
  show: boolean;
  data: UserType | null;
  userRoles: Array<RoleListItem>;
}
const emit = defineEmits(["update:show"]);
const props = withDefaults(defineProps<Props>(), {
  show: false,
});

// 空格式表单数据
const defaultData: UserType = {
  username: "",
  name: "",
  password: "",
  updateTime: "",
  createTime: "",
  roleName: "",
};

// 表单数据
let formData = ref<UserType>(props.data || defaultData);
// 所有的角色信息
const allRoles = ref<Array<RoleListItem>>([]);
// 当前用户的角色信息
const assignRoles = ref<Array<RoleListItem>>([]);
// 控制全选按钮
const checkAll = ref<boolean>(false);
// 控制全选按钮不确定状态
const isIndeterminate = ref<boolean>(true);
// 角色信息表单数据
const assignRoleDataFrom = reactive<AssignRoleData>({
  roleIdList: [],
  userId: "",
});

// 清空数据函数
const handleClearData = () => {
  emit("update:show", false);
  formData.value.username = "";
  formData.value.name = "";
  formData.value.password = "";
  formData.value.roleName = "";
  formData.value.updateTime = "";
  formData.value.createTime = "";
  delete formData.value.id;
  assignRoles.value.splice(0);
  checkAll.value = false;
};

// 修改角色信息格式函数
function assignRoleDataMethod() {
  assignRoles.value.forEach((element) => {
    assignRoleDataFrom.roleIdList.push(element.id);
  });
  assignRoleDataFrom.userId = formData.value.id as number;
}

// 点击确认按钮提交信息方法回调
const handleClickSubmit = async () => {
  // 进行网络请求
  const result = await reqAddOneUser(formData.value);
  // code码判断成功与失败
  if (result.code === 200) {
    // 全局提示用户
    ElMessage({
      type: "success",
      message: formData.value.id
        ? `修改${result.message}`
        : `添加${result.message}`,
    });
    // 对角色数据的整理
    assignRoleDataMethod();
    // 如果是修改操作执行分配角色动作
    if (formData.value.id) {
      await reqAssignRoleByUserId(assignRoleDataFrom);
    }
  }
  emit("update:show", false);
};

// 全选按钮改变的方法回调
const handleCheckAllChange = (val: boolean) => {
  // 点击全选按钮，把所有的角色信息进行勾选，否则置空
  assignRoles.value = val ? allRoles.value : [];
};

// 点击单选框按钮改变的方法回调
const handleCheckedCitiesChange = (value: string[]) => {
  // 得到勾选的信息数组
  const checkedCount = value.length;
  // 如果勾选的数组信息长度等于了所有角色信息数组长度，将全选按钮进行勾选
  checkAll.value = checkedCount === allRoles.value.length;
  // 如果单选按钮勾选的数据长度大于0而且小于了所有角色信息数组长度进行赋值
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoles.value.length;
  console.log(isIndeterminate.value);
};

// 监听父组件传递过来的数据props,改变的话进行替换复制操作
watch(props, (newVal) => {
  formData.value = newVal.data || defaultData;
  assignRoles.value = newVal.userRoles;
});

// 当组件挂载完毕进行获取全部的用户角色信息
onMounted(async () => {
  const result = await reqGetRoleListByUserId(1);
  allRoles.value = result.data.allRolesList;
});
</script>

<script lang="ts">
export default {
  name: "dialog",
};
</script>
<style lang="scss" scoped></style>
