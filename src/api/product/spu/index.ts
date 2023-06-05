// SPU管理模块接口

import request from "@/utils/request";

// 枚举API所的接口
enum API {
  // 获取已有的SPU的数据
  GET_SPU_URL = "/admin/product",
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
) => {
  return request({
    url: API.GET_SPU_URL + `/${page}/${limit}`,
    method: "GET",
    params: {
      category3Id: c3Id,
    },
  });
};
