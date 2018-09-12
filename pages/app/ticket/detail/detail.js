// pages/app/ticket/detail/detail.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
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
    login.flush();
    // 刷新用户信息
    login.setAccount(this);
    if (this.data.account || globalData.account) {
      globalData.account = this.data.account;
      this.onShow();
    }
    else {
      wx.navigateTo({
        url: '/pages/app/ticket/bind/bind'
    });
    }
    this.setData({
      id:options.id,
    });
    console.log(options.id);
  },
  
  rob: function(e) {
    console.log("开始ajax");
    var that = this;
    ajax({
      url: 'rob/robbing',
      data: {
        "id": that.data.id
      },

      success: res => {
        console.log("返回信息");
        console.log(res);
        if (res.data && res.data.errcode === 0) {
          login.show('抢票成功\n'+res.data.tips);
          console.log(res);
        }else if (res.data.errcode === 50022) {
          login.show('您已经抢过票了');
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