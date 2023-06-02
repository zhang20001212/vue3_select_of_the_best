// 引入所有的全局组件
import SvgIcon from "@/components/SvgIcon/index.vue";
import Category from "@/components/Category/Category.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { App } from "vue";
const allGlobalComponents = {
  SvgIcon,
  Category,
};
export default {
  // 务必起名为install
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((key) => {
      // @ts-ignore
      app.component(key, allGlobalComponents[key]);
    });
    // 将ElementPlus提供的图片注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
