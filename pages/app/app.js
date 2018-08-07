// pages/app/app.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'../../images/user-avatar.jpg',
    name:'尚金城',
    position:'武汉大学学生会常务副主席',
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
  // 默认的点击事件
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
  codeTap: function(e){
    wx.navigateTo({
      url: '../code/code'
    })
  },
})