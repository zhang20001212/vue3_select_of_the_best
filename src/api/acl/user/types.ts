import { ResponseData } from "@/api/user/type";

export interface UserListResponseData extends ResponseData {
  data: {
    records: Array<UserType>;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}

export type UserType = {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username?: string;
  password?: string;
  name?: string;
  phone?: null;
  roleName?: string;
};

export interface AddUserResponse extends ResponseData {
  data: null;
}

export interface RoleListResponseData extends ResponseData {
  data: {
    assignRoles: Array<RoleListItem>;
    allRolesList: Array<RoleListItem>;
  };
}

export type RoleListItem = {
  id: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark: null;
};

export type AssignRoleData = {
  roleIdList: Array<number>;
  userId: string | number;
};

export interface AssignRoleResponse extends ResponseData {
  data: null;
}

export interface DeleteUserInfoResponse extends ResponseData {
  data: null;
}
