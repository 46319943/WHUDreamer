// pages/app/chinese/admin/admin.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  data: {
    display: true,
    actionSheetItems:[
      {bindtap:'delete',txt:'删除'}
    ],
    deletemodalput: true
  },

  onLoad: function (options) {
    var that = this;
    ajax({
      url: 'chinese/corner/isadmin',
      method:'GET',
      success: res => {
        if (res.data.errcode === 0) {
          console.log(res.data.collegelist);
          that.setData({collegelist: res.data.collegelist, isadmin: res.data.isadmin})
        }
        
      }
    })
    ajax({
      url: 'chinese/corner/getapplylist',
      method:'GET',
      success: res => {
        if (res.data.errcode === 0) {
          that.setData({studentslist: res.data.data})
        }
        
      }
    })
    ajax({
      url: 'chinese/corner/getvolunteerlist',
      method:'GET',
      success: res => {
        if (res.data.errcode === 0) {
          that.setData({volunteerlist: res.data.data})
        }
        
      }
    })
  },
  tab1: function(e){
    this.setData({display: true})
  },
  tab2: function(e){
    this.setData({display: false})
  },
  navi: function(e){
    wx.redirectTo({url: '../chinese'})
  },
  navi2: function(e){
    wx.redirectTo({url: '../volunteer/volunteer'})
  },
  cancel: function(e){
    this.setData({
      deletemodalput: true
    })
  },
  beforedelete1: function(e){
    this.setData({
      type: 1,
      id: e.currentTarget.dataset.id,
      deletemodalput: false
    })
  },
  beforedelete2: function(e){
    this.setData({
      type: 2,
      id: e.currentTarget.dataset.id,
      deletemodalput: false
    })
  },
  delete: function(e){
    var that = this;
    let type = this.data.type;
    let id = this.data.id;
    if(type == 1){
      ajax({
        url: 'chinese/corner/deleteapplylist',
        data: {id},
        success: res => {
          if (res.data.errcode === 0) {
            login.show("删除成功");
            ajax({
              url: 'chinese/corner/getapplylist',
              method:'GET',
              success: res => {
                if (res.data.errcode === 0) {
                  that.setData({studentslist: res.data.data});
                  that.onLoad();
                  that.cancel();
                }
                
              }
            })
          }
          
        }
      })
    }
    if(type == 2){
      ajax({
        url: 'chinese/corner/deletevolunteerlist',
        data: {id},
        success: res => {
          if (res.data.errcode === 0) {
            login.show("删除成功");
            ajax({
              url: 'chinese/corner/getvolunteerlist',
              method:'GET',
              success: res => {
                if (res.data.errcode === 0) {
                  that.setData({volunteerlist: res.data.data})
                  that.onLoad();
                  that.cancel();
                }
                
              }
            })
          }
          
        }
      })
    }
  }
})