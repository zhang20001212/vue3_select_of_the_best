import { reqLogin } from "@/api/user";
import { LoginFrom, LoginResponseData } from "@/api/user/type";
import { UserState } from "@/store/modules/types/types";
import { GET_TOKEN, SET_TOKEN } from "@/utils/token";

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: GET_TOKEN("TOKEN"),
    };
  },
  actions: {
    async login(data: LoginFrom) {
      const result: LoginResponseData = await reqLogin(data);
      if (result.code === 200) {
        this.token = result.data.token as string;
        SET_TOKEN(this.token as string);
        return "OK";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
  },
  getters: {},
});
