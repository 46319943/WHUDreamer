// pages/app/eca/face/face.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    range1: ['二人组', '四人组'],
    range2: ['低于150', '151-155', '156-160', '161-165', '166-170', '171-175', '176-180', '181-185', '186-190', '191-195', '196-200', '高于200'],
    range3: ['是', '否'],
    group: null,
    height: null,
    unfinish: true
  },

  onLoad: function (options) {
    var that = this;
    console.log(globalData);
    ajax({
      url:'eca/get/statistics',
      method: 'get',
      success: res=>{
        if(res.data.errcode === 0){
          var backimg = res.data.data.backimg;
          var timeimg = res.data.data.timeimg;
          var questionimg = res.data.data.questionimg;
          var info1 = res.data.data.info1;
          var info2 = res.data.data.info2;
          that.setData({backimg, timeimg, questionimg, info1, info2});
        }
        else{
          
        }
      }
    })
  },
  change1: function(e){
    this.setData({group: e.detail.value});
    if((this.data.group || this.data.group == 0) && (this.data.height || this.data.height == 0)){
      this.setData({unfinish: false})
    }
  },
  change2: function(e){
    this.setData({height: e.detail.value});
    if((this.data.group || this.data.group == 0) && (this.data.height || this.data.height == 0)){
      this.setData({unfinish: false})
    }
  },
  change3: function(e){
    this.setData({despensing: e.detail.value});
    if((this.data.group || this.data.group == 0) && (this.data.height || this.data.height == 0) && (this.data.despensing || this.data.despensing == 0)){
      this.setData({unfinish: false})
    }
  },
  next: function(){
    var group = this.data.group;
    var height = this.data.height;
    var despensing = this.data.despensing;
    ajax({
      url:'eca/add/picker',
      data: {
        group,
        height,
        despensing,
        sn: globalData.account.studentNum
      },
      success: res=>{
        if(res.data.errcode === 0){
          wx.redirectTo({url: '../motions/motions'});
          return;
        }
        if (res.data && res.data.errcode === 50039) {
          login.show("已达到报名人数上限");
        }
        else{
          login.show(res.data.errmsg);
          return;
        }
      }
    })
  }
})