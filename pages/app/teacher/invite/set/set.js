let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
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
    this.setData(options);
  },

  bindDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e){
    this.setData({
      time: e.detail.value
    })
  },
  submit: function(e){
    login.formIdUpload(e);

    let res = e.detail.value;

    // 处理日期
    if(this.data.date && this.data.time){
      let date = this.data.date.replace('-','/');
      let time = this.data.time;
      let str = date + ' ' + time;
      let num = Date.parse(str)
      res.time = num;
      console.log(num);
    }
    else{
      login.show("存在未填写字段");
      return;
    }

    res.id = this.data.id;
    res.type = this.data.type;
    res.department =this.data.department;
    
    ajax({
      url:'redlecturer/invite',
      data:res,
      success: res=>{
        if(res.data.errcode === 0){
          login.show('邀请成功');
          setTimeout(wx.navigateBack,1000);
        }
        else{
          login.show('邀请失败' + res.data.errmsg);
        }
      }
    })

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