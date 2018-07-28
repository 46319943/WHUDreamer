//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      // url: '../logs/logs'
      url: '../test/test'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      // 用户拒绝微信授权

    }

  },
  onReady: function () {

  },
  testFunction: function () {
    wx.navigateTo({
      url:'../calendar/calendar'
    })
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       console.log('获取code成功，正在发送请求');          
    //       console.log(res.code);
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://think.whusu.org/user/login',
    //         data: {
    //           code: res.code
    //         },
    //         method:'POST',
    //         success:function(res){
    //           console.log('请求解析成功！');
    //           console.log(res.data);
    //         },
    //         fail:function(res){
    //           console.log('请求失败失败');
    //           console.log(res)
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
  }
})
