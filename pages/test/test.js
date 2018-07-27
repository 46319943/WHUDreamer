// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[]
  },
  clean: function(){
    this.setData({
      message:[]
    });
  },
  testFunction: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('获取code成功，正在发送请求');
          show(that,'获取code成功，正在发送请求')
          console.log(res.code);
          show(that,res.code);
          //发起网络请求
          wx.request({
            url: 'https://think.whusu.org/user/login',
            data: {
              code: res.code
            },
            method: 'POST',
            success: function (res) {
              console.log('请求解析成功！');
              show(that,'请求解析成功！');
              console.log(res.data);
              show(that,res.data);
            },
            fail: function (res) {
              console.log('请求失败失败');
              show(that,'请求失败失败');
              console.log(res);
              show(that,res);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg);
          show(that,'登录失败！' + res.errMsg);
        }
      }
    });
  },
  
})
function show(_this,msg){
  console.log(_this);
  var message = _this.data.message;
  message.push(msg);
  _this.setData({
    message:message
  });
}