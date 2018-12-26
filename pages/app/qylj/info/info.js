// pages/app/qylj/info/info.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  data: {
    typeliststd: ["未揽收", "已揽收", "已确认", "派送中", "已收货", "未收货", "已回退", "无法联络"],
  },

  onLoad: function (options) {
    var that = this;
    this.setData({code: options.code});
    ajax({
      url: 'qingyou/get/admin/giftinfo',
      data: {
        code: this.data.code
      },
      success: res => {
        if (res.data && res.data.errcode === 0) {
          that.setData({
            code: res.data.data.code,
            dormarea: res.data.data.dormarea,
            floor: res.data.data.floor,
            name: res.data.data.name,
            phone: res.data.data.phone,
            consignee_name: res.data.data.consignee_name,
            consignee_mobile_phone_number: res.data.data.consignee_mobile_phone_number,
            type: res.data.data.type,
            variable: res.data.data.variable,
            edit: res.data.data.edit,
            variable_type: res.data.data.variable_type,
            room: res.data.data.room
          })
          var typelist = [];
          typelist.push(res.data.data.type_text);
          for(let i in that.data.variable_type){
            typelist.push(that.data.variable_type[i]);
          }
          that.setData({typelist});
          console.log(typelist);
          ajax({
            url: 'qingyou/get/receiving',
            success: res => {
              if (res.data && res.data.errcode === 0) {
                that.setData({sushelist: res.data.data.list});
                for(let i in res.data.data.list){
                  if(res.data.data.list[i].text == that.data.dormarea) that.setData({sushevalue: res.data.data.list[i].value});
                }
                ajax({
                  url: 'qingyou/get/receiving',
                  data: {floor: that.data.sushevalue},
                  success: res => {
                    if (res.data && res.data.errcode === 0) {
                      that.setData({xiangxilist: res.data.data.list});
                    }else if (res.data.errcode === 50001) {
                      
                    }
                  }
                })
              }else if (res.data.errcode === 50001) {
                
              }
            }
          })
        }else if (res.data.errcode === 50001) {
          
        }
      }
    });

  },
  sushechange: function(e){
    var that = this;
    this.setData({sushe: e.detail.value, xiangxi: "0"});
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
    console.log(e);
    this.setData({xiangxi: e.detail.value});
  },
  typechange: function(e){
    console.log(e);
    for(let i in this.data.typeliststd){
      if(this.data.typeliststd[i] == this.data.typelist[e.detail.value]){
        this.setData({type: i});
      }
    }
  },
  codechange: function(e){
    console.log(e);
    this.setData({
      code: e.detail.value
    })
  },
  roomchange: function(e){
    console.log(e);
    this.setData({
      room: e.detail.value
    })
  },
  cnamechange: function(e){
    console.log(e);
    this.setData({
      consignee_name: e.detail.value
    })
  },
  cphonechange: function(e){
    console.log(e);
    this.setData({
      consignee_mobile_phone_number: e.detail.value
    })
  },
  namechange: function(e){
    console.log(e);
    this.setData({
      name: e.detail.value
    })
  },
  phonechange: function(e){
    console.log(e);
    this.setData({
      phone: e.detail.value
    })
  },
  callcphone: function(e){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.consignee_mobile_phone_number
    })
  },
  callphone: function(e){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone
    })
  },
  update: function(){
    var that = this;
    ajax({
      url: 'qingyou/edit/admin/giftinfo',
      data: {
        code: that.data.code,
        type: that.data.type,
        name: that.data.name,
        phone: that.data.phone,
        dormarea: this.data.sushe ? this.data.sushelist[this.data.sushe].value : "",
        floor: this.data.xiangxi&&this.data.xiangxilist ? this.data.xiangxilist[this.data.xiangxi].value : "",
        room: that.data.room
      },
      success: res => {
        if (res.data && res.data.errcode === 0) {
          login.show("更新成功");
          setTimeout(() => { wx.navigateBack(); }, 1000);
        }else if (res.data.errcode === 30014) {
          login.show("更新成功");
          setTimeout(() => { wx.navigateBack(); }, 1000);
        }
      }
    })
  },
  onShow: function () {
    
  },

})