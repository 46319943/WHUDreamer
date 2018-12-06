// pages/app/jinqiu/help/help.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    guide: '正在加载，请稍候'
  },

  onLoad: function (options) {
    console.log(globalData)
    var that = this;
    var width = 0;
    var accesstoken = '';
    var openid = '';
    var url = 'https://1492644395495447.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/dreamer_test_ide_one/php/';
    const ctx = wx.createCanvasContext('canvas');
    ajax({
      url: 'jinqiu/get/actioninfo',
      method: 'GET',
      success: res => {
        if (res.data.errcode === 0) {
          that.setData({data: res.data.data})
          if(!res.data.data.qrcode) url='https://whusu.oss-cn-shanghai.aliyuncs.com/media/img/%E9%80%8F%E6%98%8E.png';
        } else{login.show(res.data.errmsg);}
      },
    })
    ajax({
      url: 'jinqiu/get/imdata',
      method: 'GET',
      success: res => {
        if (res.data.errcode === 0) {
          accesstoken = res.data.im.accesstoken;
          openid = res.data.im.openid;
          url = url+'?1='+accesstoken+'&2='+openid;
          wx.downloadFile({
            url,
            success: function (sres) {
              console.log(sres);
              let coreimg = sres.tempFilePath;
              that.setData({coreimg});
            },fail:function(fres){}
          })
        } else{login.show(res.data.errmsg);}
      },
    })
    ajax({
      url: 'jinqiu/get/backimg',
      method: 'GET',
      success: res => {
        if (res.data.errcode === 0) {
          console.log(res.data['url']);
          wx.downloadFile({
            url: res.data['url'],
            success: function (sres) {
              console.log(sres);
              let backimg = sres.tempFilePath;
              that.setData({backimg});
            },fail:function(fres){}
          })
          
          
        } else{login.show(res.data.errmsg);}
      },
    })
    
    
    wx.getSystemInfo({
      success: function(res){
        width = res.screenWidth - 40;
      }
    })
    var timer = setInterval(
      function(){
        if(that.data.backimg && that.data.coreimg && width){
          let height = width * 1.4;
          console.log('宽度'+width);
          console.log('长度'+height);
          that.setData({width, height});
          that.setData({guide: ''})
          ctx.drawImage(that.data.backimg, 0, 0, width, height);
          ctx.save();
          ctx.drawImage(that.data.coreimg, width*0.18752, height*0.31, width*0.25, width*0.25);
          ctx.draw();
          clearInterval(timer);
        }
      },500
    );
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  save: function(e){
    var that = this;
    console.log('开始保存照片');
    let tempFilePath = "";
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.width,
      height: that.data.height,
      quality: 1,
      destWidth: that.data.width,
      destHeight: that.data.height,
      canvasId: "canvas",
      success: function (res) {
        console.log(res);
        tempFilePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: function (res) {
              console.log(res);
              login.show('保存成功');
          }
        });
      }
    });
  },
  run: function(e){
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
                wx.getWeRunData({
                  success: function(res){
                    ajax({
                      url: 'jinqiu/add/passuserforrun',
                      data: {
                        iv: res.iv,
                        encryptedData: res.encryptedData
                      },
                      success: res => {
                        if (res.data.errcode === 0) {
                          login.show("上传成功，您已获得抢票资格");
                          setTimeout(() => { wx.redirectTo({url: '../jinqiu'}) }, 1000);
                        }else if (res.data.errcode === 50025) {
                          login.show(res.data.title);
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