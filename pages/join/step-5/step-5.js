// pages/join/step-5/step-5.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    limit:200,
    hobby:['HTML','CSS','JS'],
    option:['HTML','CSS','JS','JAVA','TS','学习','睡觉','找女友？']
  },
  textInput: function(e){
    this.setData({
      count:e.detail.value.length
    });
  },
  optionTap: function(e){
    let hobby = this.data.hobby;
    let option = e.target.dataset.name;
    if(hobby.indexOf(option)===-1){
      hobby.push(option);
      this.setData({
        hobby:hobby
      });
    }
    console.log(this);
    console.log(e);
  },
  hobbyTap: function(e){
    let hobby = this.data.hobby;
    let option = e.target.dataset.name;
    hobby.splice(hobby.indexOf(option),1);
    this.setData({
      hobby:hobby
    });
    console.log(this);
    console.log(e);
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