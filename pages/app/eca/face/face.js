// pages/app/eca/face/face.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    default: '../../../../images/face.png',
    but: 'upload',
    avater: null,
    uploaded: false,
    progress: null
  },

  onLoad: function (options) {
    var that = this;
    console.log(globalData);
    ajax({
      url:'eca/get/statistics',
      method: 'get',
      success: res=>{
        if(res.data.errcode === 0){
          var backimg = res.data.data.backimg;
          var timeimg = res.data.data.timeimg;
          var questionimg = res.data.data.questionimg;
          var info1 = res.data.data.info1;
          var info2 = res.data.data.info2;
          that.setData({backimg, timeimg, questionimg, info1, info2});
        }
        else{
          
        }
      }
    })
  },
  upload: function(e){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log(res);
        let tempFiles = res.tempFiles;
        if (tempFiles.lenth === 0) return;
        var file = tempFiles[0];
        if (file.size > 1024 * 1024 * 5) {
          login.show("图片过大，请选择5MB以下的文件");
          return;
        }
        ajax({
          url: 'sign/oss/get/eca',
          success: res => {
            if (res.data && res.data.errcode === 0) {
              var sign = res.data;
              delete sign.errcode;
              delete sign.errmsg;
              var uploadTask = wx.uploadFile({
                url: sign.host,
                filePath: file.path,
                name: 'file',
                formData: {
                  key: sign.dir + globalData.account.studentNum,
                  name: file.path,
                  policy: sign.policy,
                  Signature: sign.signature,
                  OSSAccessKeyId: sign.accessid,
                  success_action_status: '200',
                },
                success: res => {
                  console.log(res);
                  that.setData({avater: file.path});
                  if (res.statusCode === 200) {
                    ajax({
                      url: 'eca/add/face',
                      data: {
                        headimgurl: sign.dir + globalData.account.studentNum,
                        sn: globalData.account.studentNum
                      },
                      success: res => {
                        if (res.data && res.data.errcode === 0) {
                          login.show('上传成功！');
                          that.setData({uploaded: true});
                          that.setData({but: 'next'});
                        }
                        if (res.data && res.data.errcode === 200111) {
                          login.show(res.data.tip);
                          that.setData({but: 'upload'});
                        }
                        if (res.data && res.data.errcode === 50039) {
                          login.show("已达到报名人数上限");
                        }
                      }
                    });
                  }
                  else {
                    login.show('上传失败qwq');
                  }
                }
              });
              uploadTask.onProgressUpdate((res) => {
                if (res.progress === 100) {
                  this.setData({
                    progress: null
                  });
                } else {
                  this.setData({
                    progress: res.progress + '%'
                  });
                }
              })
    
            }
          }
        });
      }
    });
    
  },
  next: function(){
    wx.redirectTo({url: '../picker/picker'})
  }

})