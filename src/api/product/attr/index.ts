// 属性相关API
import request from "@/utils/request";
import {
  AddOrModifyAttrResponseData,
  Attr,
  AttrResponseData,
  CategoryResponseData,
  DeleteAttrResponseData,
} from "./types";
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
  // 添加或者修改已有属性和属性值
  ADD_OR_MODIFY_ATTR_URL = "/admin/product/saveAttrInfo",
  // 删除某一个已有的属性
  DELETE_ATTR_URL = "/admin/product/deleteAttr",
}

/**
 * 获取一级分类所有的数据
 * @returns CategoryResponseData
 */
export const reqGetCategory1 = (): Promise<CategoryResponseData> => {
  return request({
    url: API.CATEGORY1_URL,
    method: "GET",
  });
};

/**
 * 获取二级分类的所有属性
 * @param id 一级分类的Id
 * @returns CategoryResponseData
 */
export const reqGetCategory2 = (
  id: number | string
): Promise<CategoryResponseData> => {
  return request({
    url: API.CATEGORY2_URL + `/${id}`,
    method: "GET",
  });
};

/**
 * 获取三级分类所有的属性
 * @param id 二级分类的id
 * @returns CategoryResponseData
 */
export const reqGetCategory3 = (
  id: number | string
): Promise<CategoryResponseData> => {
  return request({
    url: API.CATEGORY3_URL + `/${id}`,
    method: "GET",
  });
};

/**
 * 获取已经分类好的所有属性和属性值
 * @param category1Id 一级分类的Id
 * @param category2Id 二级分类的Id
 * @param category3Id 三级分类的Id
 * @returns AttrResponseDate
 */
export const reqAllAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
): Promise<AttrResponseData> => {
  return request({
    url: API.ATTR_URL + `/${category1Id}/${category2Id}/${category3Id}`,
    method: "GET",
  });
};

/**
 * 新增或修改属性接口
 * @param data 需要修改或新增的属性
 * @returns AddOrMOdifyAttrResponseData
 */
export const reqAddOrModifyAttr = (
  data: Attr
): Promise<AddOrModifyAttrResponseData> => {
  return request({
    url: API.ADD_OR_MODIFY_ATTR_URL,
    method: "POST",
    data,
  });
};

/**
 * 删除已有的属性
 * @param id 需要删除的属性id值
 * @returns DeleteAttrResponseData
 */
export const reqDeleteAttr = (
  id: number | string
): Promise<DeleteAttrResponseData> => {
  return request({
    url: API.DELETE_ATTR_URL + `/${id}`,
    method: "DELETE",
  });
};
