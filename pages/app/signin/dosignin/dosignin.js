// pages/app/signin/dosignin/dosignin.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deletemodalput: true,
    actionSheetItems:[
      {bindtap:'dovacate',txt:'请假'}
     ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      type: options.type
    })
  },
  scanCode: function (e) {
    var that = this;
    wx.scanCode({
      success: res => {
        console.log(res);
        let uid = res.result;
        that.setData({ uid });
        that.data.uid = uid;
        that.dosignin();
        
      }
    })
  },
  dosignin: function() {
    
    
    var that = this;
    let uid = this.data.uid;
    let signinid = this.data.id;
    ajax({
      url: 'signin/dosignin',
      data: {
        uid: uid,
        signinid: signinid
      },
      success: res => {
        if (res.data.errcode === 0) {
          if (res.data.latetime > 0) {
            var date = new Date(res.data.latetime * 1000);
            login.show('迟到' + date.getHours() + '小时' + date.getMinutes() + '分钟' + date.getSeconds() + '秒')
            setTimeout(that.scanCode(), 1000);
          } else {
            login.show('签到成功');
            setTimeout(that.scanCode(),1000);
          }
        } else if (res.data.errcode === 50024) {
          login.show('该用户已经签过到了');
        } else if (res.data.errcode === 20010) {
          login.show('签到失败' + res.data.errmsg);
        }

      },
    })
  },
  vacate: function(e){
    let college = e.currentTarget.dataset.college;
    this.setData({
      college,
      deletemodalput: false
    });
  },

  dovacate: function(){
    let college = this.data.college;
    let id = this.data.id;
    var that = this;
    ajax({
      url: 'signin/vacate',
      data: {
        college,
        signinid: id
      },
      success: res => {
        if (res.data.errcode === 0) {
          login.show('请假成功');
          that.onShow();
          this.cancel();
        } else if (res.data.errcode === 50029) {
          login.show('该学院已经请过假了');
          this.cancel();
        } else{
          login.show(res.data.errmsg);
          this.cancel();
        }

      },
    })
  },

  cancel: function(){
    this.setData({
      deletemodalput: true
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let id = this.data.id;
    ajax({
      url: 'signin/getsigninfo',
      data: {
        id
      },
      success: res => {
        if (res.data.errcode === 0) {
          for(let i in res.data.data.signinuserinfo){
            if(res.data.data.signinuserinfo[i]){
              if(res.data.data.signinuserinfo[i].time != '0'){
                var time = new Date(res.data.data.signinuserinfo[i].time * 1000);
                res.data.data.signinuserinfo[i].time = time.getFullYear()+'年'+time.getMonth()+'月'+ time.getDate()+'日'+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
                if(res.data.data.signinuserinfo[i].latetime > 0){
                  var latetime = new Date(res.data.data.signinuserinfo[i].latetime * 1000);
                  res.data.data.signinuserinfo[i].latetime = '迟到' + latetime.getHours() + '小时' + latetime.getMinutes() + '分钟' + latetime.getSeconds() + '秒'
                }else{
                  res.data.data.signinuserinfo[i].latetime = '正常';
                }
              }else{
                res.data.data.signinuserinfo[i].time = '***';
                res.data.data.signinuserinfo[i].latetime = '***'
              }
              
            }
            
          }
          this.setData({
            data: res.data.data
          })
        } else if (res.data.errcode === 50028) {
          login.show('暂时没有人签过到');
        } else if (res.data.errcode === 50027) {
          login.show('获取数据失败' + res.data.errmsg);
        }

      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})