let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;

// 二维码库的引用
let qrcode = require('../../utils/qrcode.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '../../images/codeImg.png',
    avatar: '../../images/user-avatar.jpg',
    name: '罗运',
    position: '珞珈创意工作室',
    date: '2018/7/26 22:11'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    login.setAccount(this);
    ajax({
      url: 'user/qrcode/get',
      method: 'GET',
      success: (res) => {
        console.log(res);
        if (res.data.errcode === 0) {
          let result = res.data;
          let uid = result.uid;
          // 返回的是秒，换成毫秒
          let time = result.out_time * 1000;
          let date = new Date(time);

          console.log(uid);

          // 调用模块生成base64数据
          let data = qrcode.createQrCodeImg(uid, { 'size': 300 });

          let minutes = date.getMinutes();
          // 格式化小时和分钟
          if (date.getMinutes().toString().length === 1) {
            minutes = '0' + date.getMinutes().toString();
          }
          let hours = date.getHours();
          // if (date.getHours().toString().length === 1) {
          //   hours = '0' + date.getHours().toString();
          // }

          this.setData({
            uid,
            date: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
              + ' ' + hours + ':' + minutes,
            // code: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + uid,
            code: data,
          })
        }
      }
    });
  },
  onLoad: function(e){

    wx.onUserCaptureScreen(
      () => {
        let pages = getCurrentPages();
        let page = pages[pages.length-1];
        if(page.route.indexOf('code') === -1){
          return;
        }
        ajax({
          url:'user/qrcode/del',
          method:'GET',
          success: res => {
            console.log(res);
          }
        })
        this.onShow();
        login.show('禁止截图，二维码已更新');

      }
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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