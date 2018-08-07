let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 不能这样子设置data，因为页面在一开始的时候就会被注册，而请求在之后才完成
    // hasUserInfo: globalData.hasUserInfo,
  },
  /**
   * 如果用户之前已经同意了获取用户信息，那么在app.js中就在全局变量中设置了userInfo
   * 否则，就要通过在这个页面中的按钮获取
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      // 如果有用户信息，就直接跳转到界面
      wx.switchTab({
        url: '../calendar-flex/calendar'
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        // 回调延迟跳转
        wx.switchTab({
          url: '../calendar-flex/calendar'
        });
      }
    } else {
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
            url: '../calendar-flex/calendar'
          });
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 设置全局用户信息
      app.globalData.userInfo = e.detail.userInfo
      // 设置全局加密信息
      app.globalData.userInfo.encryptedData = res.encryptedData;
      app.globalData.userInfo.iv = res.iv;
      // 点击允许之后跳转页面
      wx.switchTab({
        url: '../calendar-flex/calendar'
      });
    } else {
      // 用户拒绝微信授权

    }

  },

})
