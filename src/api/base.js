import axios from "axios";

const serverUrl = 'http://localhost:6001';

const client = axios.create({
  baseURL: serverUrl,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

// http request拦截器 添加一个请求拦截器
client.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = window.sessionStorage.getItem("accessToken")
  if (token) {
    config.headers.accessToken = token;    //将token放到请求头发送给服务器
    return config;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

client.interceptors.response.use(function (resp) {
  // Do something before request is sent
  return resp;
}, function (error) {
  // Do something with request error
  if (error.response.status === 401) {
    window.sessionStorage.removeItem("accessToken");
    window.location.href = 'http://localhost:3000';
    window.location.reload();
    return {};
  }
  return Promise.reject(error);
});

const getUserInfo = () => {
  const token = window.sessionStorage.getItem("accessToken");
  const strings = token.split("."); //截取token，获取载体
  const userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
  return userinfo;
}

const getUserId = () => {
  return getUserInfo()["userId"];
}

export { client, getUserInfo, getUserId }