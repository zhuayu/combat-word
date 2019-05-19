import Word from './../../models/word.js';

Page({
  data: {
    word: {},
  },
  onLoad: function(opt) {
    let id = opt.id;
    this.getWord(id);
  },
  getWord: function(id) {
    Word.show(id).then(res => {
      this.setData({
        word: res.word
      })
    })
  }
})
