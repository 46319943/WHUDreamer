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
    const ctx = wx.createCanvasContext('canvas');
    ajax({
      url: 'jinqiu/get/actioninfo',
      method: 'GET',
      success: res => {
        if (res.data.errcode === 0) {
          that.setData({data: res.data.data})
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
          wx.downloadFile({
            url: 'https://dreamer.api.whusu.org/jinqiu/get/appimg&sn='+globalData.account.studentNum,
            success: function (sres) {
              console.log(sres);
              let coreimg = sres.tempFilePath;
              that.setData({coreimg});
            },fail:function(fres){}
          })
        } else{login.show(res.data.errmsg);}
      },
    })
    wx.getSystemInfo({
      success: function(res){
        width = res.screenWidth;
      }
    })
    var timer = setInterval(
      function(){
        if(that.data.backimg && that.data.coreimg && width){
          let height = width * 1.3;
          console.log('宽度'+width);
          console.log('长度'+height);
          that.setData({guide: ''})
          ctx.drawImage(that.data.backimg, 0, 0, width-40, height);
          ctx.save();
          ctx.drawImage(that.data.coreimg, width*0.155, height*0.305, 100, 100);
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
    console.log('开始保存照片');
    let tempFilePath = "";
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 330,
      height: 500,
      quality: 1,
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
  }
})