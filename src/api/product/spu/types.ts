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

export type SpuItem = {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string;
  spuSaleAttrList: Array<SpuSaleAttrItem> | null;
  spuImageList: Array<SpuImageItem> | null;
};

export interface AddOrModifySpuResponseData extends ResponseData {
  data: null | string;
}

export interface SpuTradeMarkAttributeResponseData extends ResponseData {
  data: Array<TradeMarkItem>;
}

export interface SpuImageListResponseData extends ResponseData {
  data: Array<SpuImageItem>;
}

export type SpuImageItem = {
  id?: number;
  createTime?: string | null;
  updateTime?: string | null;
  spuId?: string;
  imgName: string;
  imgUrl: string;
  name?: string;
  url?: string;
};

export interface SpuSaleAttrListResponseData extends ResponseData {
  data: Array<SpuSaleAttrItem>;
}

export type SpuSaleAttrItem = {
  id?: number;
  createTime?: string | null;
  updateTime?: string | null;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: Array<SpuSaleAttrValueItem>;
  flag?: boolean;
  attrValue?: string;
};

export type SpuSaleAttrValueItem = {
  id?: number;
  createTime?: string | null;
  updateTime?: string | null;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null | boolean;
};

export interface BaseSaleAttrResponseData extends ResponseData {
  data: Array<BaseSaleAttrItem>;
}

export type BaseSaleAttrItem = {
  id: number;
  name: string;
};
