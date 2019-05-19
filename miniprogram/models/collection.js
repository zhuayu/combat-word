import { request } from './request.js';
import API from './api.js';

export default {
  delete (id) {
    return request({ url: API.collectionItem(id), method: 'DELETE'})
  },
  insert (id) {
    return request({ url: API.collectionItem(id), method: 'POST'})
  },
  list (params={}) {
    return request({ url: API.collection, data: params })
  }
}