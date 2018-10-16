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
  }
})