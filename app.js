let handler = require("./utils/handler.js");
let ajax = require("./utils/ajax.js");
let login = require("./utils/login.js");
let util = require("./utils/util.js");
App({
  onLaunch: function () {
    // 初始化，获取本地cookie
    handler.init();
    // 初始化，将app提供给login
    login.init(this);


    if (!handler.cookie) {
      // 如果没有本地储存的cookie才需要登录
      login.login(() => {

        this.globalData.loginFinish = true;
        if (this.loginFinishCallback && this.loginFinishCallback instanceof Function) {
          this.loginFinishCallback();
        }

      });
    }
    else {
      login.getAccount(() => {

        this.globalData.loginFinish = true;
        if (this.loginFinishCallback && this.loginFinishCallback instanceof Function) {
          this.loginFinishCallback();
        }

      });
    }

    // 获取用户信息
    /*
      如果用户授权了，那么获取授权信息
      如果没有授权，就直接跳过，算这个步骤已经完成
    */
    wx.getSetting({
      success: res => {
        // 判断用户是否同意获取userInfo
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 设置全局加密信息
              this.globalData.userInfo.encryptedData = res.encryptedData;
              this.globalData.userInfo.iv = res.iv;

              this.globalData.userInfoFinish = true;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }

            }
          })
        }
        else {
          this.globalData.userInfoFinish = true;
          // 如果用户没有授权过获取用户信息
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    ajax: ajax,
    login: login,
    handler: handler,
    util: util,
    flag: false,
    interviewlist: []
  }
})
