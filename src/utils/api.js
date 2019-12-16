import axios from 'axios'
import {Message} from 'element-ui'
import utils from './utils.js'
// interceptors拦截器。可以拦截每一个请求. 目的： 统一处理所有请求失败的情况。
axios.interceptors.request.use(config => {
  if (config.url !== '/userLogin') {
    config.headers.token = utils.getCookie('token')
  }
  return config;
}, () => {
  Message.error({message: '请求超时!'});
  // return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 500) {
    Message.error({message: data.data.msg});
    return;
  }
  if (data.status && data.status === 200 && (data.data.code && data.data.code !== 200)) {
    Message.error({message: data.data.msg})
    return;
  }
  return data;
}, (err) => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status === 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  } else if (err.response.status === 401) {
    Message.error({message: err.response.data.msg});
  } else {
    if (err.response.data.msg) {
      Message.error({message: err.response.data.msg});
    } else {
      Message.error({message: '未知错误!'});
    }
  }
  // return Promise.resolve(err);
})
let base = '/sharon';
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url, params = {}) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params
  });
}
