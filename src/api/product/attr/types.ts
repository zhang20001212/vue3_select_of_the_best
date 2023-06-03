import { ResponseData } from "@/api/user/type";

// 分类数据模型
export interface CategoryResponseData extends ResponseData {
  data: Array<CategoryItem>;
}

export type CategoryItem = {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
};

export interface AttrResponseData extends ResponseData {
  data: Array<Attr>;
}

export type Attr = {
  id: number | string;
  attrName: string;
  categoryId: number;
  categoryLevel: number;
  attrValueList: Array<AttrValue>;
};

export type AttrValue = {
  id: number | string;
  valueName: string;
  attrId: number;
};
