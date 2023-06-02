<template>
  <el-button type="large" icon="Refresh" circle />
  <el-button type="large" icon="FullScreen" circle />
  <el-button type="large" icon="Setting" circle />
  <el-avatar
    class="container__btn--avatar"
    size="default"
    :src="userInfo.avatar"
  />
  <div class="container__btn--user" style="cursor: pointer">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userInfo.username }}
        <el-icon class="el-icon--right">
          <component is="ArrowDown"></component>
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          <el-dropdown-item>关于信息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const userInfo = useUserStore();
const logout = async () => {
  await useUserStore().userLogout();
  router.push(`/login?redirect=${route.fullPath}`);
};
</script>
<script lang="ts">
export default {
  name: "SettingBtn",
};
</script>
<style lang="scss" scoped>
.container__btn--avatar {
  margin-left: 10px;
}
.container__btn--user {
  margin-left: 10px;
}
</style>
