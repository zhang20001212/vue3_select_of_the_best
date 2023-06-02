// 用户相关的数据模型
// 用户登录数据模型
export interface LoginFromData {
  username: string;
  password: string;
}

// 所有接口共有的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 登录接口返回数据类型
export interface LoginResponseData extends ResponseData {
  data: string;
}

// 获取用户信息返回的数据类型
export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: Array<string>;
    buttons: Array<string>;
    roles: Array<string>;
    name: string;
    avatar: string;
  };
}

// 退出登录返回的数据类型
export interface LogoutResponseData extends ResponseData {
  data: null;
}
