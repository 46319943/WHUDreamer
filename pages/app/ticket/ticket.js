// pages/app/ticket/ticket.js
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
    login.flush();
    // 刷新用户信息
    login.setAccount(this);
    
    
    
    
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
    var that = this;
    ajax({
      url: 'rob/getlist',
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          let list = res.data.list;
          console.log(list);
          that.setData({ list });
        }
        else if(res.data.errcode === 50001) {
          wx.showToast({
            'title': "没有抢票活动"
            
          });
        }
      }
    })
  },
  toast: function(e) {
    if (!globalData.account) {
      wx.navigateTo({
        url: '/pages/app/ticket/bind/bind'
    });
      
    }else {
      let dataset = e.currentTarget.dataset;
    var timestamp = Date.parse(new Date());
    timestamp = Number(timestamp)/1000;
    console.log("现在的时间戳"+timestamp);
    ajax({
      url: 'rob/getbaseinfo',
      data: {
        "id": dataset.id
      },

      success: res => {
        console.log("返回信息");
        console.log(res);
        if (res.data && res.data.errcode === 0) {
          if(Number(res.data.time) < Number(dataset.starttime)) {
            login.show("抢票活动尚未开始");
          } else if(Number(res.data.time) > Number(dataset.endtime)) {
            login.show("抢票活动已结束");
          } else if(res.data.type === "exist") {
            login.show("您已经抢过票了,\n提供学号或者身份牌即可兑换");
          }else {
            wx.navigateTo({
              url: '/pages/app/ticket/detail/detail?id='+dataset.id+'&tittle='+dataset.title
          });
          }
        }
      }
    })
    }
    
    
    
  },
  onTap: function(){
    ajax({
      url: 'auth/refresh',
      method: 'GET',
      success: res => {

        // 刷新完权限之后，重新获取用户信息
        login.getAccount(() => {
          // 获取成功之后就跳转到个人中心页面
          login.show('获取用户信息成功');
          
        });

      }
    });
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