// 登录接口需要携带的参数类型
export type LoginFrom = {
  username: string;
  password: string;
};

type DataType = {
  token?: string;
  message?: string;
};

// 请求返回的数据类型
export type LoginResponseData = {
  code: number;
  data: DataType;
};

type CheckUser = {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: Array<string>;
  buttons: Array<string>;
  routes: Array<string>;
  token: string;
};

type UserInfo = {
  checkUser: CheckUser;
};

// 定义服务器返回用户信息的数据类型
export type UserResponseData = {
  code: number;
  data: UserInfo;
};
