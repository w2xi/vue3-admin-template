import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useAppStore } from '../stores';
import { getToken } from './auth';


// 白名单，不做 code 的检验 直接放过
const whitelist = [];

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = getToken();

    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = token;
    }
    
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    if ( whitelist.includes(response.config.url) || res instanceof ArrayBuffer ){
      return res;
    }

    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 0) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      // 401: Token expired
      if ( res.code === 401 ){
        ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          const userStore = useAppStore()
          userStore.resetToken().then(() => {
            location.reload()
          })
        });
      }

      return Promise.reject(new Error(res.msg || 'Error'));
    }

    return res;
  },
  (error) => {
    console.log(error);

    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });

    return Promise.reject(error);
  }
);

export default service;
