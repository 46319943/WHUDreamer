let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let interviewlist = globalData.interviewlist;
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
    info: false
  },
  onLoad: function (options) {
    var that = this;
    if(!globalData.join){
      login.show('数据错误！');
      wx.navigateBack();
    }
    let join = globalData.join;
    let data = {
      section:join.first,
      photo:join.headimgurl,
      edit:join.edit,
    }
    if(join.second){
      data['sectionT'] = join.second;
    }
    this.setData(data);
    ajax({
      url: 'interview/time/get',
      method: 'GET',
      success: (res) => {
        console.log("获取用户面试时间地点信息");
        console.log(res);
        if(res.data.errcode === 0) {
          getApp().globalData.interviewlist = res.data.list;
          that.setData({
            info: true,
            edit: false
          })
        }
      }
    });
  },


  tap: function(e){
    wx.navigateBack();
  },
  edit: function(e){
    wx.redirectTo({url:'../step-4/step-4?edit=true'});

  },
  info: function(e) {
    wx.navigateTo({
      url: "/pages/join/complete/info/info"
    })
  }

})