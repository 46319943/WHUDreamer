let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {

  },

  onLoad: function (query) {
    var that = this;
    var scene = query.scene;
    ajax({
      url: 'jinqiu/get/publicuserinfo',
      data: {
        scene
      },
      success: res => {
        if (res.data.errcode === 0) {
          that.setData({name: res.data.info.nickname})
        } else if(res.data.errcode === 50001){
          login.show('找不到该用户的信息');
        }else{login.show(res.data.errmsg);}
      },
    })
  },

})