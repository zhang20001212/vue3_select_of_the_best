import { reqLogin, reqLogout, reqUserInfo } from "@/api/user";
import {
  LoginFromData,
  LoginResponseData,
  LogoutResponseData,
  UserInfoResponseData,
} from "@/api/user/type";
import { constantRoutes } from "@/router/routes";
import { UserState } from "@/store/modules/types/types";
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "@/utils/token";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: GET_TOKEN("TOKEN"),
      menuRoutes: constantRoutes.find((item) => item.name === "root")?.children,
      username: "",
      avatar: "",
    };
  },
  actions: {
    async login(data: LoginFromData) {
      const result: LoginResponseData = await reqLogin(data);
      if (result.code === 200) {
        this.token = result.data as string;
        SET_TOKEN(this.token as string);
        return result.ok;
      } else {
        return Promise.reject(new Error(result.data));
      }
    },

    async fetchUserInfo() {
      const result: UserInfoResponseData = await reqUserInfo();
      if (result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        return result.ok;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

    async userLogout() {
      // 退出登录请求
      const result: LogoutResponseData = await reqLogout();
      if (result.code === 200) {
        this.username = "";
        this.avatar = "";
        this.token = "";
        REMOVE_TOKEN();
        return result.ok;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});
