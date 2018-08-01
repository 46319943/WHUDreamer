var helloData = {
  name: 'piaoyang'
}

// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: '"http://i4.bvimg.com/578488/2ef836f9d7c84adc.jpg"',
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
  test: function(){
    wx.navigateTo({
      url:'../newUser/student'
    })
  },

})