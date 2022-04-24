import axios from 'axios'
import { getUserFromLocalstorage, removeUserFromLocalstorage } from '../components/UserContext'

// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: 'https://fd.shimonzhan.com/api',
  timeout: 3000,
  headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  /**
    1、比如添加token之类的请求头信息
    2、添加每次请求loading等
  */
  const user = getUserFromLocalstorage();
  if (user) {
    config.headers.Authorization = "Bearer "+user.token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  /**
    1、集中处理响应数据（如错误码处理）
  */
  if(response.data.code === 1007 || response.data.code === 1008 || response.data.code === 1009)
  {
    removeUserFromLocalstorage();
    window.location.href = '/login';
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance