// 封装本地存储数据和读取数据方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};

export const GET_TOKEN = (key: string) => localStorage.getItem(key);

export const REMOVE_TOKEN = () => {
  localStorage.removeItem("TOKEN");
};
