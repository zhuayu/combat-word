import Collection from './../../models/collection.js';

Page({
  data: {
    words: [],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
    },
  },
  onLoad: function() {
    this.getWord(1);
  },
  getWord: function(page) {
    let limit = 10;
    let words = this.data.words;
    Collection.list({
      limit, page
    }).then(res => {
      let words = this.data.words.concat(res.words);
      this.setData({
        words: words,
        pagination: res.pagination
      })
    })
  },
  handleCollect: function(e) {
    let id = e.target.dataset.id;
    let index = e.target.dataset.index;
    let words = this.data.words;

    Collection.delete(id).then( res => {
      wx.showToast({
        title: '成功取消',
        icon: 'success',
        duration: 2000
      })
      words.splice(index,1)
      this.setData({ words })
    }).catch(()=>{})
  },
  onReachBottom: function() {
    let page = this.data.pagination.page + 1;
    let limit = this.data.pagination.pageSize;
    let total = this.data.pagination.total;
    console.log(page, limit, total)
    if((page - 1) * limit >= total){
      console.log('没有信息了')
      return 
    }

    this.getWord(page);
  }
})
