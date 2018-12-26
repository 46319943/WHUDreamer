// pages/app/qylj/search/search.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  data: {
    typelist: ["未揽收", "已揽收", "已确认", "派送中", "已收货", "未收货", "已回退", "无法联络"],
    typeclass: ["type", "type", "type", "type", "type", "type", "type", "type"],
    dis: true,
    type: []
  },

  onLoad: function (options) {

  },

  onShow: function () {
    var that = this;
    ajax({
      url: 'qingyou/get/collect',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          that.setData({baidianlist: res.data.data.list});
        }else if (res.data.errcode === 50001) {
          
        }
      }
    })
    ajax({
      url: 'qingyou/get/receiving',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          that.setData({sushelist: res.data.data.list});
        }else if (res.data.errcode === 50001) {
          
        }
      }
    })
  },
  baidianchange: function(e){
    console.log(e);
    this.setData({baidian: e.detail.value});
  },
  sushechange: function(e){
    var that = this;
    this.setData({sushe: e.detail.value, dis: false});
    ajax({
      url: 'qingyou/get/receiving',
      data: {floor: that.data.sushelist[e.detail.value].value},
      success: res => {
        if (res.data && res.data.errcode === 0) {
          that.setData({xiangxilist: res.data.data.list});
        }else if (res.data.errcode === 50001) {
          
        }
      }
    })
  },
  xiangxichange: function(e){
    this.setData({xiangxi: e.detail.value});
  },
  select: function(e){
    var that = this;
    var key = e.currentTarget.dataset.key;
    var type = this.data.type;
    var typeclass = that.data.typeclass;
    if(type.indexOf(key) < 0){
      type.push(key);
    } else {
      type.splice(type.indexOf(key), 1);
    }
    for(let i in typeclass){
      typeclass[i] = "type";
    }
    for(let j in type){
      typeclass[type[j]] = "typed";
    }
    this.setData({type, typeclass});
  },
  search: function(){
    var type = this.data.type.join(",") ? this.data.type.join(",") : "";
    var baidian = this.data.baidian ? this.data.baidianlist[this.data.baidian].value : "";
    var sushe = this.data.sushe ? this.data.sushelist[this.data.sushe].value : "";
    var xiangxi = this.data.xiangxi&&this.data.xiangxilist ? this.data.xiangxilist[this.data.xiangxi].value : "";
    wx.redirectTo({url: '../index?page=1&area='+baidian+"&dormarea="+sushe+"&floor="+xiangxi+"&type="+type});
  }
})