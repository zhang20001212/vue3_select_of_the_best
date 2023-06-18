import request from "@/utils/request";
import {
  AddUserResponse,
  AssignRoleData,
  AssignRoleResponse,
  RoleListResponseData,
  UserListResponseData,
  UserType,
} from "./types";

// 用户管理模块
enum API {
  // 获取全部已有用户的账号信息
  GET_ALL_USER_URL = "/admin/acl/user",
  // 新增用户
  POST_ADD_USER_URL = "/admin/acl/user/save",
  // 更新已有的账号信息
  PUT_MODIFY_USER_URL = "/admin/acl/user/update",
  // 获取角色信息
  GET_ROLE_LIST_URL = "/admin/acl/user/toAssign",
  // 分配角色
  POST_ASSIGN_ROLE_URL = "/admin/acl/user/doAssignRole",
  // 删除用户
  DELETE_USER_BY_ID_URL = "/admin/acl/user/remove",
}

export const reqGetAllUserList = (
  page: number,
  limit: number
): Promise<UserListResponseData> => {
  return request({
    url: API.GET_ALL_USER_URL + `/${page}/${limit}`,
  });
};

export const reqAddOneUser = (data: UserType): Promise<AddUserResponse> => {
  // 新增用户
  if (!data.id) {
    return request({
      url: API.POST_ADD_USER_URL,
      method: "POST",
      data,
    });
  } else {
    // 修改已有用户信息
    return request({
      url: API.PUT_MODIFY_USER_URL,
      method: "PUT",
      data,
    });
  }
};

/**
 * 根据当前用户获取到当前的角色信息
 * @param id 当前用户的id
 * @returns RoleListResponseData
 */
export const reqGetRoleListByUserId = (
  id: number
): Promise<RoleListResponseData> => {
  return request({
    url: API.GET_ROLE_LIST_URL + `/${id}`,
    method: "GET",
  });
};

/**
 * 为用户分配角色
 * @param data 角色id以及用户id
 * @returns AssignRoleResponse
 */
export const reqAssignRoleByUserId = (
  data: AssignRoleData
): Promise<AssignRoleResponse> => {
  return request({
    url: API.POST_ASSIGN_ROLE_URL,
    method: "POST",
    data,
  });
};

/**
 * 根据用户id删除指定的用户
 * @param id 用户id
 * @returns any
 */
export const reqDeleteUserById = (id: number | string) => {
  return request({
    url: API.DELETE_USER_BY_ID_URL + `/${id}`,
    method: "DELETE",
  });
};
