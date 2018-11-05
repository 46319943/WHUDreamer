// pages/questionnaire /questionnaire .js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
var habit = [];
Page({

  data: {
    submitbtn: true,
    ansstyle: []
  },

  onLoad: function (options) {
    var that = this;
    console.log(globalData);
    ajax({
      url:'eca/get/statistics',
      method: 'get',
      success: res=>{
        if(res.data.errcode === 0){
          var habits = res.data.data.habits;
          that.setData({habits});
          var backimg = res.data.data.backimg;
          that.setData({backimg});
          var ansstyle = that.data.ansstyle;
          for(let i in habits){
            ansstyle.push('ans')
          }
          console.log(ansstyle)
          that.setData({ansstyle});
        }
        else{
          
        }
      }
    })
  },
  ans: function(e){
    var code = e.currentTarget.dataset.code;
    var ansstyle = this.data.ansstyle;
    if(habit.length < 5 && habit.indexOf(parseInt(code)) < 0) habit.push(code);
    if(habit.length == 5 && habit.indexOf(parseInt(code)) < 0) {
      habit.shift();
      habit.push(code);
    }
    for(let i in ansstyle){
      if(habit.indexOf(parseInt(i)) >= 0) ansstyle[i] = 'ansed';
      else ansstyle[i] = 'ans'
    }
    this.setData({ansstyle});
    console.log(habit);
    if(habit.length == 5){
      this.setData({submitbtn: false});
    }
  },
  submit: function(){
    ajax({
      url:'eca/add/habit',
      data: {
        habit,
        sn: globalData.account.studentNum
      },
      success: res=>{
        if(res.data.errcode === 0){
          wx.redirectTo({url: '../questionnaire/questionnaire'});
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