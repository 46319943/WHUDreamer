/*

需要优化

模块化点击APP事件，减少重复代码

*/



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
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    avatar: 'https://files.whusu.org/media/img/icon.png',
    name: '罗运',
    position: '珞珈创意工作室',
    apps: [
      /** 
      {
        name: '加入校会',
        color: 'rgba(67, 207, 124, 1)',
        icon: '../../images/app-1.png',
        url: '../join/step-0/step-0',
        loginRequire: true,
        tapEvent: 'join',
        display: false,
      },
      {
        name: '院系直推',
        color: 'rgba(253, 178, 70, 1)',
        icon: '../../images/app-5.png',
        url: 'approve/approve',
        loginRequire: true,
        display: false,
      },
      {
        name: '报名查询',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-8.png',
        url: 'manager/manager',
        loginRequire: true,
        display: false,
      },
      {
        name: '电子简历',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-3.png',
        url: `../pdf/pdf`,
        loginRequire: true,
        tapEvent: 'pdf',
        display: false,
      },
      {
        name: '面试管理',
        url: 'location/location',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-2.png',
        display: false,
      },*/
      {
        name: '讲师库',
        url: 'teacher/apply/apply',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-2.png',
        display: false,
      },

      {
        name: '检票',
        url: 'jinqiucheck/check',
        color: '#663366',
        icon: '../../images/scan.svg',
        display: false,
      },
      {
        name: '活动抢票',
        url: 'jinqiu/jinqiu',
        color: '#FFCC00',
        icon: '../../images/ticket.svg',
        display: false,
      },
      {
        name: '汉语角',
        url: 'chinese/chinese',
        color: '#CC3333',
        icon: '../../images/chinese_lion.png',
        display: false,
      },
      
      {
        name: '枫珞情缘',
        url: 'eca/index/index',
        color: '#f86913',
        icon: '../../images/eca.png',
        display: false,
      },
      {
        name: '签到',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/sign.png',
        url: 'signin/signin',
        display: false,
      },
      {
        name: '情邮管理',
        color: '#212d5e',
        icon: '../../images/bags.svg',
        url: 'qylj/index?page=1',
        display: false,
      },
      {
        name: '情邮珞珈',
        color: '#212d5e',
        icon: '../../images/gift.svg',
        url: "../html/html?url=https://www.whusu.org/qylj/index.html",
        display: false,
      },
      {
        name: '日志',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-3.png',
        display: false,
      },
      {
        name: '动态发布',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-4.png',
        display: false,
      },

      {
        name: '订邮',
        color: 'rgba(229, 79, 79, 1)',
        icon: '../../images/app-6.png',
        display: false,
      },
      {
        name: '文件中心',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-7.png',
        display: false,
      },
      /**
      {
        name: '摄影大赛',
        url: 'vote/sheying/index',
        color: '#99CCFF',
        icon: '../../images/sheying.png',
        display: false,
      },
      
      {
        name: '音乐会',
        url: 'temporary/temporary',
        color: '#CC3333',
        icon: '../../images/temporary.png',
        display: false,
      },
       
      {
        name: '查询宿舍',
        color: 'rgba(64, 174, 252, 1)',
        icon: '../../images/app-8.png',
        url: 'domitory/domitory',
        display: false,
      },
      {
        name: '抢票',
        color: '#33CC33',
        icon: '../../images/app-9.png',
        url: 'ticket/ticket',
        display: false,
      },*/
      
    ]
  },
  

  onShow: function (e) {
    if(globalData.ScreenBrightness){
      wx.setScreenBrightness({
        value: globalData.ScreenBrightness
      }) 
    }
    login.flush();
    // 刷新用户信息
    login.setAccount(this);
    let apps = this.data.apps;
    for(let i in globalData.account.app){
      apps[globalData.account.app[i]].display = true;
    }
    this.setData({apps});
  },

  /**
   * 如果没有指定点击时间，就触发默认的点击事件
   */
  tapEvent: function (e) {
    login.formIdUpload(e);
    // 注意data-之后的所有-后面的一个字面转为大写。本身不支持大写
    let dataset = e.currentTarget.dataset;

    if (dataset.loginRequire && !this.data.account) {
      login.show('这个功能需要绑定才能使用哟~');
      return;
    }
    if (!dataset.url) {
      wx.showToast({
        title: '功能尚未开放',
        icon: 'none',
        duration: 2000
      });
      return;
    }


    wx.navigateTo({
      url: dataset.url,
    })
  },

  /**
   * 显示二维码
   */
  codeTap: function (e) {
    login.formIdUpload(e);
    wx.navigateTo({
      url: '../code/code'
    })
  },

  join: function (e) {
    login.formIdUpload(e);
    // 获取跳转数据
    let dataset = e.currentTarget.dataset;
    // 判断是否绑定
    if (dataset.loginRequire && !this.data.account) {
      login.show('这个功能需要绑定才能使用哟~');
      return;
    }
    // 获取是否已经完成填写
    ajax({
      url: 'whusu/base/info/get',
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          // 获取返回的报名信息
          let join = res.data;

          if (join.complete) {
            // 如果已经完成就跳转到完成页面
            globalData.join = join;
            wx.navigateTo({
              url: '../join/complete/complete',
            });
            return;
          }
          else {
            // 没有完成就跳转到相应的url
            wx.navigateTo({
              url: dataset.url,
            })

          }

        }
      }
    })
  },
  pdf: function (e) {
    login.formIdUpload(e);
    // 获取跳转数据
    let dataset = e.currentTarget.dataset;
    // 判断是否绑定
    if (dataset.loginRequire && !this.data.account) {
      login.show('这个功能需要绑定才能使用哟~');
      return;
    }
    wx.navigateTo({ url: `../pdf/pdf?num=${this.data.account.studentnum}&code=${new Date().getTime()}` });
  },
  onLoad: function (query) {
    var type = query.type;
    if(type == 2) wx.navigateTo({url: 'vote/sheying/index'});
    ajax({
      method: 'GET',
      url: 'base/banner/get/2',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          let list = res.data.list;
          this.setData({
            imageSwiper: list,
          });
        }
      },
    });
  },
  authfresh: function(e){
    ajax({
      method: 'GET',
      url: 'auth/refresh',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          login.show('权限刷新成功');
        }
      },
    });
  },
  click: function (e) {
    let url = e.currentTarget.dataset.url;
    //url = 'page://vote/sheying/index';
    if (url && url.indexOf('http') === 0 && handler.cookie) {
      wx.navigateTo({ url: '../html/html?url=' + url});
    }
    if (url && url.indexOf('page') === 0) {
      wx.navigateTo({ url: url.split('page://')[1] });
    }
  }


})