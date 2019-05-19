import axios from 'axios'
axios.defaults.withCredentials = true
// 添加响应拦截器
axios.interceptors.response.use( res => {
  if(res.data.code === 200){
    return res.data.data
  }else{
    return Promise.reject(res.data)
  }
}, error => {
  return Promise.reject(error)
})

export default {
  post: function (url='', data={}, config) {
    return axios.post(url, data, config);
  },
  put: function (url='', data={}, config) {
    return axios.put(url, data, config);
  },
  get: function (url, params={}, config) {
    let OPTIONS = Object.assign({ params }, config);
    return axios.get(url, OPTIONS)
  },
  delete: function (url='', params={}, config) {
    let OPTIONS = Object.assign({ params }, config);
    return axios.delete(url, OPTIONS)
  }
}