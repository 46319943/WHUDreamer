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
    let id = options.id;
    this.data.id = id;
  },
  submit: function (e) {
    let res = e.detail.value;
    for (const key in res) {
      if (res.hasOwnProperty(key)) {
        let value = res[key];
        if (value.trim() === "") {
          login.show("有未填写字段！");
          return;
        }
        if (key != 'comment') {
          value = parseInt(value);
          if (value > 5 || value < 1) {
            login.show('分数不在范围内');
            return;
          }
        }
      }
    }
    res.id = this.data.id;
    ajax({
      url: 'redlecturer/evalute',
      data: res,
      success: res => {
        if (res.data.errcode === 0) {
          login.show('评价成功');
          setTimeout(wx.navigateBack,1000);
        }
        else {
          login.show('失败' + res.data.errmsg);
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