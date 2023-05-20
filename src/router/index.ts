import { constantRoutes } from "@/router/routes";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  // 路由模式hash
  history: createWebHashHistory(),
  routes: constantRoutes,
  //  滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
