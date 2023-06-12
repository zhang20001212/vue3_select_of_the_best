import LayoutView from "@/views/common/Layout.vue";
import PageLayout from "@/views/common/PageLayout.vue";
import { RouteRecordRaw } from "vue-router";
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: { title: "登录", icon: "" },
  },
  {
    path: "/",
    component: LayoutView,
    redirect: "dashboard",
    name: "root",
    meta: { title: "", icon: "" },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "控制台", icon: "Odometer" },
      },
      {
        path: "screen",
        name: "screen",
        component: () => import("@/views/screen/index.vue"),
        meta: { title: "数据大屏", icon: "DataBoard" },
      },
      {
        path: "user",
        name: "user",
        redirect: { name: "user-list" },
        meta: { title: "权限管理", icon: "Lock" },
        component: PageLayout,
        children: [
          {
            path: "userlist",
            name: "user-list",
            component: () => import("@/views/permission/user/index.vue"),
            meta: { title: "用户管理", icon: "User" },
          },
          {
            path: "rolelist",
            name: "role-list",
            component: () => import("@/views/permission/role/index.vue"),
            meta: { title: "角色管理", icon: "Avatar" },
          },
          {
            path: "menulist",
            name: "menu-list",
            component: () => import("@/views/permission/menu/index.vue"),
            meta: { title: "菜单管理", icon: "Menu" },
          },
        ],
      },
      {
        path: "product",
        name: "product",
        meta: { title: "商品管理", icon: "Goods" },
        component: () => PageLayout,
        redirect: { name: "brand-list" },
        children: [
          {
            path: "brandlist",
            name: "brand-list",
            component: () => import("@/views/product/brand/index.vue"),
            meta: { title: "品牌管理", icon: "ShoppingCart" },
          },
          {
            path: "attrlist",
            name: "attr-list",
            component: () => import("@/views/product/attr/index.vue"),
            meta: { title: "属性管理", icon: "Coin" },
          },
          {
            path: "spulist",
            name: "spu-list",
            component: () => import("@/views/product/spu/index.vue"),
            meta: { title: "SPU管理", icon: "Stamp" },
          },
          {
            path: "skulist",
            name: "sku-list",
            component: () => import("@/views/product/sku/index.vue"),
            meta: { title: "SKU管理", icon: "Apple" },
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
  },
];
