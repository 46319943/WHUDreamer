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
    console.log(globalData);
    var that = this;
    var scene = query.scene;
    this.setData({scene});
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
  call: function(e){
    console.log(e);
    let formId = e.detail.formId;
    var that = this;
    wx.login({
      success: function(res){
        if (res.code) {
          ajax({
            url: 'user/login',
            data: {
              code: res.code
            },
            success: res => {
              if (res.data.errcode === 0) {
                wx.getUserInfo({
                  success: function(res){
                    ajax({
                      url: 'jinqiu/add/call',
                      data: {
                        scene: that.data.scene,
                        iv: res.iv,
                        encryptedData: res.encryptedData,
                        formId
                      },
                      success: res => {
                        if (res.data.errcode === 0) {
                          login.show('助力成功');
                        } else if(res.data.errcode === 50024){
                          login.show('助力失败');
                        }else if(res.data.errcode === 50026){
                          login.show(res.date.title);
                        }else{login.show(res.data.errmsg);}
                      },
                    })
                  }
                })
              }else{login.show(res.data.errmsg);}
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
    })
    
    
  }
})