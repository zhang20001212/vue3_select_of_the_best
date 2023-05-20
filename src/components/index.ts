// 引入所有的全局组件
import SvgIcon from "@/components/SvgIcon/index.vue";
import { App } from "vue";

const allGlobalComponents = {
  SvgIcon,
};

export default {
  // 务必起名为install
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((key) => {
        // @ts-ignore
        app.component(key,allGlobalComponents[key])
    });
  },
};
