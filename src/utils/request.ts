// 对axios进行二次封装
import { useUserStore } from "@/store/modules/user";
import axios from "axios";
// @ts-ignore
import { ElMessage } from "element-plus";
// 利用axios的create方法创建axios实例
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_SERVE,
  // 超时时间
  timeout: 5000,
});
// 对axios实例添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // config中含有header属性即为请求头
    if (useUserStore().token) {
      config.headers["token"] = useUserStore().token;
    }
    // 返回这个配置对象
    return config;
  },
  (error) => {
    console.log(error);
  }
);
// 对axios实例添加相应拦截器
request.interceptors.response.use(
  (response) => {
    // promise形式的数据执行promise中的resolve方法
    return response.data;
  },
  (error) => {
    // promise形式的数据执行promise中的reject方法
    // 处理http请求错误
    let message = "";
    const status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权限访问";
        break;
      case 404:
        message = "地址错误";
        break;
      case 500:
        message = "服务器完蛋了!!!";
        break;
      default:
        message = "网络延迟过大";
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);

export default request;
