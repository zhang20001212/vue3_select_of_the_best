<template>
  <div>
    <svg :style="{ width: width + 'px', height: height + 'px' }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // xlink:href属性值的前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  // 提供使用图标的名字
  name: {
    type: String,
    default: "",
  },
  // 接受提供的颜色
  color: {
    type: String,
    default: "",
  },
  // 接收的宽度和高度
  width: {
    type: String,
    default: "16",
  },
  height: {
    type: String,
    default: "16",
  },
});
</script>

<style scoped></style>
