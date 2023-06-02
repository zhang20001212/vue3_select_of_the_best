// 属性相关API
import request from "@/utils/request";
// 枚举相关API
enum API {
  CATEGORY1_URL = "/admin/product/getCategory1",
  CATEGORY2_URL = "/admin/product/getCategory2",
  CATEGORY3_URL = "/admin/product/getCategory3",
}

// 获取一级分类的所有属性
export const reqGetCategory1 = () => {
  // 函数体
  return request({
    url: API.CATEGORY1_URL,
    method: "GET",
  });
};

// 获取二级分类的所有属性
export const reqGetCategory2 = (id: number) => {
  // 函数体
  return request({
    url: API.CATEGORY2_URL + `/${id}`,
    method: "GET",
  });
};

// 获取三级分类所有的属性
export const reqGetCategory3 = (id: number) => {
  // 函数体
  return request({
    url: API.CATEGORY3_URL + `/${id}`,
    method: "GET",
  });
};
