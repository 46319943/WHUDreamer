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
  
  },
  onLoad: function (options) {
    if(!globalData.join){
      login.show('数据错误！');
      wx.navigateBack();
    }
    let join = globalData.join;
    let data = {
      section:join.first,
      photo:join.headimgurl,
    }
    if(join.second){
      data['sectionT'] = join.second;
    }
    this.setData(data);
  },


  tap: function(e){
    wx.navigateBack();
  }

})