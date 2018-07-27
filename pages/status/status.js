// pages/status/status.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [{
      url: '../../images/app-1.png'
    },
    {
      url: '../../images/app-2.png'
    },
    {
      url: '../../images/app-3.png'
    },
    {
      url: '../../images/app-4.png'
    },

    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    content: [
      {
        title:'金秋艺术节志愿者同学报名',
        author:'武汉大学学生会文艺部',
        description:'金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date:'07/18 19:20',
        join:true,
        total:200,
        count:198,
        icon:'../../images/icon-join.png'
      },
      {
        title:'金秋艺术节志愿者同学报名',
        author:'武汉大学学生会文艺部',
        description:'金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date:'07/18 19:20',
        join:false,
        total:200,
        count:198,
        icon:'../../images/icon-join.png'
      },
      {
        title:'金秋艺术节志愿者同学报名',
        author:'武汉大学学生会文艺部',
        description:'金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date:'07/18 19:20',
        join:false,
        icon:'../../images/icon-join.png'
      },
      {
        title:'金秋艺术节志愿者同学报名',
        description:'金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date:'07/18 19:20',
        join:false,
        icon:'../../images/icon-join.png'
      },
      {
        title:'金秋艺术节志愿者同学报名',
        description:'金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
        date:'07/18 19:20',
      },
      {
        title:'金秋艺术节志愿者同学报名',
        description:'金秋服饰大赛是金秋艺术节比赛中的一个项目，需要招募工作人员200名，点击报名！',
      },
      {
        title:'梦想珈开发报告',
        description:'梦想珈开发报告：inline-block使用中出现的诡异的空行，已解决，但值得深入探讨。不管了，洗洗睡吧，明天再说',
        icon:'../../images/icon-alert.png',
        color:'rgba(245, 92, 92, 1)',
        date:'2018/7/27 23:13'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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