import {
  LoginFrom,
  LoginResponseData,
  UserResponseData,
} from "@/api/user/type";
import request from "@/utils/request";

enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

export const reqLogin = (data: LoginFrom): Promise<LoginResponseData> => {
  return request({
    url: API.LOGIN_URL,
    method: "POST",
    data,
  });
};

export const reqUserInfo = (): Promise<UserResponseData> => {
  return request({
    url: API.USERINFO_URL,
    method: "GET",
  });
};
