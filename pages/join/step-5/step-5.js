let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {
    count: 0,
    limit: 200,
    hobby: ['HTML', 'CSS', 'JS'],
    option: ['HTML', 'CSS', 'JS', 'JAVA', 'TS', '学习', '睡觉', '找女友？']
  },
  onLoad: function (options) {



  },

  formSubmit: function (e) {
    let hobby = this.data.hobby.join(',');
    let text = e.detail.value.text;


    if(text === ''){
      login.show('请填写自我评价');
      return;
    }

    ajax({
      url:'whusu/self/info/add',
      data:{
        interest:hobby,
        selfEvaluation:text,
      },
      success: res => {
        if(res.data && res.data.errcode === 0){
          login.show('报名成功！2秒后返回');
          setInterval(res=>{
            wx.navigateBack();
          },2000);
        }
      }
    })


    
  }
  ,
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
  /**
   * 生命周期函数--监听页面加载
   */

})