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
  changeName: function(e) {
    this.setData({
      name: 'HAHA'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})