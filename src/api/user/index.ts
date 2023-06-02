import request from "@/utils/request";
import {
  LoginFromData,
  LoginResponseData,
  LogoutResponseData,
  UserInfoResponseData,
} from "./type";

// 用户相关的API
enum API {
  LOGIN_API = "/admin/acl/index/login",
  USER_INFO = "/admin/acl/index/info",
  LOGOUT_API = "/admin/acl/index/logout",
}

/**
 * 用户登录接口
 * @param data {username:'',password:''}
 * @returns
 */
export const reqLogin = (data: LoginFromData): Promise<LoginResponseData> => {
  // 函数体
  return request({
    url: API.LOGIN_API,
    method: "POST",
    data,
  });
};

// 获取用户信息接口
export const reqUserInfo = (): Promise<UserInfoResponseData> => {
  // 函数体
  return request({
    url: API.USER_INFO,
    method: "GET",
  });
};

// 退出登录接口
export const reqLogout = (): Promise<LogoutResponseData> => {
  // 函数体
  return request({
    url: API.LOGOUT_API,
    method: "POST",
  });
};
