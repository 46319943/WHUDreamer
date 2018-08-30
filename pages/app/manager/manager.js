let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;

const COUNT_PER_PAGE = 25;
Page({
  data: {
    // 部门的名称数组
    sectionArr: null,
    // 当前指向部门名称数组的索引，注意这个是字符串类型！
    indexOfSection: '0',
    // 当前选择项的数量
    count: null,
    // 当前选择项列表的页数
    page: null,
    // 总报名人数
    total: 0,
    //当前选择的部门
    section: null
  },


  onLoad: function (options) {
    // 获取所有的部门名称和对应的值
    wx.showNavigationBarLoading();
    // 对象数组
    let arrObj;
    // 名称数组
    var arr;
    ajax({
      url: 'map/get/type/department',
      method: 'GET',
      success: res => {
        wx.hideNavigationBarLoading()
        if (res.data && res.data.data) {
          arrObj = res.data.data;
          this.data.arrObj = arrObj;
          // 通过对象数组获得所有的名称
          arr = util.getAllKeyInObjectArray(arrObj);
          // 增加全选项目
          arr.unshift('全部');
          this.data.arr = arr;
          // 设置部门的名称数组
          this.setData({ sectionArr: arr });
        }
      }
    });
    ajax({
      // 如果设置了sectionValue就把它添加上
      url: 'signup/count/get',
      method: 'GET',
      success: res => {
        if (res.data && res.data.count) {
          this.setData({ total: res.data.count });
        }
      }
    });
    this.data.sectionValue = "";
    // 保存最终返回的数量
    let count;
    // 最大页数，count/每页数量
    let pageMax;
    ajax({
      // 如果设置了sectionValue就把它添加上
      url: 'signup/count/get/' + this.data.sectionValue,
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          count = res.data.count;
          pageMax = Math.ceil(count / COUNT_PER_PAGE);
          this.setData({ count, pageMax });
        }
      }
    });
    this.changePage(0);
  },

  


  sectionPickerChange: function (e) {
    this.setData({ indexOfSection: e.detail.value });
    // 注意获得到的index是字符串类型
    let index = e.detail.value;
    // 要查询的部门对应的值
    let sectionValue;

    // 如果选择的是全部的话
    if (index === '0') {
      // 什么也不干
    }
    // 选择了特定的部门
    else {
      sectionValue = util.getValueInObjectArray(this.data.arrObj, this.data.arr[index]);
    }
    // 如果sectionValue没有设置，就设置为空字符串
    sectionValue = sectionValue ? sectionValue : '';
    this.data.sectionValue = sectionValue;

    // 保存最终返回的数量
    let count;
    // 最大页数，count/每页数量
    let pageMax;
    ajax({
      // 如果设置了sectionValue就把它添加上
      url: 'signup/count/get/' + sectionValue,
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          count = res.data.count;
          pageMax = Math.ceil(count / COUNT_PER_PAGE);
          this.setData({ count , pageMax});
        }
      }
    });

    this.changePage(0);
  },
  next: function (e) {
    this.changePage(1);
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  previous: function (e) {
    this.changePage(-1);
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  changePage,
  onShareAppMessage: function () {

  },
  detail: function(e){
    let stuNum =  e.currentTarget.dataset.stuNum;
    wx.navigateTo({url:'detail/detail?stuNum=' + stuNum})
  }
})
/**
 * 
 * @param {number} operate -1前一页 0第一页 1后一页
 */
function changePage(operate) {
  // 获取当前页数
  let page = this.data.page;
  // 获取当前部门对应的值
  let sectionValue = this.data.sectionValue;
  // 根据参数更改page值
  if(operate === 0){
    page = 1;
  }
  else{
    page += operate;
  }
  // 保存返回的对象数组
  let list;
  ajax({
    url: `signup/list/get/${page}/${sectionValue}`,
    method: 'GET',
    success: res => {
      if (res.data && res.data.errcode === 0) {
        list = res.data.data;
        this.setData({ list, page });
      }
    }
  });
}