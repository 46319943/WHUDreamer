let handler = require("./utils/handler.js");
let ajax = require("./utils/ajax.js");
let login = require("./utils/login.js");
App({
  onLaunch: function () {
    // 初始化
    login.init(this);
    // 登录
    login.login();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经有用户信息，添加标记，来使在初始页面一开始显示正在获取
          // this.globalData.hasUserInfo = true;
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 设置全局加密信息
              this.globalData.userInfo.encryptedData = res.encryptedData;
              this.globalData.userInfo.iv = res.iv;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    ajax: ajax,
    login: login,
    handler: handler
  }
})
