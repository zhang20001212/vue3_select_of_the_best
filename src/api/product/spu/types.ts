import { ResponseData } from "@/api/user/type";

// SPU的数据模型
export interface SpuResponseDate extends ResponseData {
  data: {
    records: Array<SpuItem>;
    total: number;
    size: number;
    current: number;
    pages: number;
    searchCount: boolean;
  };
}

// TODO:测试时没有拿到spuSaleAttrList和spuImageList所以，以后需要修改这些类型
export type SpuItem = {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number;
  spuSaleAttrList: null;
  spuImageList: null;
};
