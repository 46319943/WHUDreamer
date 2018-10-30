// pages/app/jinqiu/ticket/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    if(type == 1){
      this.setData({text: '抢票成功'})
    } else {
      this.setData({text: '重复抢票'});
      wx.setNavigationBarTitle({ title: '重复抢票' })
    }
  },

})