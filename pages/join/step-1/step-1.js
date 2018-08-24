let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;

Page({
  data: {
    verify: handler.common + 'verify/get/',
    indexOfPolicy: null,
    policy: null,
    indexOfInstitute: null,
    institute: [
      '资源与环境科学学院',
      '生命科学学院'
    ],
    indexOfProfession: null,
    profession: [
      '地理信息科学',
      '自然地理'
    ],
  },
  // 提交表单
  formSubmit: function (e) {
    login.formIdUpload(e);
    
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // app.globalData.formInformation = e.detail.value;
    // console.log(app.globalData);

    let res = e.detail.value;
    let qq = res.QQ;

    // 获取选择政治面貌的索引
    let indexOfPolicy = res.policy;
    // 根据索引获取选择项的名称
    let policyName = this.data.policy[indexOfPolicy];
    // 通过选择项的名称，在映射表中查找value，从而将policy转换为political
    let policy = util.getValueInObjectArray(this.data.keyValueOfPolicy, policyName);


    if(qq === ''){
      login.show('请填写QQ号');
      return;
    }
    else if(qq.lenth > 11){
      login.show('非法QQ号');
      return;
      
    }
    if(policy == null){
      login.show('请选择政治面貌');
      return;
    }


    ajax({
      url: 'whusu/base/info/add',
      method: 'POST',
      data: {
        qq,
        political: policy
      },
      success: res => {
        if (res.data && res.data.errcode === 0) {
          wx.redirectTo({
            url: '../step-3/step-3',
          });

        }
      }
    })

  },
  // 页面加载时，首先获取映射表，然后获取其他的基础信息
  onLoad: function (options) {
    ajax({
      url: 'map/get/type/political',
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          // 首先获取到包含映射对象的数组
          let arr = res.data.data;
          // 将所有的文本提出出来
          let textArr = new Array();
          for (let keyValue of arr) {
            textArr.push(keyValue['text']);
          }
          // 将文本数组设置到列表，同时将获取到的映射表添加到当前页面存储
          this.setData({
            policy: textArr,
            keyValueOfPolicy: arr,
          });

        }
      },
    })


    login.setAccount(this);
    // 获取基础信息
    ajax({
      url: 'whusu/base/info/get',
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          this.setData({
            account: res.data,
          })
        }
      }
    })
  },


  institutePickerChange: function (e) {
    this.setData({
      indexOfInstitute: e.detail.value,
      indexOfProfession: null,
    });
    // 特别注意value中对应的index返回的是String类型！
    switch (e.detail.value) {
      case '0':
        this.setData({
          profession: [
            '地理信息科学',
            '自然地理'
          ]
        });
        break;
      case '1':
        this.setData({
          profession: [
            '生物工程'
          ]
        });
        break;
    }
  },
  policyPickerChange: function (e) {
    console.log(e);
    this.setData({
      indexOfPolicy: e.detail.value
    })
  },
  professionPickerChange: function (e) {
    this.setData({
      indexOfProfession: e.detail.value
    })
  },
  changeVerify: function () {
    //设置verify即可改变图片
  },


})