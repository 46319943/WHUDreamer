let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;

Page({
  data: {
    // background: '"http://i4.bvimg.com/578488/2ef836f9d7c84adc.jpg"',
    background: '"../../images/user-avatar.jpg"',
    avatar: '../../images/user-avatar.jpg',
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
    ]
  },


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
        ]
      });

    }
  },

  
  // 跳转绑定页面
  bind: function () {
    wx.navigateTo({
      url: '../newUser/student'
    })
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
              console.log(res);
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
      data:e.detail.formId,
    })

  }


})