import { ResponseData } from "@/api/user/type";

export interface GetALlRoleListResponse extends ResponseData {
  data: {
    records: Array<RoleListItem>;
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

export type RoleListItem = {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: null;
};

// 菜单按钮权限数据模型
export type MenuItem = {
  id: number;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number;
  children?: Array<MenuItem>;
  select: boolean;
};

export interface MenuDataResponse extends ResponseData {
  data: Array<MenuItem>;
}