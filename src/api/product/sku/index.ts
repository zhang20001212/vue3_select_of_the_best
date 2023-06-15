import request from "@/utils/request";
import {
  AllSkuListResponse,
  GetOneSkuInfoResponse,
  PutAwayOrCancelSkuItemResponse,
} from "./types";
// 枚举所有的URL
enum API {
  // 获取所有的SKU
  ALL_SKU_URL = "/admin/product/list",
  // 上架一个SKU
  PUT_AWAY_URL = "/admin/product/onSale",
  // 下架一个SKU
  UN_PUT_AWAY_URL = "/admin/product/cancelSale",
  // 获取某一个SKU
  GET_SKU_INFO_URL = "/admin/product/getSkuInfo",
  // 删除一个SKU
  DELETE_SKU_URL = "/admin/product/deleteSku",
}

/**
 * 获取所有的SKU
 * @param page 第几页
 * @param limit 一页多少条数据
 * @returns AllSkuListResponse
 */
export const reqGetAllSkuList = (
  page: number,
  limit: number
): Promise<AllSkuListResponse> => {
  return request({
    url: API.ALL_SKU_URL + `/${page}/${limit}`,
    method: "GET",
  });
};

/**
 * 上架一个SKU
 * @param id Sku的Id
 * @returns PutAwayOrCancelSkuItemResponse
 */
export const reqOnSaleOneSku = (
  id: number
): Promise<PutAwayOrCancelSkuItemResponse> => {
  return request({
    url: API.PUT_AWAY_URL + `/${id}`,
    method: "GET",
  });
};

/**
 * 下架一个SKU
 * @param id Sku的Id
 * @returns PutAwayOrCancelSkuItemResponse
 */
export const reqCancelSaleOneSku = (
  id: number
): Promise<PutAwayOrCancelSkuItemResponse> => {
  return request({
    url: API.UN_PUT_AWAY_URL + `/${id}`,
    method: "GET",
  });
};

/**
 * 获取某一个Sku的全部信息
 * @param id Sku的Id
 * @returns GetOneSkuInfoResponse
 */
export const reqGetOneSkuInfo = (
  id: number
): Promise<GetOneSkuInfoResponse> => {
  // 函数体
  return request({
    url: API.GET_SKU_INFO_URL + `/${id}`,
    method: "GET",
  });
};

/**
 * 删除一个指定的Sku
 * @param id Sku的Id
 * @returns PutAwayOrCancelSkuItemResponse
 */
export const reqDeleteSkuItem = (
  id: number
): Promise<PutAwayOrCancelSkuItemResponse> => {
  return request({
    url: API.DELETE_SKU_URL + `/${id}`,
    method: "DELETE",
  });
};
