let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  formSubmit: function(e){
    console.log(e);
    let res = e.detail.value;
    let id = res.id;
    let pass = res.pass;
    let phone = res.phone;
    let email = res.email;
    ajax({
      url:'user/info/add/bkjw',
      data:{
        phone:phone,
        email:email,
        student_num:id,
        password:pass,
        encryptedData: globalData.userInfo.encryptedData,
        iv: globalData.userInfo.iv,
      },
      success: res => {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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