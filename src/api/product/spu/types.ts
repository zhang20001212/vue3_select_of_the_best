import { ResponseData } from "@/api/user/type";
import { TradeMarkItem } from "../trademark/types";

// SPU的数据模型
export interface SpuResponseData extends ResponseData {
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

export interface SpuTradeMarkAttributeResponseData extends ResponseData {
  data: Array<TradeMarkItem>;
}

export interface SpuImageListResponseData extends ResponseData {
  data: Array<SpuImageItem>;
}

export type SpuImageItem = {
  id: number;
  createTime: string;
  updateTime: string;
  spuId: string;
  imgName: string;
  imgUrl: string;
};

export interface SpuSaleAttrListResponseData extends ResponseData {
  data: Array<SpuSaleAttrItem>;
}

export type SpuSaleAttrItem = {
  id?: number;
  createTime?: string | null;
  updateTime?: string | null;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: Array<SpuSaleAttrValueItem>;
};

export type SpuSaleAttrValueItem = {
  id?: number;
  createTime?: string | null;
  updateTime?: string | null;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked: null | boolean;
};

export interface BaseSaleAttrResponseData extends ResponseData {
  data: Array<BaseSaleAttrItem>;
}

export type BaseSaleAttrItem = {
  id: number;
  name: string;
};
