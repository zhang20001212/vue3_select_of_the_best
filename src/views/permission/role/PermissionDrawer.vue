<template>
  <div class="container">
    <el-drawer
      direction="rtl"
      size="30%"
      :model-value="showDrawer"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
      @close="$emit('update:showDrawer', false)"
    >
      <template #header>
        <h4>分配权限与按钮权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="SelectTree"
          :data="permissionParams"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="selectionId"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button
            type="default"
            size="default"
            @click="$emit('update:showDrawer', false)"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="default"
            @click="handleClickAssignPermissions"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqAssignPermissionByRoleId } from "@/api/acl/role";
import { MenuItem } from "@/api/acl/role/types";
// @ts-ignore
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";

interface Props {
  showDrawer: boolean;
  menuPermissions: Array<MenuItem>;
  selectedId: Array<number>;
  roleId: number;
}
let props = withDefaults(defineProps<Props>(), {
  showDrawer: false,
});
const defaultProps = {
  children: "children",
  label: "name",
};
let permissionParams = ref<Array<MenuItem>>(props.menuPermissions);
let selectionId = ref<Array<number>>(props.selectedId);
let id = ref<number>(props.roleId);
const SelectTree = ref();
const handleClickAssignPermissions = async () => {
  // select组件全选的ID
  let checkedKeys: Array<number> = SelectTree.value.getCheckedKeys();
  // 半选的ID
  let checkedHalfKeys: Array<number> = SelectTree.value.getHalfCheckedKeys();
  let newArr = checkedKeys.concat(checkedHalfKeys);
  let newObj = {
    permissionIdList: newArr,
    roleId: id.value,
  };
  const { code, message }: any = await reqAssignPermissionByRoleId(newObj);
  if (code === 200) {
    emit("update:showDrawer", false);
    ElMessage({
      type: "success",
      message: "分配权限" + message,
    });
    window.location.reload();
    return "OK";
  } else {
    ElMessage({
      type: "success",
      message: "分配权限" + message,
    });
    return "Failed";
  }
};
watch(props, (newVal) => {
  permissionParams.value = newVal.menuPermissions;
  selectionId.value = newVal.selectedId;
  id.value = newVal.roleId;
});
const emit = defineEmits(["update:showDrawer"]);
</script>

<script lang="ts">
export default {
  name: "PermissionDrawer",
};
</script>
<style lang="scss" scoped></style>
