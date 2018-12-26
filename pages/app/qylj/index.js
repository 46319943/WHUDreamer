// pages/app/qylj/index.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  data: {
    count: 0,
    maxpage: 1
  },

  onLoad: function (options) {
    this.setData({page: options.page ? options.page : "", area: options.area ? options.area : "", dormarea: options.dormarea ? options.dormarea : "", floor: options.floor ? options.floor : "", type: options.type ? options.type : ""})
  },

  onShow: function () {
    var that = this;
    ajax({
      url: 'qingyou/get/admin/giftlist',
      data: {
        page: that.data.page,
        receiving_area: that.data.area,
        dormarea: that.data.dormarea,
        floor: that.data.floor,
        type: that.data.type
      },
      success: res => {
        if (res.data && res.data.errcode === 0) {
          that.setData({
            count: res.data.data.count,
            maxpage: res.data.data.max_page,
            page: res.data.data.page,
            list: res.data.data.list
          })
        }else if (res.data.errcode === 50001) {
          
        }
      }
    })
  },
  task: function(){
    wx.redirectTo({url: 'task/task'});
  },
  info: function(e){
    //wx.showToast({title:"暂未开放",icon:"none"});
    wx.navigateTo({url: 'info/info?code='+e.currentTarget.dataset.code});
  },
  search: function(){
    wx.redirectTo({url: 'search/search'});
  },
  next: function(){
    var that = this;
    if(parseInt(that.data.page) < parseInt(that.data.maxpage)) {
      that.setData({page: parseInt(that.data.page)+1});
      that.onShow();
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  prev: function(){
    var that = this;
    if(parseInt(that.data.page) > 1) {
      that.setData({page: parseInt(that.data.page)-1});
      that.onShow();
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
})