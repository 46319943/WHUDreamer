// pages/questionnaire /questionnaire .js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
var motion = [];
Page({

  data: {
    submitbtn: true,
    ansstyle: [[],[],[]]
  },

  onLoad: function (options) {
    var that = this;
    console.log(globalData);
    ajax({
      url:'eca/get/statistics',
      method: 'get',
      success: res=>{
        if(res.data.errcode === 0){
          var motions = res.data.data.motions;
          that.setData({motions});
          var backimg = res.data.data.backimg;
          that.setData({backimg});
          var ansstyle = that.data.ansstyle;
          for(let i in motions['row1']){
            ansstyle[0].push('ans')
          }
          for(let i in motions['row2']){
            ansstyle[1].push('ans')
          }
          for(let i in motions['row3']){
            ansstyle[2].push('ans')
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
    var id = e.currentTarget.dataset.id;
    var ansstyle = this.data.ansstyle;
    for(let i in ansstyle[parseInt(id)]){
      ansstyle[parseInt(id)][i] = 'ans'
    }
    ansstyle[parseInt(id)][parseInt(code)] = 'ansed';
    this.setData({ansstyle});
    motion[parseInt(id)] = code;
    console.log(motion);
    if((motion[0] || motion[0] == 0) && (motion[1] || motion[1] == 0) && (motion[2] || motion[2] == 0)){
      this.setData({submitbtn: false});
    }
  },
  submit: function(){
    ajax({
      url:'eca/add/motion',
      data: {
        motion,
        sn: globalData.account.studentNum
      },
      success: res=>{
        if(res.data.errcode === 0){
          wx.redirectTo({url: '../habits/habits'});
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