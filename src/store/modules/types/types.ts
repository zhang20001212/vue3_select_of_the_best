import { RouteRecordRaw } from "vue-router";

// 定义分模块仓库数据类型
export type UserState = {
  token: string | null;
  menuRoutes?: Array<RouteRecordRaw>;
  username: string;
  avatar: string;
};
