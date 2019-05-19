import { request } from './request.js';
import API from './api.js';

export default {
  index (params={}) {
    return request({ url: API.classify, data: params})
  },
  show (id) {
    return request({ url: API.classifyItem(id)})
  }
}