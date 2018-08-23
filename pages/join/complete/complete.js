let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快与我一起加入武汉大学学生会',
      path: '/pages/user/user',
      imageUrl: 'https://files.whusu.org/media/img/tuiguang.png'
    }
  },

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