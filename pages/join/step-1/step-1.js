let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    verify: handler.common + 'verify/get/',
    indexOfPolicy: 0,
    policy: [
      '团员',
      '党员'
    ],
    indexOfInstitute: 0,
    institute: [
      '资源与环境科学学院',
      '生命科学学院'
    ],
    indexOfProfession: 0,
    profession: [
      '地理信息科学',
      '自然地理'
    ],
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    app.globalData.formInformation = e.detail.value;
    console.log(app.globalData);
    wx.navigateTo({
      url: '../step-2/step-2',
    })
  },
  institutePickerChange: function(e) {
    this.setData({
      indexOfInstitute: e.detail.value,
      indexOfProfession: 0
    });
    switch (e.detail.value) {
      case '0':
        this.setData({
          profession: [
            '地理信息科学',
            '自然地理'
          ]
        });
        break;
      case '1':
        this.setData({
          profession: [
            '生物工程'
          ]
        });
        break;
    }
  },
  policyPickerChange: function(e) {
    this.setData({
      indexOfPolicy: e.detail.value
    })
  },
  professionPickerChange: function(e) {
    this.setData({
      indexOfProfession: e.detail.value
    })
  },
  changeVerify: function(){
    //设置verify即可改变图片
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