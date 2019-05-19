import User from './models/user.js';

App({
  onLaunch: function () {
    this.getUserInfo();
  },
  globalData: {
    userInfo: {},
  },
  getUserInfo: function(cb) {
    return new Promise((resolve,reject)=>{
      if(this.globalData.userInfo.token){
        resolve(this.globalData.userInfo)
        return
      }

      let userInfoStorage = wx.getStorageSync('userInfo');
      if(userInfoStorage){
        this.globalData.userInfo = userInfoStorage;
        resolve(userInfoStorage)
        return
      }

      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                this.globalData.userInfo = res.userInfo;
                wx.login({
                  success:(res)=> {
                    if (res.code) {
                      User.login(res.code).then(res => {
                        let token = res.token;
                        this.globalData.userInfo.token = token;
                        wx.setStorageSync('userInfo',this.globalData.userInfo)
                        resolve(this.globalData.userInfo)
                      })
                    } else {
                      reject('登录失败！' + res.errMsg)
                    }
                  }
                })
              },
              fail: () => {
                reject('获取用户信息失败');
              }
            })
          }else{
            resolve({})
          }
        },
        fail: () =>{
          reject('获取授权失败');
        }
      })
    })
  }
})