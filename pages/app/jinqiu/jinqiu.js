// pages/app/jinqiu/jinqiu.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {

  },

  onLoad: function (options) {
    ajax({
      url: `jinqiu/get/callusercount`,
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          if(res.data.praise == 0) wx.redirectTo({url: 'ticket/ticket'});
          if(res.data.count == 0) wx.redirectTo({url: 'help/help'});
          else  {
            if(res.data.count > 0 && res.data.count < res.data.praise) wx.redirectTo({url: 'count/count'});
            else if(res.data.count >= res.data.praise) wx.redirectTo({url: 'ticket/ticket'});
          }
          
        }else {
          login.show('获取失败，请检查网络设置');
          setTimeout(() => { wx.navigateBack() }, 1000);
        }
      }
    })
  },

})