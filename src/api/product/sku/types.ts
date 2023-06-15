import { ResponseData } from "@/api/user/type";
import { SkuItem } from "../spu/types";

export interface AllSkuListResponse extends ResponseData {
  data: {
    records: Array<SkuItem>;
    total: number;
    size: number;
    current: number;
    order: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

export interface PutAwayOrCancelSkuItemResponse extends ResponseData {
  data: null;
}

export interface GetOneSkuInfoResponse extends ResponseData {
  data: SkuItem;
}
