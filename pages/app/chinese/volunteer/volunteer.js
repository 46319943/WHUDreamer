// pages/app/chinese/chinese.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  data: {
    college: 0,
    collegelist: ['121'],
    genderlist: ['男 male', '女 female'],
    gender: 0
  },

  onLoad: function (options) {
    var that = this;
    ajax({
      url: 'chinese/corner/isadmin',
      method:'GET',
      success: res => {
        if (res.data.errcode === 0) {
          console.log(res.data.collegelist);
          that.setData({collegelist: res.data.collegelist, isadmin: res.data.isadmin})
        }
        
      }
    })
  },
  navi: function(e){
    wx.redirectTo({url: '../chinese'})
  },
  navi2: function(e){
    wx.redirectTo({url: '../admin/admin'})
  },
  submit: function(e){
    console.log(e)
    let data = e.detail.value;
    for(let i in data){
      if(data[i].trim() === ""){
        login.show('Unfilled forms');
        return;
      }
    }
    ajax({
      url: 'chinese/corner/volunteer',
      data,
      success: res => {
        if (res.data.errcode === 0) {
          login.show('Submission of success');
        }
        else {
          login.show(res.data.errmsg);
        }
      }
    })
  },
  bindCollegeChange: function(e){
    this.setData({
      college: e.detail.value
    })
  },
  bindGenderChange: function(e){
    this.setData({
      gender: e.detail.value
    })
  }

})