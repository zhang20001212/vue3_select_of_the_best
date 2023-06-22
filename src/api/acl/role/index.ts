import request from "@/utils/request";
import {
  GetALlRoleListResponse,
  MenuDataResponse,
  RoleListItem,
} from "./types";

enum API {
  // 获取所有的角色信息
  GET_ALL_ROLES = "/admin/acl/role",
  // 新增一个职位
  POST_ADD_ROLE = "/admin/acl/role/save",
  // 修改一个职位
  PUT_MODIFY_ROLE = "/admin/acl/role/update",
  // 根据角色ID获取相应的权限
  GET_PERMISSIONS_BY_ROLE_ID_URL = "/admin/acl/permission/toAssign",
  // 获取全部的权限集
  GET_ALL_PERMISSION_URL = "/admin/acl/permission",
  // 为角色分配相应的职位
  ASSIGN_PERMISSION_BY_ROLE_ID_URL = "/admin/acl/permission/doAssignAcl",
  // 删除一个职位
  DELETE_ROLE_BY_ROLE_ID_URL = "/admin/acl/role/remove",
}

/**
 * 获取所有的角色信息
 * @param page 第几页
 * @param limit 一页几条
 * @param roleName 角色名称
 * @returns GetALlRoleListResponse
 */
export const reqGetAllRoleList = (
  page: number,
  limit: number,
  roleName: string
): Promise<GetALlRoleListResponse> => {
  return request({
    url: API.GET_ALL_ROLES + `/${page}/${limit}`,
    method: "GET",
    params: {
      roleName,
    },
  });
};

/**
 * 添加/修改角色信息
 * @param data RoleListItem
 * @returns { code: number; data: null; message: string; ok: boolean }
 */
export const reqAddOrModifyRole = (
  data: RoleListItem
): Promise<{ code: number; data: null; message: string; ok: boolean }> => {
  if (!data.id) {
    return request({
      url: API.POST_ADD_ROLE,
      method: "POST",
      data,
    });
  } else {
    return request({
      url: API.PUT_MODIFY_ROLE,
      method: "PUT",
      data,
    });
  }
};

/**
 * 根据角色Id获取权限集
 * @param roleId 角色ID
 * @returns MenuDataResponse
 */
export const reqGetPermissionAndParticleSizeBtnByRoleId = (
  roleId: number
): Promise<MenuDataResponse> => {
  return request({
    url: API.GET_PERMISSIONS_BY_ROLE_ID_URL + `/${roleId}`,
    method: "GET",
  });
};

/**
 * 获取所有的权限集
 * @returns MenuDataResponse
 */
export const reqGetAllPermissionsList = (): Promise<MenuDataResponse> => {
  return request({
    url: API.GET_ALL_PERMISSION_URL,
    method: "GET",
  });
};

/**
 * 根据角色Id分配权限
 * @param data body体发送数据的格式
 * @returns
 */
export const reqAssignPermissionByRoleId = (data: {
  permissionIdList: Array<number>;
  roleId: number;
}) => {
  return request({
    url: API.ASSIGN_PERMISSION_BY_ROLE_ID_URL,
    method: "POST",
    data,
  });
};

/**
 * 删除一个职位
 * @param roleId 角色ID
 * @returns
 */
export const reqDeleteRoleById = (
  roleId: number
): Promise<{ code: number; data: null; message: string; ok: boolean }> => {
  return request({
    url: API.DELETE_ROLE_BY_ROLE_ID_URL + `/${roleId}`,
    method: "DELETE",
  });
};
