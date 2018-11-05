// pages/app/eca/index/index.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    show: false
  },

  onLoad: function (options) {
    var that = this;
    console.log(globalData);
    ajax({
      url:'eca/get/statistics',
      method: 'get',
      success: res=>{
        if(res.data.errcode === 0){
          var backimg = res.data.data.backimg;
          var timeimg = res.data.data.timeimg;
          var questionimg = res.data.data.questionimg;
          var info1 = res.data.data.info1;
          var info2 = res.data.data.info2;
          that.setData({backimg, timeimg, questionimg, info1, info2});
        }
        else{
          
        }
      }
    })
  },
  onTap1: function(){
    var that = this;
    this.setData({
      show: true,
      info: that.data.info1
    })
  },
  onTap2: function(){
    var that = this;
    this.setData({
      show: true,
      info: that.data.info2
    })
  },
  onTap3: function(){
    var that = this;
    this.setData({
      show: true,
      info: that.data.timeimg
    })
  },
  onTap4: function(){
    wx.redirectTo({url: '../face/face'})
  },
  onTap5: function(){
    var that = this;
    this.setData({
      show: true,
      info: that.data.questionimg
    })
  },
  onTap6: function(){
    wx.redirectTo({url: '../result/result'})
  },
  cancel: function(){
    this.setData({show: false})
  }
})