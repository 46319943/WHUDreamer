let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  data: {

  },

  onLoad: function (options) {

  },

  onShow: function () {

  },
  list: function(){
    wx.redirectTo({url: '../index?page=1'});
  },
  scan: function(){
    wx.scanCode({
      success: res => {
        console.log(res);
        let code = res.result;
        ajax({
          url: 'qingyou/edit/admin/giftinfo',
          data: {
            code: code,
            type: 1
          },
          success: res => {
            if (res.data && res.data.errcode === 0) {
              login.show("揽收成功");
              setTimeout(() => { wx.navigateTo({url: '../info/info?code='+code}) }, 1000);
            }else if (res.data.errcode === 30014) {
              login.show("揽收成功");
              setTimeout(() => { wx.navigateTo({url: '../info/info?code='+code}) }, 1000);
            }
          }
        })
      }
    })
  },
  codechange: function(e){
    var code = e.detail.value;
    this.setData({code});
  },
  search: function(){
    var that = this;
    var code = this.data.code;
    if(!code){
      login.show("请输入礼物编号");
      return;
    }
    ajax({
      url: 'qingyou/get/admin/giftinfo',
      data: {
        code: code
      },
      success: res => {
        if (res.data && res.data.errcode === 0) {
          wx.navigateTo({url: '../info/info?code='+code});
        } else if (res.data && res.data.errcode === 50012) {
          login.show("未找到此礼物信息");
        }
      }
    })
  }
})