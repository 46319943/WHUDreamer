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
    let student_num = options.stuNum;
    ajax({
      url:'signup/user/info/get',
      data:{student_num},
      success: res => {
        if(res.data && res.data.errcode === 0){
          let target = res.data;
          delete target.errcode;
          delete target.errmsg;
          for (const key in target) {
            if (target.hasOwnProperty(key)) {
              const element = target[key];
              this.setData({[key]:element});
            }
          }
        }
        else{
          login.show('获取信息失败，请重试');
        }
      }
    });
  },

  
})