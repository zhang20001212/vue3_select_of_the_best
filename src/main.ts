import { createApp } from "vue";
// 引入ElementPlus的UI组件库和样式文件
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// svg图标插件引入
import "virtual:svg-icons-register";
// 引入全局样式文件
import "@/style/index.scss";
// 配置element国际化
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import App from "./App.vue";
// 引入自定义插件对象：注册整个项目中的全局组件
import globalComponent from "@/components";
import router from "@/router/index";
import pinia from "@/store/index";
// 获取应用组件实例
const app = createApp(App);
// 使用elementplusUI组件库
app.use(ElementPlus, {
  locale: zhCn, // 国际化配置
});
app.use(globalComponent);
app.use(router);
app.use(pinia);
// 将应用组件挂载到挂载点上
app.mount("#app");
