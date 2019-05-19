import Images from './../../images/indexbg.js';
import Classify from './../../models/classify.js';

const App = getApp();

Page({
  data: {
    indexBg: Images.indexBg,
    pageShow: true,
    userInfo: {},
    stacks: [],
  },
  onLoad: function() {
    this.getUserInfo();
    this.getClassify();
  },
  getUserInfo: function() {
    App.getUserInfo().then( userInfo =>{
      this.setData({ userInfo })
    })
  },
  getClassify: function() {
    Classify.index({status: 1}).then(res => {
      this.setData({
        stacks: res.classifys
      })
    })
  }
})
