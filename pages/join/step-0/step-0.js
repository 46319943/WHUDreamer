let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快与我一起加入武汉大学学生会',
      path: '/pages/user/user',
      imageUrl: 'https://files.whusu.org/media/img/tuiguang.png'
    }
  },
  data: {
    defaultPhoto: '../../../images/face.png'
  },

  // 点击按钮时的相应，三种情况
  formSubmit: function (e) {
    login.formIdUpload(e);

    // 如果已经上传了文件，就跳转下一步
    if (this.data.uploaded) {
      wx.redirectTo({
        url: '../step-1/step-1',
      })
    }
    // 如果没有选择，就要它选择
    else if (!this.data.photo) {
      login.show('先选择图片!');
      return;
    }
    // 如果已经选择了但没有上传，开始上传
    else {
      if (!this.data.account) {
        login.show('获取账户信息失败，请稍后再试！');
        login.setAccount(this);
      }
      // 发送图片到OSS
      ajax({
        url: 'sign/oss/get',
        success: res => {
          if (res.data && res.data.errcode === 0) {
            // 获取服务器传回的OSS信息
            let sign = res.data;
            delete sign.errcode;
            delete sign.errmsg;
            // 将OSS信息保存到全局
            handler.sign = sign;
            // 通过全局获取选择的文件
            let file = handler.file;
            // 上传文件到OSS
            wx.uploadFile({
              url: sign.host,
              filePath: file.path,
              name: 'file',//指定上传内容为file类型（即表单中的key->name属性是file）name='file'
              formData: {
                key: sign.dir + this.data.studentNum,//上传文件的文件名。如果名称包含路径，则OSS会自动创建相应的文件夹
                name: file.path,
                policy: sign.policy,
                Signature: sign.signature,
                OSSAccessKeyId: sign.accessid,
                success_action_status: '200',
              },
              success: res => {
                console.log(res);
                if (res.statusCode === 200) {
                  login.show('上传成功！');
                  this.setData({
                    uploaded: false,
                  })
                  // 将上传的路径返回给后端，进行存储
                  ajax({
                    url: 'whusu/head/img/add',
                    data: {
                      headimgurl: sign.dir + this.data.studentNum
                    },
                    success: res => {
                      if (res.data && res.data.errcode === 0) {
                        this.setData({
                          uploaded: true,
                        })
                      }
                      if (res.data && res.data.errcode === 200111) {
                        login.show(res.data.tip);
                      }
                    }
                    
                  });
                }
                else {
                  login.show('上传失败qwq');
                }
              }
            });


          }
        }
      });
    }



  },
  skip: function(e){
    
    ajax({
      url: 'whusu/head/img/add',
      data: {
        headimgurl: "notheadimg"
      },
      success: function(data) {
        
          wx.redirectTo({
            url: '../step-1/step-1',
          })
        
      }
    });
    
  },

  // 选择图片
  chooseImage: function (e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log(res);
        // 如果文件已经上传过，更换图片之后重新上传
        this.setData({
          uploaded:false,
        })
        // 临时文件数组
        let tempFiles = res.tempFiles;
        if (tempFiles.lenth === 0) {
          return;
        }
        // 获取当前文件
        let file = tempFiles[0];
        // 5MB = 2*1024KB = 2*1024*1024B
        if (file.size > 1024 * 1024 * 5) {
          login.show("图片过大，请选择5MB以下的文件");
          return;
        }
        // 将文件传入全局变量，上传时调用
        handler.file = file;
        this.setData({
          photo: file.path,
        })

      }
    });
  },

  // 初始时，获取用户的基本信息，包括是否已经上传头像
  onLoad: function (options) {
    ajax({
      url: 'whusu/base/info/get',
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0 && res.data.headimgurl) {
          let avatar = res.data.headimgurl;
          this.setData({
            photo: avatar,
            uploaded: true,
          })
        }
      }
    })
    login.setAccount(this);
  },
  onReady: function(e){

  },

})