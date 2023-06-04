import { Attr, CategoryItem } from "@/api/product/attr/types";
import { RouteRecordRaw } from "vue-router";

// 定义分模块仓库数据类型
export type UserState = {
  token: string | null;
  menuRoutes?: Array<RouteRecordRaw>;
  username: string;
  avatar: string;
};

// 定义分类仓库的数据模型
export type CategoryState = {
  c1Id: string | number;
  categoryOne: Array<CategoryItem>;
  c2Id: string | number;
  categoryTwo: Array<CategoryItem>;
  c3Id: string | number;
  categoryThree: Array<CategoryItem>;
};
