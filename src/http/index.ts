import { getUserToken, toLoginPage } from '@/helpers/erp/hooks';
import fly from 'flyio';
import baseURL from './baseURL';
declare const uni: any;

fly.interceptors.request.use(request => {
  request['baseURL'] = baseURL;
  request.headers['Accept'] = 'application/json; text/plain; charset=utf-8';
  request.headers['Content-Type'] = 'application/json; charset=utf-8';
  const token = getUserToken();
  if (token) {
    request.headers['Authorization'] = token;
  } else {
    // 让用户去登录
    uni.reLaunch({
      url: '/pages/login/login'
    });
  }
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    const data = response.data;
    if (!data) {
      return Promise.reject('Internal Server Error');
    } else if (data.status != 1) {
      if (data.msg == '未授权') {
        toLoginPage();
      } else {
        return Promise.reject(data.msg);
      }
    }
    return data.data;
  },
  err => {
    console.log(err);
    if (err.message == '未授权') {
      // @ts-ignore
      uni.showModal({
        title: '出错了',
        content: '登录失效，请重新登录'
      });
      uni.removeStorageSync('token');
      uni.reLaunch({
        url: '/pages/login/login'
      });
    } else {
      uni.showModal({
        title: '出错了',
        content: '网络请求异常：' + err.message
      });
    }
  }
);

export default fly;

export function get(url: string, query?: object): Promise<any> {
  return fly.get(url, query);
}

export function post(url: string, body: any, query?: any): Promise<any> {
  // convert query object to string and add to url
  if (query) {
    url +=
      '?' +
      Object.keys(query)
        .map(key => key + '=' + encodeURIComponent(query[key]))
        .join('&');
  }
  return fly.post(url, body);
}
