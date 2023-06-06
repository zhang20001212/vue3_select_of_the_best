// SPU管理模块接口

import request from "@/utils/request";
import {
  SpuTradeMarkAttributeResponseData,
  SpuResponseData,
  SpuImageListResponseData,
  SpuSaleAttrListResponseData,
  BaseSaleAttrResponseData,
} from "./types";

// 枚举API所的接口
enum API {
  // 获取已有的SPU的数据
  GET_SPU_URL = "/admin/product",
  // 平台中所有品牌的数据
  ALL_TRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  // 某一个SPU下的全部商品图片的数据
  SPU_IMAGE_LIST_URL = "/admin/product/spuImageList",
  // 某一个SPU下的全部商品的销售属性的数据
  SPU_SALE_ATTR_LIST_URL = "/admin/product/spuSaleAttrList",
  // 平台所有的销售属性[颜色，版本，尺码]
  ALL_SALE_ATTR_URL = "/admin/product/baseSaleAttrList",
}

/**
 * 获取所有SPU
 * @param page 当前的页码
 * @param limit 一页多少条数据
 * @param c3Id 三级Id
 * @returns 待定
 */
export const reqGetSpu = (
  page: number,
  limit: number,
  c3Id: number | string
): Promise<SpuResponseData> => {
  return request({
    url: API.GET_SPU_URL + `/${page}/${limit}`,
    method: "GET",
    params: {
      category3Id: c3Id,
    },
  });
};

// 获取平台中所有的品牌的数据
export const reqGetTradeMarkAllAttribute =
  (): Promise<SpuTradeMarkAttributeResponseData> => {
    return request({
      url: API.ALL_TRADEMARK_URL,
      method: "GET",
    });
  };

/**
 * 获取某一个spu的全部商品图片
 * @param id spuId 某一个spu的id
 * @returns SpuImageListResponseData
 */
export const reqGetSpuImageList = (
  id: number
): Promise<SpuImageListResponseData> => {
  return request({
    url: API.SPU_IMAGE_LIST_URL + `/${id}`,
    method: "GET",
  });
};

/**
 * 获取某一个spu的全部销售属性值
 * @param id spuId 某一个spu的id
 * @returns SpuSaleAttrListResponseData
 */
export const reqGetSpuSaleAttrList = (
  id: number
): Promise<SpuSaleAttrListResponseData> => {
  return request({
    url: API.SPU_SALE_ATTR_LIST_URL + `${id}`,
    method: "GET",
  });
};

// 获取平台上的所有的基础销售属性
export const reqGetAllBaseSaleAttrList =
  (): Promise<BaseSaleAttrResponseData> => {
    return request({
      url: API.ALL_SALE_ATTR_URL,
      method: "GET",
    });
  };
