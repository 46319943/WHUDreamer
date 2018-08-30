let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({
  data: {
    instituteArr: null,
    indexOfInstitute: null,
    avatar: 'https://files.whusu.org/media/img/icon.png',
    name: null,
    college: null,
  },
  onShow: function(e) {
    login.setAccount(this);
  },

  onLoad: function (options) {
    let arrObj;
    let arr;
    ajax({
      url: 'map/get/type/college',
      method: 'GET',
      success: res => {
        
        if (res.data && res.data.data) {
          arrObj = res.data.data;
          this.data.arrObj = arrObj;
          // 通过对象数组获得所有的名称
          arr = util.getAllKeyInObjectArray(arrObj);
          this.data.arr = arr;
          // 设置院系的名称数组
          this.setData({ instituteArr: arr });
        }
      }
    });
    let list;
    let count;
    let countMax;
    ajax({
      // 如果设置了sectionValue就把它添加上
      url: 'signup/college/get/',
      method: 'GET',
      success: res => {
        if (res.data && res.data.list) {
          list = res.data.list;
          count = res.data.exempt_count;
          countMax = res.data.max;
          this.setData({ list, count, countMax });
          this.setData({ college: res.data.college });
        }
        else {
          this.setData({ list: null });
        }
      }
    });


  },


  institutePickerChange: function (e) {
    this.setData({ indexOfInstitute: e.detail.value });
    // 注意获得到的index是字符串类型
    let index = e.detail.value;
    let instituteValue;



    instituteValue = util.getValueInObjectArray(this.data.arrObj, this.data.arr[index]);
    this.data.instituteValue = instituteValue;

    let list;
    let count;
    let countMax;
    ajax({
      url: 'signup/college/get/' + instituteValue,
      method: 'GET',
      success: res => {
        if (res.data && res.data.list) {
          list = res.data.list;
          count = res.data.exempt_count;
          countMax = res.data.max;
          this.setData({ list, count, countMax });
        }
        else {
          this.setData({ list: null });
        }
      }
    });
  },
  approve: function (e) {
    console.log(e);
    // 获取学生对应的ID
    let id = e.detail.target.dataset.id;
    let name = e.detail.target.dataset.name;
    if (!id) {
      login.show('内部错误');
      return;
    }

    // 显示选择弹窗
    wx.showModal({
      title: '设置直推',
      content: `确定要直推 ${name} 吗？直推后无法取消`,
      success: res => {
        console.log(res);
        // 如果没有点击确认，就直接返回
        if (res.confirm != 1) {
          return;
        }
        ajax({
          url: 'signup/college/exempt/set',
          data: { id },
          success: res => {
            
            if (res.data && res.data.errcode === 0) {
              let list;
              let count;
              let countMax;
              ajax({
                url: 'signup/college/get/',
                method: 'GET',
                success: res => {
                  if (res.data && res.data.list) {
                    list = res.data.list;
                    count = res.data.exempt_count;
                    countMax = res.data.max;
                    this.setData({ list, count, countMax });
                    this.setData({ college: res.data.college });
                  }
                  else {
                    this.setData({ list: null });
                  }
                }
              });
              login.show('直推成功');
              this.setData({ count: (this.data.count + 1) });
            }
          }
        })
      }
    })

  },
  onShareAppMessage: function () {

  }
})
