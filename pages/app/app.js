let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({
  data: {
    avatar:'../../images/user-avatar.jpg',
    name:'罗运',
    position:'珞珈创意工作室',
    apps:[
      {
        name: '加入校会',
        color: 'rgba(67, 207, 124, 1)',
        icon: '../../images/app-1.png',
        url: '../join/step-0/step-0'
      },
      {
        name: '面试官',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-2.png'
      },
      {
        name: '日志',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-3.png'
      },
      {
        name: '动态发布',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-4.png'
      },
      {
        name: '审批',
        color: 'rgba(253, 178, 70, 1)',
        icon: '../../images/app-5.png'
      },
      {
        name: '订邮',
        color: 'rgba(229, 79, 79, 1)',
        icon: '../../images/app-6.png'
      },
      {
        name: '文件中心',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-7.png'
      },
      {
        name: '智能报表',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-8.png'
      },
      {
        name: '查询宿舍',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-8.png',
        url:'../domitory/domitory'
      },
    ]
  },
  
  onShow: function(e){

    login.flush();


    // 刷新用户信息
    login.setAccount(this);
  },

  /**
   * 如果没有指定点击时间，就触发默认的点击事件
   */
  tapEvent: function(e){
    let url = e.currentTarget.dataset.url;
    if(!url){
      wx.showToast({
        title: '功能尚未开放',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 显示二维码
   */
  codeTap: function(e){
    wx.navigateTo({
      url: '../code/code'
    })
  },

})