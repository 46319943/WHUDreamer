let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({
  data: {
    defaultPhoto: '../../../images/user-avatar.jpg'
  },
  formSubmit: function (e) {
    // 如果已经上传了文件，就跳转下一步
    if (this.data.uploaded) {
      wx.navigateTo({
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
      if(!this.data.account){
        login.show('获取账户信息失败，请稍后再试！');
        login.setAccount(this);
      }

      ajax({
        url: 'sign/oss/get',
        success: res => {
          if (res.data && res.data.errcode === 0) {
            let sign = res.data;
            delete sign.errcode;
            delete sign.errmsg;

            handler.sign = sign;

            let file = handler.file;
            wx.uploadFile({
              // url:sign.host + '/' + sign.dir,
              url: 'https://whusu.oss-cn-shanghai.aliyuncs.com',
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
                if(res.statusCode === 200){
                  login.show('上传成功！');
                  this.setData({
                    uploaded:true,
                  })
                }
                else{
                  login.show('上传失败qwq');
                }
              }
            });


          }
        }
      });
    }







  },
  // 选择图片
  chooseImage: function (e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log(res);

        let tempFiles = res.tempFiles;
        if (tempFiles.lenth === 0) {
          return;
        }
        let file = tempFiles[0];
        // 2MB = 2*1024KB = 2*1024*1024B
        if (file.size > 1024 * 1024 * 2) {
          login.show("图片过大，请选择2MB以下的文件");
          return;
        }
        handler.file = file;
        this.setData({
          photo: file.path,
        })

      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.setAccount(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})