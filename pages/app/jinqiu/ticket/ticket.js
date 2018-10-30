// pages/app/jinqiu/ticket/ticket.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    disable: true,
    start: false
  },

  onLoad: function (options) {
    var time = 0;
    console.log(globalData)
    this.setData({name: globalData.account.name})
    var that = this;
    ajax({
      url: 'jinqiu/get/actioninfo',
      method: 'GET',
      success: res => {
        if (res.data.errcode === 0) {
          time = parseInt(res.data.data.startTime) - parseInt(res.data.data.time);
          console.log(res.data.data.endTime);
          let data = new Date(res.data.data.endTime * 1000);
          console.log(data);
          res.data.data.endTime = util.formatTime(data);
          console.log(res.data.data.endTime);
          console.log(res.data.data.startTime);
          data = new Date(res.data.data.startTime * 1000);
          console.log(data);
          res.data.data.startTime = util.formatTime(data);
          console.log(res.data.data.startTime);
          that.setData({data: res.data.data})
          if(time > 0){
            var timer = setInterval(function(){
              
              data = new Date(time * 1000);
              let day = data.getDate();
              let hour = data.getHours();
              let minutes = data.getMinutes();
              let seconds = data.getSeconds();
              if(parseInt(day) > 1) that.setData({leftTime: "还未到抢票时间"});
              else if(parseInt(hour) > 8) that.setData({leftTime: parseInt(hour-8)+"小时"});
              else if(parseInt(minutes) > 5) that.setData({leftTime: parseInt(minutes)+"分钟"});
              else that.setData({leftTime: (parseInt(minutes*60)+parseInt(seconds))+"秒"});
              time--;
              if(time <= 0) {
                that.setData({leftTime: "点击抢票"});
                that.setData({disable: false});
                that.setData({start: true});
                clearInterval(timer);
                
              }
            },1000)
          } else{
            that.setData({disable: false, leftTime: "点击抢票", start: true})
          }
        } else{login.show(res.data.errmsg);}
      },
    })
  },
  ticket: function(e){
    var that = this;
    wx.request({
      url: 'https://1492644395495447.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/dreamer_test_ide_one/ticket/?sn='+globalData.account.studentNum+'&uid='+that.data.data.uid+'&id='+that.data.data.id,
      success: function(res){
        console.log(res)
        if(res.data == 0) wx.redirectTo({url: 'success/success?type=1'});
        else if(res.data == 50002) login.show('您的已抢票数已达上限');
        else if(res.data == 50001) wx.redirectTo({url: 'fail/fail'});
        else if(res.data == 50004) login.show('请在正确的时间进行抢票');
        else if(res.data == 50003) login.show('无抢票权限');
        else if(res.data == 50005) wx.redirectTo({url: 'success/success?type=2'});
      }
    })
  }
  
})