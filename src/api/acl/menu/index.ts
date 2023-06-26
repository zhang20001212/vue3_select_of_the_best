import request from "@/utils/request";
import { AddOrModifyMenuResponse, MenuParams } from "./types";
import { ResponseData } from "@/api/user/type";

enum API {
  // 给某一个菜单添加一个子菜单项
  POST_ADD_MENU_WITH_SUBMENU_URL = "/admin/acl/permission/save",
  // 更新某一个已有的菜单
  PUT_MODIFY_MENU_URL = "/admin/acl/permission/update",
  // 删除已有的菜单项
  DELETE_MENU_URL = "/admin/acl/permission/remove",
}

/**
 * 添加或修改菜单
 * @param 参数对象
 * @returns AddOrModifyMenuResponse
 */
export const reqAddOrModifyMenu = (
  data: MenuParams
): Promise<AddOrModifyMenuResponse> => {
  // 带有id进行更新操作
  if (data.id) {
    return request({
      url: API.PUT_MODIFY_MENU_URL,
      data,
      method: "PUT",
    });
  } else {
    // 没有id进行新增操作
    return request({
      url: API.POST_ADD_MENU_WITH_SUBMENU_URL,
      data,
      method: "POST",
    });
  }
};

/**
 * 删除一个已有的菜单
 * @param id 菜单id
 * @returns { code: number; data: null; message: string; ok: boolean }
 */
export const reqDeleteMenu = (
  id: number
): Promise<{ code: number; data: null; message: string; ok: boolean }> => {
  return request({
    url: API.DELETE_MENU_URL + `/${id}`,
    method: "DELETE",
  });
};
