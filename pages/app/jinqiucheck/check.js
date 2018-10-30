// pages/app/jinqiucheck/check.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    ticket: false
  },

  onLoad: function (options) {
    
  },
  scanCode: function (e) {
    var that = this;
    wx.scanCode({
      success: res => {
        console.log(res);
        let uid = res.result;
        ajax({
          url: 'jinqiu/check',
          data: {
            uid
          },
          success: res => {
            if (res.data.errcode === 0){
              that.setData({
                name: res.data.name,
                num: res.data.num,
                info: res.data.info,
                ticket: true
              })
            }else if(res.data.errcode === 50031){login.show('没有找到这位同学的任何数据(＞﹏＜)')}
            else if(res.data.errcode === 50032){login.show('没有找到' + res.data.name + '同学的票(＞﹏＜)')}
            else if(res.data.errcode === 50034){login.show('这位同学的票已经兑换过了哦(＞﹏＜)')}
            else {login.show('服务器出现了问题o(≧口≦)o，请耐心等待管理员处理')}
          },
        })
        
      }
    })
  },
  docheck: function(e){
    let num = this.data.num;
    var that = this;
    ajax({
      url: 'jinqiu/docheck',
      data: {
        num
      },
      success: res => {
        if (res.data.errcode === 0){login.show('兑换成功(≧∇≦)ﾉ'); that.setData({ticket: false})}
        else if(res.data.errcode === 50032){login.show('没有找到这位同学的票(＞﹏＜)')}
        else if(res.data.errcode === 50033){login.show('服务器出现了问题o(≧口≦)o，请耐心等待管理员处理')}
        else {login.show('服务器出现了问题o(≧口≦)o，请耐心等待管理员处理')}
      },
    })
  }
})