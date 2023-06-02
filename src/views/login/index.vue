<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          ref="form"
          :model="loginFormData"
          :rules="rules"
          class="container__login-section"
        >
          <h1>Hello</h1>
          <h2>欢迎来到臻品甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              placeholder="请输入用户名"
              v-model="loginFormData.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              v-model="loginFormData.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              size="default"
              :loading="loading"
              @click="handleLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { getDate } from "@/utils/getDate";
import { Lock, User } from "@element-plus/icons-vue";
// @ts-ignore
import { ElNotification } from "element-plus";
// @ts-ignore
import { FormRules } from "element-plus/es/components/index.js";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let loading = ref(false);
let form = ref();
let loginFormData = reactive({
  username: "admin",
  password: "atguigu123",
});
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      min: 5,
      max: 10,
      message: "用户名长度为5-10位",
      trigger: "change",
    },
  ],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});
const timerRange = getDate();

/**
 * 登录按钮的回调
 */
const handleLogin = async () => {
  await form.value.validate();
  loading.value = true;
  // 点击后通知仓库进行api请求
  // 请求成功跳转到首页
  // 失败的话弹出信息
  try {
    await useUserStore().login(loginFormData);
    await useUserStore().fetchUserInfo();
    await router.push({ name: "dashboard" });
    ElNotification({
      type: "success",
      message: "登陆成功",
      title: `HI,${timerRange}好`,
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};
</script>

<style scoped lang="scss">
.container {
  background: url(../../assets/images/background.jpg) no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  &__login-section {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url(../../assets/images/login_form.png) no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
