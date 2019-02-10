import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import Router from 'vue-router'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        "Accept":"*/*",
        //'Content-Type':'text/plain',//+stringify
        //'Content-Type': "application/x-www-form-urlencoded",//+stringify
        //"Content-Type": "application/json;"
        'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",//+stringify
        //'Content-Type': 'multipart/form-data;charset=UTF-8'
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return qs.stringify(data);
        //return JSON.stringify(data)
      }],
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      // if (!Object.keys(this.queue).length) {
      //   // Spin.show() // 不建议开启，因为界面不友好
      // }
      // this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      //const {data:data } = res;
      return res.data;
    }, error => {
      this.destroy(url)
      addErrorLog(error.response)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create(
      {
        withCredentials: true
      }
    )
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
