// pages/questionnaire /questionnaire .js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    
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
          that.setData({backimg});
        }
        else{
          
        }
      }
    })
    ajax({
      url:'eca/get/result',
      data: {sn: globalData.account.studentNum},
      success: res=>{
        if(res.data.errcode === 0){
          that.setData({tip: "您的组员如下"});
          that.setData({result: res.data.result});
        }
        if(res.data.errcode === 50041){
          //login.show("您还没有报名");
          that.setData({tip: "您还没有报名"});
        }
        if(res.data.errcode === 50042){
          //login.show("您还没有完成所有报名项目")
          that.setData({tip: "您还没有完成所有报名项目"});
        }
        if(res.data.errcode === 50043){
          //login.show("暂时还未分配出分配结果")
          that.setData({tip: "暂时还未分配出分配结果"});
        }
        else{
          
        }
      }
    })
  },

})