import Word from './../../models/word.js';
import Classify from './../../models/classify.js';
import Collection from './../../models/collection.js';

Page({
  data: {
    id: 0,
    classify: {},
    words: [],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
    },
  },
  onLoad: function(opt) {
    let id = opt.id || 1;
    this.getWord(id,1);
    this.getClassify(id);
    this.setData({ id });
  },
  getWord: function(id,page) {
    let limit = 10;
    let classify_id = id;
    let words = this.data.words;
    Word.index({
      limit, page, classify_id
    }).then(res => {
      let words = this.data.words.concat(res.words);
      this.setData({
        words: words,
        pagination: res.pagination
      })
    })
  },
  getClassify: function(id) {
    Classify.show(id).then(res => {
      this.setData({
        classify: res.classify
      })
    })
  },
  handleCollect: function(e) {
    let id = e.target.dataset.id;
    let collection = e.target.dataset.collection || false;
    let index = e.target.dataset.index;
    let words = this.data.words;
    words[index].collection = !collection;
    if(collection){
      Collection.delete(id).then( res => {
        wx.showToast({
          title: '成功取消',
          icon: 'success',
          duration: 2000
        })
        this.setData({ words })
      }).catch(()=>{})
    }else{
      Collection.insert(id).then( res => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({ words })
      }).catch(()=>{})
    }
  },
  onReachBottom: function() {
    let id = this.data.id;
    let page = this.data.pagination.page + 1;
    let limit = this.data.pagination.pageSize;
    let total = this.data.pagination.total;
    console.log(page, limit, total)
    if((page - 1) * limit >= total){
      console.log('没有信息了')
      return 
    }

    this.getWord(id,page);
  }
})
