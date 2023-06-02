import { ResponseData } from "@/api/user/type";

// 商品管理中的数据模型
export interface ResponseTradeMarkData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}

export type Records = Array<TradeMarkItem>;

// 单个商品信息的数据模型
export type TradeMarkItem = {
  id?: number | string;
  tmName: string;
  logoUrl: string;
};

export interface AddOrModifyTradeMark extends ResponseData {
  data: null;
}

export interface ResponseDeleteTradeMark extends ResponseData {
  data: null | string;
}
