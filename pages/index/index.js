let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 不能这样子设置data，因为页面在一开始的时候就会被注册，而请求在之后才完成
    // hasUserInfo: globalData.hasUserInfo,
    message: '加载用户信息中',
  },

  checkFinish: function () {
    if (globalData.loginFinish && globalData.userInfoFinish) {
      wx.switchTab({
        url: '../app/app'
      });
      return;
    }
  },

  /**
   * 如果用户之前已经同意了获取用户信息，那么在app.js中就在全局变量中设置了userInfo
   * 否则，就要通过在这个页面中的按钮获取
   */
  onLoad: function (query) {
    /*
      现在的需求是这样的
      在app.js中会执行两个操作
        1.登录（获取绑定信息）
        2.获取用户信息
      在这两个操作完成之后，这个页面才会跳转
      它们都是异步时间，所以这个页面加载的时候，是否完成是不知道的，要分两种情况进行判断
  
      对于登录，如果已经完成了，那么globlaData.loginFinish为true
      否则就准备进行回调 loginFinishCallback
  
      对于获取用户信息，如果已经完成了，那么globalData.userInfoFinish为true
      否则准备进行回调 userInfoReadyCallback
      这里不进行判断用户是否进行了授权，只判断获取信息是否完成。
    */

    this.checkFinish();

    app.loginFinishCallback = () => {
      this.checkFinish();
    }
    app.userInfoReadyCallback = () => {
      this.checkFinish();
    }



/*
    if (app.globalData.userInfo) {
      // 如果有用户信息，就直接跳转到界面
      wx.switchTab({
        url: '../app/app'
      });
    }
    else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // 当获取到userInfo之后，就会回调这个函数
      app.userInfoReadyCallback = res => {
        // 回调延迟跳转
        wx.switchTab({
          url: '../user/user'
        });
      }
      // 得知用户没有授权获取用户信息
      app.userInfoNoAuthCallback = res => {
        this.setData({
          message: '点击按钮授权用户信息以进入主界面',
        })
      }

    }
    else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          // 设置全局用户信息
          app.globalData.userInfo = res.userInfo
          // 设置全局加密信息
          app.globalData.userInfo.encryptedData = res.encryptedData;
          app.globalData.userInfo.iv = res.iv;
          // 获取到用户信息之后跳转
          wx.switchTab({
            url: '../app/app'
          });
        }
      })
    }

*/
  },

  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 设置全局用户信息
      app.globalData.userInfo = e.detail.userInfo
      // 设置全局加密信息
      app.globalData.userInfo.encryptedData = e.detail.encryptedData;
      app.globalData.userInfo.iv = e.detail.iv;
      // 点击允许之后跳转页面
      wx.switchTab({
        url: '../app/app'
      });
    } else {
      // 用户拒绝微信授权

    }

  },

})
