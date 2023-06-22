<template>
  <div class="container">
    <el-dialog
      :model-value="show"
      :title="params.id ? '修改职位' : '添加职位'"
      width="30%"
      :show-close="false"
      @close="clearData"
    >
      <el-form ref="Form" :model="params" :rules="rules">
        <el-form-item label="职位名称" prop="roleName">
          <el-input v-model="params.roleName" placeholder="请输入职位名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="$emit('update:show', false)">取消</el-button>
          <el-button type="primary" @click="handleClickSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrModifyRole } from "@/api/acl/role";
import { RoleListItem } from "@/api/acl/role/types";
// @ts-ignore
import { ElForm } from "element-plus";
// @ts-ignore
import { ElMessage } from "element-plus";
import { nextTick, reactive, ref } from "vue";

interface Props {
  show: boolean;
  roleParams: RoleListItem;
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
});
// 表单参数
let params = reactive<RoleListItem>(props.roleParams);
// form组件
let Form = ref<InstanceType<typeof ElForm>>();
// 点击确定按钮的方法回调
const handleClickSubmit = async () => {
  // 表单校验是否通过,返回Promise,通过await的方式判断是否成功
  await Form.value.validate();
  // 添加或者更新职位请求
  const result = await reqAddOrModifyRole(params);
  if (result.code === 200) {
    // 全局提示用户
    ElMessage({
      type: "success",
      message: params.id ? `修改${result.message}` : `添加${result.message}`,
    });
    // 通知父组件进行关闭dialog组件操作
    emit("update:show", false);
  } else {
    // 全局提示用户
    ElMessage({
      type: "error",
      message: params.id ? `修改${result.message}` : `添加${result.message}`,
    });
  }
};

function clearData() {
  // 清空上一次校验表单的信息
  nextTick(() => {
    // 执行From组件的clearValidate()方法
    Form.value.clearValidate("roleName");
  });
}

// 职位名称的自定义校验规则函数
function roleNameValidate(rule: any, value: string, callBack: any) {
  console.log(rule);
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("职位名称至少为2位"));
  }
}
// 表单校验规则
const rules = {
  roleName: [{ required: true, trigger: "blur", validator: roleNameValidate }],
};
const emit = defineEmits(["update:show"]);
</script>

<script lang="ts">
export default {
  name: "roleEditDialog",
};
</script>
<style lang="scss" scoped></style>
