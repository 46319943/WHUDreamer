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
    imageSwiper: [
      '../../images/app-1.png',
      '../../images/app-2.png',
      '../../images/app-3.png',
      '../../images/app-4.png',
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    content: [
      {
        title: '金秋艺术节志愿者同学报名',
        author: '武汉大学学生会文艺部',
        description: '金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date: '07/18 19:20',
        join: true,
        total: 200,
        count: 198,
        icon: '../../images/icon-join.png',
        detail: 'xxx'//detail相关信息
      },
      {
        title: '金秋艺术节志愿者同学报名',
        author: '武汉大学学生会文艺部',
        description: '金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date: '07/18 19:20',
        join: false,
        total: 200,
        count: 198,
        icon: '../../images/icon-join.png'
      },
      {
        title: '金秋艺术节志愿者同学报名',
        author: '武汉大学学生会文艺部',
        description: '金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date: '07/18 19:20',
        join: false,
        icon: '../../images/icon-join.png'
      },
      {
        title: '金秋艺术节志愿者同学报名',
        description: '金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date: '07/18 19:20',
        join: false,
        icon: '../../images/icon-join.png',
        image: '../../images/status-image.jpg'
      },
      {
        title: '金秋艺术节志愿者同学报名',
        description: '金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date: '07/18 19:20',
        image: '../../images/status-image.jpg'
      },
      {
        title: '金秋艺术节志愿者同学报名',
        description: '金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
      },
      {
        title: '梦想珈开发报告',
        description: '梦想珈开发报告：inline-block使用中出现的诡异的空行，已解决，但值得深入探讨。不管了，洗洗睡吧，明天再说',
        icon: '../../images/icon-alert.png',
        color: 'rgba(245, 92, 92, 1)',
        date: '2018/7/27 23:13'
      },
    ]
  },
  detailTap: function (e) {
    //设置全局变量来传递detail信息


    //或者在链接后面直接传参，在detail页面中的option来接收
    wx.navigateTo({
      url: '../detail/detail'
    });
  },


  onShow: function () {
    login.flush(this);
  },
  onLoad: function (e) {
    ajax({
      method: 'GET',
      url: 'base/banner/get',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          let list = res.data.list;
          this.setData({
            imageSwiper: list,
          });
        }
      },
    });
  }
})