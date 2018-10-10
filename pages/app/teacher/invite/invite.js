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
    hiddenmodalput: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let department = options.department;
    this.setData({department});

    let collegeList = globalData.collegeList;
    this.setData({collegeList});

    ajax({
      url:'redlecturer/getapplyteacherlist',
      method:'get',
      success: res=>{
        if(res.data.errcode === 0){
          let list = res.data.data;
          this.setData({list});

        }
      }
    })
  },

  invite: function(e){
    console.log(e);
    let id = e.currentTarget.dataset.id;
    // 解构赋值
    
    this.setData({
      hiddenmodalput: false,
      id: id
    })
    // if(department !== 0){
    //   login.show("已被其他部门邀请");
    //   return;
    // }

    //wx.navigateTo({
      //url:`set/set?id=${id}&type=${type}&department=${this.data.department}`,
    //});
    return;
  },
  cancel: function(){
    this.setData({
      hiddenmodalput: true
    })
  },
  confirm: function(){
    var that = this;
    var id = this.data.id;
    ajax({
      url: `redlecturer/invite`,
      data: {
        id
      },
      success: res => {
        if (res.data && res.data.errcode === 0) {
          login.show('申请通过！');
          that.onLoad;
          setTimeout(() => { that.cancel() }, 1000);
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