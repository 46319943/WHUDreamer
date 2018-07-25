// pages/join/step-3/step-3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexOfArea: 0,
    area: [
      '信息学部',
      '文理学部桂圆区域'
    ],
    indexOfBuilding: 0,
    building: [
      '信息13舍',
      '信息14舍'
    ],
  },
  areaPickerChange: function(e) {
    this.setData({
      indexOfArea: e.detail.value,
      indexOfBuilding: 0,
    });
    switch (e.detail.value) {
      case '0':
        this.setData({
          building: ['信息13舍', '信息14舍']
        });
        break;
      case '1':
        this.setData({
          building: ['桂圆2舍', '桂圆3舍']
        });
        break;
    }

  },
  buildingPickerChange: function(e){
    this.setData({
      indexOfBuilding: e.detail.value
    });
  },
  formSubmit: function(e){

    wx.navigateTo({
      url: '../step-4/step-4',
    })
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