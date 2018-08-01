var app = getApp();
var globalData = app.globalData;
var handler = globalData.handler;
var login = globalData.login;



Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: []
  },
  clean: function () {
    this.setData({
      message: []
    });
  },
  onLoad: function(){

  }, 
  loginFunction: function () {
    login.request({
      url:'user/info/add/bkjw',
      data:{
        phone:'110',
        email:'test@qq.com',
        student_num:'2017301110134',
        password:'19991003'
      },
      success: res=>{
        console.log(res);
      }
    })
  },
  

  show: function (msg) {
    var message = this.data.message;
    message.push(msg);
    this.setData({
      message: message
    });
  }
})
