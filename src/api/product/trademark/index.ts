import request from "@/utils/request";
import {
  AddOrModifyTradeMark,
  ResponseDeleteTradeMark,
  ResponseTradeMarkData,
  TradeMarkItem,
} from "./types";

// 枚举API
enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  ADD_TRADEMARK_URL = "/admin/product/baseTrademark/save",
  MODIFY_TRADEMARK_URL = "/admin/product/baseTrademark/update",
  DELETE_TRADEMARK_URL = "/admin/product/baseTrademark/remove/",
}

/**
 * 获取商品品牌信息
 * @param page 第几页
 * @param limit 一页之中有多少条数据
 * @returns ResponseTradeMarkData
 */
export const reqHasTradeMark = (
  page: number,
  limit: number
): Promise<ResponseTradeMarkData> => {
  // 函数体
  return request({
    url: API.TRADEMARK_URL + `${page}/${limit}`,
  });
};

/**
 * 添加与修改商品品牌
 * @param data 需要新增或者修改的商品信息
 * @returns AddOrModifyTradeMark
 */
export const reqAddOrModifyTradeMark = (
  data: TradeMarkItem
): Promise<AddOrModifyTradeMark> => {
  //判断是否携带ID
  if (data.id) {
    // 更新操作
    return request({
      url: API.MODIFY_TRADEMARK_URL,
      method: "PUT",
      data,
    });
  } else {
    // 新增操作
    return request({
      url: API.ADD_TRADEMARK_URL,
      method: "POST",
      data,
    });
  }
};

/**
 * 删除某一个品牌信息
 * @param id 需要删除的品牌ID
 * @returns ResponseDeleteTradeMark
 */
export const reqDeleteTradeMark = (
  id: number
): Promise<ResponseDeleteTradeMark> => {
  return request({
    url: API.DELETE_TRADEMARK_URL + `${id}`,
    method: "DELETE",
  });
};
