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
          <el-input v-model="formData.password" autocomplete="off" :disabled="formData.id" />
        </el-form-item>
        <el-form-item label="角色信息">
          <div>
            <el-checkbox
              v-model="checkAll"
              @change="handleCheckAllChange"
              border
              :disabled="!formData.id"
              >全选</el-checkbox
            >
            <el-checkbox-group
              v-model="assignRoles"
              :indeterminate="isIndeterminate"
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

const defaultData: UserType = {
  username: "",
  name: "",
  password: "",
  updateTime: "",
  createTime: "",
  roleName: "",
};

let formData = ref<UserType>(props.data || defaultData);
const allRoles = ref<Array<RoleListItem>>([]);
const assignRoles = ref<Array<RoleListItem>>([]);
const checkAll = ref<boolean>(false);
const isIndeterminate = ref<boolean>(true);

const assignRoleDataFrom = reactive<AssignRoleData>({
  roleIdList: [],
  userId: "",
});
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
};

function assignRoleDataMethod() {
  assignRoles.value.forEach((element) => {
    assignRoleDataFrom.roleIdList.push(element.id);
  });
  assignRoleDataFrom.userId = formData.value.id as number;
}

const handleClickSubmit = async () => {
  await reqAddOneUser(formData.value);
  assignRoleDataMethod();
  if (formData.value.id) {
    await reqAssignRoleByUserId(assignRoleDataFrom);
  }
  emit("update:show", false);
};

const handleCheckAllChange = (val: boolean) => {
  assignRoles.value = val ? allRoles.value : [];
};

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRoles.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoles.value.length;
};

watch(props, (newVal) => {
  formData.value = newVal.data || defaultData;
  assignRoles.value = newVal.userRoles;
});

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
