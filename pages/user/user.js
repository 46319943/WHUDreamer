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
    // background: '"http://i4.bvimg.com/578488/2ef836f9d7c84adc.jpg"',
    // 注意样式背景不支持本地图片
    background: '"https://files.whusu.org/media/img/icon.png"',
    avatar: 'https://files.whusu.org/media/img/icon.png',
    name: '尚金诚',
    position: '常务副主席',
    detail: [{
      key: '手机号',
      value: '186****1234'
    },
    {
      key: '电子邮箱',
      value: 'example@qq.com'
    },
    {
      key: '所在院系',
      value: '资源与环境科学学院'
    }
    ],
    userInfo: globalData.userInfo,
  },
  onLoad: function () {
    this.setData({
      userInfo: globalData.userInfo,
    })
  },

  onShow: function () {

    login.flush();

    let account;
    if ((account = login.setAccount(this))) {
      this.setData({
        detail: [{
          key: '手机号',
          value: account.phone
        },
        // {
        //   key: '电子邮箱',
        //   value: 'example@qq.com'
        // },
        {
          key: '所在院系',
          value: account.college
        },
        {
          key: '专业',
          value: account.major
        }
        ],

      });

    }
    if(globalData.userInfo){
      
      this.setData({
        background: globalData.userInfo.avatarUrl,
      });
    }


    console.log(account);
    
  },


  // 删除绑定按钮
  bindDelete: function () {
    // 展示提示框
    wx.showModal({
      title: '确定解绑嘛？',
      content: '解绑之后将不能使用部分功能',
      success: res => {
        // 如果点击了取消
        if (res.confirm) {
          // 发送请求删除绑定
          ajax({
            url: 'user/info/del',
            method: 'DELETE',
            success: res => {

              if (res.data && res.data.errcode === 0) {
                // 首先重新获取账户信息
                login.getAccount(() => {
                  // 获取完账户信息之后的回调函数
                  // 重新设置账户相关信息
                  login.setAccount(this);
                });
                login.show('解绑成功');
              }
              else {
                login.show('解绑失败');
              }
            }
          });
        }
        else {

        }
      }
    });
  },

  formId: function (e) {
    login.formIdUpload(e);
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 设置全局用户信息
      app.globalData.userInfo = e.detail.userInfo
      // 设置全局加密信息
      app.globalData.userInfo.encryptedData = e.detail.encryptedData;
      app.globalData.userInfo.iv = e.detail.iv;

      // 点击允许之后跳转页面
      wx.navigateTo({
        url: '../newUser/student'
      });
    } else {
      // 用户拒绝微信授权
      login.show('必须授权才能进行用户绑定！');
    }

  },
})