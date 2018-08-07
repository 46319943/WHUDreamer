let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'../../images/codeImg.png',
    avatar:'../../images/user-avatar.jpg',
    name:'尚金诚',
    position:'武汉大学学生会常务副主席',
    date:'2018/7/26 22:11'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax({
      url:'user/qrcode/get',
      method:'GET',
      success:(res)=>{
        console.log(res);
        if(res.data.errcode===0){
          let result = res.data;
          let uid = result.uid;
          let time = result.out_time;
          let date = new Date(time);
          this.setData({
            date:date.getFullYear() + '/' + date.getMonth()+1 + '/' + date.getDay()
             + ' ' +date.getHours() + ':' + date.getMinutes(),
             code: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + uid,
          })
        }
      }
    });
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