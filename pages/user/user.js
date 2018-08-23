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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
    userinfo: null
  },

  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     // 如果有用户信息，就直接跳转到界面
  //     // wx.switchTab({
  //     //   url: '../app/app'
  //     // });
  //     console.log('haveme');
  //   }
  //   else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     // 当获取到userInfo之后，就会回调这个函数
  //     app.userInfoReadyCallback = res => {
  //       // 回调延迟跳转
  //       // wx.switchTab({
  //       //   url: '../user/user'
  //       // });
  //       console.log('yesyesyesyesyesyesy');
  //     }
  //     // 得知用户没有授权获取用户信息
  //     app.userInfoNoAuthCallback = res => {
  //       console.log('?>?>?>?>?>?>?>?>?>??>?');
  //     }

  //   }
  //   else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         // 设置全局用户信息
  //         app.globalData.userInfo = res.userInfo
  //         // 设置全局加密信息
  //         app.globalData.userInfo.encryptedData = res.encryptedData;
  //         app.globalData.userInfo.iv = res.iv;
  //         // 获取到用户信息之后跳转
  //         wx.switchTab({
  //           url: '../app/app'
  //         });
  //       }
  //     })
  //   }
  // },
  onShow: function () {

    login.flush();

    let account;
    if ((account = login.setAccount(this))) {
      this.setData({
        background: account.avatar,
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
        userinfo: true

      });

    }
    else{
      this.setData({
        background: globalData.userInfo.avatarUrl,
      });
    }
  },

  
  // 跳转绑定页面
  bind: function () {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../newUser/student'
      })
      app.globalData.flag = true;
      wx.getUserInfo({
        
        success: function (res) {
          console.log(7);
          app.globalData.userInfo = res.userInfo
          that.setData({
            userinfo: res.userInfo,
          })
          
          //平台登录
        },
        fail: function (res) {
          console.log(8);
          console.log(res);
        }
      })
      
    }else{
    wx.navigateTo({
      url: '../newUser/student'
    })
    }
  },

  // 删除绑定按钮
  bindDelete: function () {
    // 展示提示框
    wx.showModal({
      title:'确定解绑嘛？',
      content:'解绑之后将不能使用部分功能',
      success: res => {
        // 如果点击了去顶
        if(res.confirm){
          // 发送请求删除绑定
          ajax({
            url:'user/info/del',
            method:'DELETE',
            success: res => {

              if(res.data && res.data.errcode === 0){
                // 首先重新获取账户信息
                login.getAccount(()=>{
                  // 获取完账户信息之后的回调函数
                  // 重新设置账户相关信息
                  login.setAccount(this);
                });
                login.show('解绑成功');
              }
              else{
                login.show('解绑失败');
              }
            }
          });
        }
        else{

        }
      }
    });
  },

  // 
  formId: function(e){
    
    ajax({
      url:'user/formid/record',
      data:{
        formId:e.detail.formId,
      },
    });

  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 设置全局用户信息
      app.globalData.userInfo = e.detail.userInfo
      // 设置全局加密信息
      app.globalData.userInfo.encryptedData = e.detail.encryptedData;
      app.globalData.userInfo.iv = e.detail.iv;
      // 点击允许之后跳转页面
      wx.switchTab({
        url: '../user/user'
      });
    } else {
      // 用户拒绝微信授权
      console.log('用户拒绝了请求');
    }

  },
})

// page({
//   data:{
//     background: "https://files.whusu.org/media/img/icon.png",
//     avatar: 'https://files.whusu.org/media/img/icon.png',
//     userInfo:{},
//     hasUserInfo:false,
//     canIUse:wx.canIUse('button.open-type.getUserInfo')
//   },
//   onLoad:function(){
//     if(app.globalData.userInfo){
//       this.setData({
//         userInfo:app.globalData.userInfo,
//         hasUserInfo:true
//       })
//     }else if(this.data.canIUse){
//       app.userInfoReadyCallback = res =>{
//         this.setData({
//           userInfo:res.userInfo,
//           hasUserInfo:true
//         })
//       }
//     }
//   },
//   getUserInfo:function(e){
//     console.log(e)
//     if(e.datail.userInfo){
//       app.globalData.userInfo = e.detail.userInfo
//       this.setData({
//         userInfo:e.datail.userInfo,
//         hasUserInfo:true
//       })
//     }else{
//       //用户拒绝了授权请求
//       console.log('拒绝请求');
//     }
//   }
// })