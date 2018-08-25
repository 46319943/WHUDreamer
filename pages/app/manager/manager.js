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
    // 获取所有的部门名称和对应的值
    let arr;
    ajax({
      url:'map/get/type/department',
      method:'GET',
      success: res => {
        if(res.data && res.data.data){ 
          arr = res.data.data;
        }
      }
    });



  },

  
  onShow: function () {
    ajax({})


  },

  



  onShareAppMessage: function () {
  
  }
})