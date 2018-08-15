let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({
  data: {
    indexOfSection: null,
    indexOfSectionT: null,
    section: [
      '新闻宣传部'
    ],
    sectionT: [
      '新闻宣传部'
    ],
    obey: true,
    count: 0,
    limit: 200
  },

  onLoad: function (options) {

    ajax({
      url: 'map/get/type/department',
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
            section: textArr,
            sectionT: textArr,
            keyValueOfSection: arr,
          });

        }
      }
    })

  },


  formSubmit: function (e) {
    // 避免keyValueOfSection为undefined
    if (section == null) {
      login.show('请选择部门');
      return;
    }
    let res = e.detail.value;
    console.log(res);

    let text = res.text;

    let indexOfSection = res.section;
    let sectionName = this.data.section[indexOfSection];
    let section = util.getValueInObjectArray(this.data.keyValueOfSection, sectionName);


    let data = {
      firstDepartment: section,
      departmentUnder: text,
    }

    if (this.data.obey) {
      let indexOfSectionT = res.sectionT;
      let sectionTName = this.data.sectionT[indexOfSectionT];
      let sectionT = util.getValueInObjectArray(this.data.keyValueOfSection, sectionTName);
      data.secondDepartment = sectionT;
    }


    if (text === '') {
      login.show('请填写对部门的理解');
      return;
    }

    if (data.secondDepartment == null) {
      login.show('请选择调剂部门');
      return;
    }

    ajax({
      url: 'whusu/department/info/add',
      data,
      success: res => {
        if (res.data && res.data.errcode === 0) {
          wx.redirectTo({
            url: '../step-5/step-5',
          })

        }
      }
    })
  },

  sectionPickerChange: function (e) {
    this.setData({
      indexOfSection: e.detail.value
    });

    Array.prototype.remove = function (dx) {
      if (isNaN(dx) || dx > this.length) { return false; }
      for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
          this[n++] = this[i]
        }
      }
      this.length -= 1
    }
    let arr = this.data.section;
    arr = arr.concat();
    let sectionName = arr[e.detail.value];
    let index = arr.indexOf(sectionName);
    arr.remove(index);
    this.setData({
      sectionT:arr,
    })
  },
  sectionTPickerChange: function (e) {
    this.setData({
      indexOfSectionT: e.detail.value
    });
  },
  switchChange: function (e) {
    this.setData({
      obey: Boolean(e.detail.value)
    })
  },
  textInput: function (e) {
    this.setData({
      count: e.detail.value.length
    });
  },




})