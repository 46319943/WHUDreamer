// pages/questionnaire /questionnaire .js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
var ans = [];
Page({

  data: {
    i: 0,
    beforebtn: true,
    nextbtn: true,
    ansstyle: ['ans', 'ans', 'ans', 'ans'],
    max: 0
  },

  onLoad: function (options) {
    var that = this;
    console.log(globalData);
    ajax({
      url:'eca/get/statistics',
      method: 'get',
      success: res=>{
        if(res.data.errcode === 0){
          var questions = res.data.data.questions;
          let i = 0;
          for(let index in questions){
            console.log(index);
            questions[100+i] = questions[index];
            questions[i] = index;
            i++;
          }
          that.setData({max: i})
          console.log(questions);
          that.setData({questions});
          var backimg = res.data.data.backimg;
          that.setData({backimg});
        }
        else{
          
        }
      }
    })
  },
  ans: function(e){
    var code = e.currentTarget.dataset.code;
    var i = this.data.i;
    var ansstyle = this.data.ansstyle;
    for(let i in ansstyle){
      ansstyle[i] = 'ans'
    }
    ansstyle[parseInt(code)] = 'ansed';
    this.setData({ansstyle});
    ans[i] = code;
    console.log(ans);
    this.setData({nextbtn: false});
  },
  before: function(){
    if (this.data.i <= 0) return;
    var that = this;
    this.setData({i: that.data.i-1});
    if(this.data.i > 0) this.setData({beforebtn: false});
    if(this.data.i <= 0) this.setData({beforebtn: true});
    if(!ans[this.data.i]) this.setData({nextbtn: true});
    if(this.data.i+1 >= this.data.max) this.setData({nextbtn: true});
    var ansstyle = this.data.ansstyle;
    for(let i in ansstyle){
      ansstyle[i] = 'ans'
    }
    if(ans[this.data.i]) ansstyle[ans[this.data.i]] = 'ansed';
    this.setData({ansstyle});
    wx.setNavigationBarTitle({
      title: '测试题'+(this.data.i+1)+'/'+(this.data.max)
    })
  },
  next: function(){
    if (!ans[this.data.i]) return;
    if(this.data.i+1 >= this.data.max) {
      ajax({
        url:'eca/add/question',
        data: {
          ans,
          sn: globalData.account.studentNum
        },
        success: res=>{
          if(res.data.errcode === 0){
            wx.redirectTo({url: '../success/success'});
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
    var that = this;
    this.setData({i: that.data.i+1})
    if(this.data.i > 0) this.setData({beforebtn: false});
    if(this.data.i <= 0) this.setData({beforebtn: true});
    if(!ans[this.data.i]) this.setData({nextbtn: true});
    var ansstyle = this.data.ansstyle;
    for(let i in ansstyle){
      ansstyle[i] = 'ans'
    }
    if(ans[this.data.i]) ansstyle[ans[this.data.i]] = 'ansed';
    this.setData({ansstyle});
    wx.setNavigationBarTitle({
      title: '测试题'+(this.data.i+1)+'/'+(this.data.max)
    })
  }

})