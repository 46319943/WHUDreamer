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
  bind: function () {
    wx.navigateTo({
      url: '../newUser/student'
    })
  },
  onLoad: function () {
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
  }
})