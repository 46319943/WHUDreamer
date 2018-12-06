let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  data: {
    phone: null,
    // verify: handler.common + 'verify/get/',
    phoneForCode: null,
    // 是否能够获取短信验证码
    codeAble:true,
    arr: [],

  },
  onLoad: function(options){
    login.flush();
    // 刷新用户信息
    login.setAccount(this);
    this.setData({
      userInfo: globalData.userInfo
    })
    var arr = [];
    var that = this;
    ajax({
      url: 'map/get/type/college',
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          console.log(res);
          for(let i in res.data.data){
            arr.push(res.data.data[i].text);
          }
          that.setData({arr});
        }
      }
    })
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 设置全局用户信息
      app.globalData.userInfo = e.detail.userInfo
      // 设置全局加密信息
      app.globalData.userInfo.encryptedData = e.detail.encryptedData;
      app.globalData.userInfo.iv = e.detail.iv;

      // 点击允许之后跳转页面
      wx.navigateTo({
        url: '../newUser/student'
      });
    } else {
      // 用户拒绝微信授权
      login.show('必须授权才能进行用户绑定！');
    }

  },

  formSubmit: function (e) {
    var that = this;
    // 获取formId用于发送模版信息
    let formId = e.detail.formId;

    let res = e.detail.value;
    let name = res.name;
    let id = res.id;
    let pass = res.pass;
    let email = res.email;
    let phone = res.phone;
    let code = res.verify;
    let stutype = id.slice(4,5);
    console.log("学号类型");
    console.log(stutype);
    if (stutype === '3') {
      login.show("本科生请使用绑定功能");
      
      wx.redirectTo({
        url: '/pages/user/user'
    });
    }else {
      // 如果是自动获取的话，就获取data中的code
    if (this.data.phone && this.data.code) {
      phone = this.data.phone;
      code = this.data.code;
    }

    if (id.length !== 13) {
      login.show('请填入13位学号');
      return;
    }
    if(name.length === 0){
      login.show('请填写姓名');
      return;
    }
    if(email.length === 0){
      login.show('请填写邮箱');
      return;
    }
    if(phone.length === 0){
      login.show('请填写手机号');
      return;
    }
    if(code.length === 0){
      login.show('请填写验证码');
      return;
    }
    let regex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if(! (regex.test(email))){
      login.show('邮箱格式错误');
      return;
    }

    this.setData({
      submitting: true,
    })
    console.log("学院");
    console.log(that.data.arr[that.data.college]);
    // 发送请求
    ajax({
      url: 'user/info/temporary/add',
      data: {
        name,
        phone,
        code,
        college: that.data.arr[that.data.college],
        studentNum: id,
        encryptedData: globalData.userInfo.encryptedData,
        iv: globalData.userInfo.iv,
      },

      success: res => {
        this.setData({
          submitting: false,
        })

        if (res.data && res.data.errcode === 0) {
          login.show('填写成功');
          ajax({
            url: 'auth/refresh',
            method: 'GET',
            success: res => {

              // 刷新完权限之后，重新获取用户信息
              login.getAccount(() => {
                // 获取成功之后就跳转到个人中心页面
                login.show('获取用户信息成功');
                wx.switchTab({
                  url: '../app/app',
                })
              });

            }
          });
          wx.navigateBack();
        }
        else if(res.data && res.data.errcode === 20011){
          login.show(res.data.tip);
        }
        else if(res.data && res.data.errcode === 10003){
          login.show('验证码错误');
        }
        else if(res.data && res.data.errcode === undefined){
          login.show(res.data);
        }
      }
    })
    }
    
  },
  // 用户点击自动获取手机号
  getPhone: function (e) {
    // 如果获取成功
    if (e.detail.iv) {
      let result = e.detail;
      ajax({
        // 发起请求从后端获取手机号
        url: 'user/exchangephone',
        data: {
          encryptedData: result.encryptedData,
          iv: result.iv,
        },
        success: res => {
          // 获取成功就设置手机号以及code验证码
          if (res.data && res.data.errcode === 0) {
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
  getCode: function (e) {
    // 如果填写了手机号码
    if (this.data.phoneForCode) {
      // let _phone = this.data.phoneForCode;
      // let phone = parseInt(_phone);
      let phone = this.data.phoneForCode;
      if (phone.length !== 11) {
        login.show('手机号位数错误');
        return;
      }
      // 发送请求发送验证码
      ajax({
        url: 'sms/sendcode',
        method: 'POST',
        data: {
          phone,
        },
        success: res => {
          if (res.data && res.data.errcode === 0) {
            login.show('发送成功，一分钟之后才能再次发送');
            this.setData({codeAble:false});
            setTimeout(()=>{
              this.setData({codeAble:true});
            },1000*60);
          }
          else {
            login.show('发送失败，一分钟只能发送一条短信');
          }
        }
      });
    }
    else{
      login.show('请填写手机号');
    }
  },

  // 当号码输入框输入的时候，改变对应的变量
  inputPhone: function (e) {

    if (e.detail.value == null) {

    }
    this.setData({
      phoneForCode: e.detail.value,
    });
  },
  bindStartCollegeChange: function(e){
    var that = this;
    this.setData({
      college: e.detail.value
    })
  }


})