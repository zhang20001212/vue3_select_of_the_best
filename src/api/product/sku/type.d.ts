import { ResponseData } from "@/api/user/type";
import { SkuItem } from "../spu/types";

interface AllSkuList extends ResponseData {
  records: Array<SkuItem>;
}
