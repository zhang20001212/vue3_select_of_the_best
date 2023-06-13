import request from "@/utils/request";
import { AllSkuList } from "./type";

// 枚举所有的URL
enum API {
  // 获取所有的SKU
  ALL_SKU_URL = "/admin/product/list",
}

export const reqGetAllSkuList = (
  page: number,
  limit: number
): Promise<AllSkuList> => {
  return request({
    url: API.ALL_SKU_URL + `/${page}/${limit}`,
    method: "GET",
  });
};
