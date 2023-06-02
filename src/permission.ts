// 路由鉴权设置

import router from "@/router";
import setting from "@/setting";
// @ts-ignore
import pinia from "@/store";
import { useUserStore } from "@/store/modules/user";
// @ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false });
const store = useUserStore(pinia);
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title}-${to.meta.title}`;
  nprogress.start();
  // 用户登录的情况下
  if (store.token) {
    if (to.path === "/login") {
      next({ name: "dashboard" });
    } else {
      if (store.username) {
        // 登录成功后，成功的取得了用户的信息就可以向下进行
        next();
      } else {
        // 登录后如果没有成功取得用户的信息,就在此进行获取到用户信息在像下面进行
        try {
          await store.fetchUserInfo();
          next();
        } catch (error) {
          // token过期或者用户手动修改了本地存储的token
          // 清空掉用户相关的数据
          await store.userLogout();
          next(`/login?redirect=${from.fullPath}`);
        }
      }
    }
  } else {
    // 未登录的情况
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

router.afterEach((to, from) => {
  nprogress.done();
});
