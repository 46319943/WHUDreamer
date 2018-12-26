
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({
  data: {
    url:null
  },


  onLoad: function(options){
    console.log(options);
    var num = Math.floor(Math.random()*10+1);
    this.setData({url:options.url+"?phpsessid="+handler.cookie+"#"+num});
  },

})