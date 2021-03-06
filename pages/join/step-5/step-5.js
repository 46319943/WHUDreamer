let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    count: 0,
    limit: 500,
    hobby: ['学习'],
    hobbyValue: null,
    option: ['学习', '社交', '电影', '王者荣耀', '看剧', '绝地求生', '睡觉', '谈朋友']
  },
  onLoad: function (options) {



  },

  formSubmit: function (e) {
    console.log(e);

    login.formIdUpload(e);

    let hobby = this.data.hobby.join(',');
    let text = e.detail.value.text;
    // let hobby = e.detail.value.hobby;

    if (text === '') {
      login.show('请填写自我评价');
      return;
    }

    login.show('正在提交数据');
    this.setData({
      submitting: true,
    })

    ajax({
      url: 'whusu/self/info/add',
      data: {
        interest: hobby,
        selfEvaluation: text,
      },
      success: res => {

        this.setData({
          submitting: false,
        })

        if (res.data && res.data.errcode === 0) {
          login.show('报名成功！2秒后返回');
          setTimeout(res => {
            wx.navigateBack();
          }, 2000);
        }
        else {
          login.show('提交发生错误！');
        }
      }
    })



  },
  inputBlur: function (e) {
    if(e.detail.value === ''){
      return;
    }
    // 将爱好添加到列表中
    let hobby = this.data.hobby;
    hobby.push(e.detail.value);
    this.setData({
      hobby: hobby
    });
    // 清空输入框中的内容
    this.setData({hobbyValue:''});
  },

  textInput: function (e) {
    this.setData({
      count: e.detail.value.length
    });
  },
  optionTap: function (e) {
    let hobby = this.data.hobby;
    let option = e.target.dataset.name;
    if (hobby.indexOf(option) === -1) {
      hobby.push(option);
      this.setData({
        hobby: hobby
      });
    }
    console.log(this);
    console.log(e);
  },


  hobbyTap: function (e) {
    let hobby = this.data.hobby;
    let option = e.target.dataset.name;
    hobby.splice(hobby.indexOf(option), 1);
    this.setData({
      hobby: hobby
    });
    console.log(this);
    console.log(e);
  },

})