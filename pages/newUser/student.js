let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  data: {
    phone:null,
    // verify: handler.common + 'verify/get/',
    phoneForCode:null,
  },

  formSubmit: function (e) {
    console.log(e);
    // 获取formId用于发送模版信息
    let formId = e.detail.formId;

    let res = e.detail.value;

    let id = res.id;
    let pass = res.pass;
    let email = res.email;
    let phone = res.phone;
    let code = res.verify;
    // 如果是自动获取的话，就获取data中的code
    if(this.data.phone && this.data.code){
      phone = this.data.phone;
      code = this.data.code;
    }
    // 发送请求
    ajax({
      url: 'user/info/add/bkjw',
      data: {
        phone,
        code,
        email,
        student_num: id,
        password: pass,
        encryptedData: globalData.userInfo.encryptedData,
        iv: globalData.userInfo.iv,

        formId,
      },
      success: res => {

        if(res.data && res.data.errcode === 0){
          login.show('绑定成功');
          // 绑定成功之后，重新获取用户信息。这一步是刷新权限
          ajax({
            url:'auth/refresh',
            method:'GET',
            success: res => {

              // 刷新完权限之后，重新获取用户信息
              login.getAccount(()=>{
                // 获取成功之后就跳转到个人中心页面
                login.show('获取用户信息成功');
                wx.switchTab({
                  url:'../user/user',
                })
              });

            }
          });

        }
      }
    })
  },
  // 用户点击自动获取手机号
  getPhone: function (e) {

    // 如果获取成功
    if (e.detail.iv) {
      let result = e.detail;
      ajax({
        // 发起请求从后端获取手机号
        url:'user/exchangephone',
        data:{
          encryptedData:result.encryptedData,
          iv:result.iv,
        },
        success:res=>{

          // 获取成功就设置手机号以及code验证码
          if(res.data && res.data.errcode === 0){
            let result = res.data;
            let phone = result.phone;
            let code = result.code;
            this.setData({
              phone,
              code,
            })
          }
        },
      })

    }
    else {
      // 获取失败
      login.show('自动获取失败');
    }
  },

  // verify: function(e){
  //   this.setData({
  //     verify:this.data.verify,
  //   })
  // },

  // 发送短信获取验证码
  getCode: function(e){
    // 如果填写了手机号码
    if(this.data.phoneForCode){
      // let _phone = this.data.phoneForCode;
      // let phone = parseInt(_phone);
      let phone = this.data.phoneForCode;
      if(phone.length !== 11){
        login.show('手机号位数错误');
        return;
      }
      // 发送请求发送验证码
      ajax({
        url:'sms/sendcode',
        method:'POST',
        data:{
          phone,
        },
        success: res => {

          console.log(res);
          if(res.data && res.data.errcode===0){
            login.show('发送成功');
          }
          else{
            login.show('发送失败，一分钟只能发送一条短信');
          }

        }
      });
    }
  },

  // 当号码输入框输入的时候，改变对应的变量
  inputPhone: function(e){
    this.setData({
      phoneForCode: e.detail.value,
    });
  },

  
})