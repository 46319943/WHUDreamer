// pages/app/jinqiu/count/count.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    dis: true
  },

  onLoad: function (options) {
    console.log(globalData)
    this.setData({name: globalData.account.name})
  },

  onShow: function () {
    var that = this;
    var width = 0;
    const ctx = wx.createCanvasContext('canvas');
    wx.getSystemInfo({
      success: function(res){
        width = res.screenWidth;
      }
    })
    var that = this;
    ajax({
      url: 'jinqiu/get/actioninfo',
      method: 'GET',
      success: res => {
        if (res.data.errcode === 0) {
          that.setData({data: res.data.data})
        } else{login.show(res.data.errmsg);}
      },
    })
    ajax({
      url: `jinqiu/get/callusercount`,
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          if(!res.data.praise) res.data.praise = 0;
          if(res.data.count >= res.data.praise) that.setData({dis: false});
          that.setData({info: res.data});
        }else {
          login.show('获取失败，请检查网络设置');
          setTimeout(() => { wx.navigateBack() }, 1000);
        }
      }
    })
  },
  ticket: function(e){
    wx.navigateTo({url: '../ticket/ticket'})
  },
  run: function(e){
    var that = this;
    wx.login({
      success: function(res){
        if (res.code) {
          ajax({
            url: 'user/login',
            data: {
              code: res.code
            },
            success: res => {
              if (res.data.errcode === 0) {
                wx.getWeRunData({
                  success: function(res){
                    ajax({
                      url: 'jinqiu/add/passuserforrun',
                      data: {
                        iv: res.iv,
                        encryptedData: res.encryptedData
                      },
                      success: res => {
                        if (res.data.errcode === 0) {
                          login.show("上传成功，您以获得抢票资格");
                        }else if (res.data.errcode === 50025) {
                          login.show("没有达到步数要求，请再接再厉");
                        }else{login.show(res.data.errmsg);}
                      },
                    })
                  }
                })
              }else{login.show(res.data.errmsg);}
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
    })
  }
})