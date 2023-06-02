import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("settingStore", {
  state: () => {
    return {
      // 顶部组件的刷新按钮控制效果
      refresh: false,
    };
  },
});

export default useLayoutSettingStore;
