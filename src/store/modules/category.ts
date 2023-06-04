import {
  reqAllAttr,
  reqGetCategory1,
  reqGetCategory2,
  reqGetCategory3,
} from "@/api/product/attr";
import { defineStore } from "pinia";
import { CategoryState } from "./types/types";

const useCategoryStore = defineStore("category", {
  state: (): CategoryState => {
    return {
      // 一级分类的所有数据
      categoryOne: [],
      // 一级分类中所选中的id
      c1Id: "",
      // 二级分类中所选中的id
      c2Id: "",
      // 二级分类中所有的数据
      categoryTwo: [],
      // 三级分类中所选中的id
      c3Id: "",
      // 三级分类中所有的数据
      categoryThree: [],
    };
  },
  actions: {
    // 获取一级分类的方法
    async getOneCategory() {
      // 发送请求获取一级的所有分类
      const result = await reqGetCategory1();
      // 网络请求成功进行存储
      if (result.code === 200) {
        // 给仓库中的categoryOne进行存储数据
        this.categoryOne = result.data;
      }
    },
    // 获取二级分类的数据
    async getTwoCategory() {
      // 发送请求获取二级的所有分类
      const result = await reqGetCategory2(this.c1Id);
      if (result.code === 200) {
        this.categoryTwo = result.data;
        this.c3Id = "";
      }
    },
    // 获取三级分类的数据
    async getThreeCategory() {
      // 发送请求获取三级的所有分类
      const result = await reqGetCategory3(this.c2Id);
      if (result.code === 200) {
        this.categoryThree = result.data;
      }
    },
    // 当一级分类的数据发生变化时，清空二三级的数据
    clear() {
      this.c2Id = "";
      this.c3Id = "";
      this.categoryTwo = [];
      this.categoryThree = [];
    },
  },
  getters: {},
});

export default useCategoryStore;
