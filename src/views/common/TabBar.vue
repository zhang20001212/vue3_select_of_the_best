<template>
  <div class="container">
    <!-- 面包屑区域 -->
    <div class="container__hamburger">
      <BreadCrumbs />
    </div>
    <!-- 按钮区域 -->
    <div class="container__btn">
      <SettingBtn />
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs.vue";
import SettingBtn from "@/components/SettingButton/SettingBtn.vue";
</script>

<script lang="ts">
export default {
  name: "TabBar",
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
