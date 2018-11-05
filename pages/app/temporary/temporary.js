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
  submit: function (e) {
    login.formIdUpload(e);
    wx.showModal({
      title: '提示',
      content: '确认报名吗？',
      success(res) {
        if (res.confirm) {
          ajax({
            url: 'ticket/music/sign',
            method:'GET',
            success: res => {
              if (res.data.errcode === 0) {
                login.show('报名成功！');
                setTimeout(() => wx.navigateBack(), 1000);
              }
              else if(res.data.errcode === 30012){
                login.show(res.data.title);
                setTimeout(() => wx.navigateBack(), 1000);

              }
              else {
                login.show('失败' + res.data.errmsg);
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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