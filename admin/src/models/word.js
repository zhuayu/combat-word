import request from './request.js';
import API from './api.js';

export default {
  list (params={}) {
    return request.get(API.word, params)
  },
  update (id,params) {
    return request.put(API.wordItem(id),params)
  },
  add (params) {
    return request.post(API.word,params)
  },
  delete (id) {
    return request.delete(API.wordItem(id))
  }
}