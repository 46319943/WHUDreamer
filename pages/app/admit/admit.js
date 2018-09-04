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
    ajax({
      url: 'interview/enroll/first/pass',
      data: {
        studentNum: this.data.code,
      },
      success: res => {
        if (res.data.errcode === 0) {
          login.show('录取成功！' + this.data.consistant ? '1秒之后进入扫描界面' : '');
          // 一秒之后进入扫码界面
          if (this.data.consistant) {
            setTimeout(() => { this.scanCode }, 1000);
          }
        }
      }
    })
  },
  fail: function (e) {
    this.scanCode(e);
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