// pages/app/eca/success/success.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(globalData);
    ajax({
      url:'eca/get/statistics',
      method: 'get',
      success: res=>{
        if(res.data.errcode === 0){
          var habits = res.data.data.habits;
          that.setData({habits});
          var backimg = res.data.data.backimg;
          that.setData({backimg: res.data.data.backimg});
          var ansstyle = that.data.ansstyle;
          for(let i in habits){
            ansstyle.push('ans')
          }
          console.log(ansstyle)
          that.setData({ansstyle});
        }
        else{
          
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})