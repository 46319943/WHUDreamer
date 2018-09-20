// pages/app/signin/detail/detail.js
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
    nowdate: null,
    nowtime: null,
    pickerdate: null,
    pickertime: null,
    title: null,
    type: null,
    typeRange: ['任务考勤', '常代会签到']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowdate = util.formatData(new Date());
    let nowtime = util.formatTime(new Date());
    this.setData({
      nowdate,
      nowtime 
    })
  },
  bindDateChange: function(e){
    this.setData({
      pickerdate: e.detail.value
    })
  },
  bindTimeChange: function(e){
    this.setData({
      pickertime: e.detail.value
    })
  },
  bindTypeChange: function(e){
    this.setData({
      type: e.detail.value
    })
  },
  bindTextChange: function(e){
    this.setData({
      title: e.detail.value
    })
  },
  confirm: function(){
    var that = this;
    if(!this.data.pickerdate) {
      login.show('请选择一个日期');
      return;
    }else if(!this.data.pickertime){
      login.show('请选择一个时间');
      return;
    }else if(!this.data.title){
      login.show('请输入签到标题');
      return;
    }else if(!this.data.type){
      login.show('请输入面试类型');
      return;
    }else{
      let date = this.data.pickerdate;
      let time = this.data.pickertime;
      let title = this.data.title;
      let type = this.data.type;
      time = this.parse(date, time);
      ajax({
        url: `signin/addsignin`,
        data: {
          title,
          time,
          type
        },
        success: res => {
          if (res.data && res.data.errcode === 0) {
            login.show('提交成功！');
            setTimeout(() => { wx.navigateBack() }, 1000);
          }
        }
      })
    }
  },
  parse: function(_date, time) {
    let arr;
    let date = new Date("1999-09-09");
    arr = _date.split('-');
    date.setDate(parseInt(arr[2]));
    date.setFullYear(parseInt(arr[0]));
    date.setMonth(parseInt(arr[1], 10)-1);
    
    console.log("999999999999");
    console.log(parseInt(arr[1], 10));
    arr = time.split(':');
    date.setHours(parseInt(arr[0]));
    date.setMinutes(parseInt(arr[1]));
    
    

    return(date.getTime() / 1000).toFixed(0);
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