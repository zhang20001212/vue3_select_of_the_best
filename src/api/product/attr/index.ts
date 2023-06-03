// 属性相关API
import request from "@/utils/request";
import { Attr, CategoryResponseData } from "./types";
// 枚举相关API
enum API {
  // 一级分类
  CATEGORY1_URL = "/admin/product/getCategory1",
  // 二级分类
  CATEGORY2_URL = "/admin/product/getCategory2",
  // 三级分类
  CATEGORY3_URL = "/admin/product/getCategory3",
  // 获取已经分类好的所有的属性和属性值
  ATTR_URL = "/admin/product/attrInfoList",
}

// 获取一级分类的所有属性
export const reqGetCategory1 = (): Promise<CategoryResponseData> => {
  // 函数体
  return request({
    url: API.CATEGORY1_URL,
    method: "GET",
  });
};

// 获取二级分类的所有属性
export const reqGetCategory2 = (
  id: number | string
): Promise<CategoryResponseData> => {
  // 函数体
  return request({
    url: API.CATEGORY2_URL + `/${id}`,
    method: "GET",
  });
};

// 获取三级分类所有的属性
export const reqGetCategory3 = (
  id: number | string
): Promise<CategoryResponseData> => {
  // 函数体
  return request({
    url: API.CATEGORY3_URL + `/${id}`,
    method: "GET",
  });
};

// 获取已经分类好的所有属性和属性值
export const reqAllAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
): Promise<Attr> => {
  return request({
    url: API.ATTR_URL + `/${category1Id}/${category2Id}/${category3Id}`,
    method: "GET",
  });
};
