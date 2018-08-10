let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasResult: false,
  },
  formSubmit: function (e) {
    console.log(e);
    let res = e.detail.value;
    let id = res.id;
    let name = res.name;

    let formId = res.formId;

    ajax({
      url: 'user/home/newget',
      data: {
        "studentnum": id,
        "name": name,
        formId,
      },
      success:(res)=>{
        if(res.data.errcode === 0){
          // 如果不是新的信息
          if(!res.data.new){
            wx.showToast({
              title: '每10分钟才能查询一次哟',
              icon: 'none',
              duration: 2000
            });
            return;
          }
          // 存取result
          let result = res.data.result;

          // 不用这个，后端已经检测了
          // if(!result.hasResult){
          //   wx.showToast({
          //     title: '信息错误，认真检查一下吧？',
          //     icon: 'none',
          //     duration: 2000
          //   });
          //   return;
          // }

          result.hasResult = true;
          this.setData(result);
        }
        else{
          wx.showToast({
            title: '信息错误，认真检查一下吧？',
            icon: 'none',
            duration: 2000
          });
          this.setData({hasResult:false});
        }
      }
    });
  },
})