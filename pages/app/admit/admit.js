let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    /**当前用户所在的部门 */
    department: '',
    /**是否连续扫描 */
    consistant: true,
    /**学号/扫描出来的二维码 */
    code: '',
    /**用户是否存在 */
    exist: false,
  },


  onLoad: function (options) {
    // 获取当前用户的部门信息
    ajax({
      url:'user/info/get',
      method:'GET',
      success: res=> {
        if(res.data.errcode === 0){
          let data = res.data;
          let department = data.department;
          this.setData({department});
        }
      }
    })
  },


  onShow: function () {

  },
  navi: function (e) {
    wx.redirectTo({
      url: '/pages/app/location/location'
    })


  },
  
  scanCode: function (e) {
    wx.scanCode({
      success: res => {
        console.log(res);
        let code = res.result;
        this.setData({ code });
        this.data.code = code;
        this.updateInformation();
      }
    })
  },
  success: function (e) {
    var that = this;
    ajax({
      url: 'interview/enroll/second/pass',
      data: {
        studentNum: this.data.code,
      },
      success: res => {
        if (res.data.errcode === 50004) {
          login.show('无法录取');
        }
        if(res.data.errcode === 50013){
          login.show('已经存在录取数据，非第一志愿无法替换当前录取态');
        }
        if(res.data.errcode === 50012){
          login.show('已被第一志愿录取，无法被其他志愿录取');
        }
        if(res.data.errcode === 50014){
          login.show('一面未通过，无法录取二面');
        }
        if (res.data.errcode === 0) {
          this.setData({
            code: '',
          });
          login.show('录取成功！');
          console.log("是否一秒钟进入扫码" + that.data.consistant);
          // 一秒之后进入扫码界面
          if (that.data.consistant) {
            setTimeout(() => { that.scanCode() }, 1000);
          }
        }
      }
    })
  },
  fail: function (e) {
    login.show('操作成功！');
    this.setData({
      code: '',
    });
    if (this.data.consistant) {
      setTimeout(() => { this.scanCode() }, 1000);
    }
  },
  clear: function(e) {
    let code = e.detail.value;
    if (code.length === 13) {
      this.setData({
        code: '',
      });
    }
  },
  codeChange: function (e) {
    let code = e.detail.value;
    this.data.code = code;
    if (code.length === 13) {
      this.updateInformation();
    }
  },
  checkBox: function (e) {
    this.setData({ consistant: !this.data.consistant });
  },
  updateInformation,

})

/** 更新用户信息 */
function updateInformation() {
  let code = this.data.code;
  ajax({
    url: 'interview/user/info/get',
    data: {
      studentNum: code
    },
    success: res => {
      if (res.data.errcode === 0) {
        let data = res.data;
        delete data.errcode;
        delete data.errmsg;
        this.setData(data);
        this.setData({exist:true});
      }
      else if (res.data.errcode === 50001) {
        login.show('用户不存在');
        this.setData({exist:false});
      }
    },
  })
}