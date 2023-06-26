import { ResponseData } from "@/api/user/type";

export type MenuParams = {
  id?: number; // 菜单的id
  code: string; // 权限值
  level: number; // 几级菜单项
  name: string; // 菜单的名字
  pid: number; // 菜单的id
};

export interface AddOrModifyMenuResponse extends ResponseData {
  data: null;
}
