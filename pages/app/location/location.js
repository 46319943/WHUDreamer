let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({
  data: {

  },
  onLoad: function (o) {
    // 获取关于部门的映射表
    // 对象数组
    let arrObj;
    ajax({
      url: 'map/get/type/department',
      method: 'GET',
      success: res => {
        if (res.data && res.data.data) {
          arrObj = res.data.data;
          this.data.arrObj = arrObj;
          this.onShow();
        }
      }
    });
  },
  onShow: function (options) {

    // 获取面试地点的列表
    ajax({
      url: 'interview/admin/department/get',
      method: 'GET',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          let list = res.data.list;
          for (const obj of list) {
            let startDate = new Date(obj.startTime * 1000);
            let endDate = new Date(obj.endTime * 1000);
            obj.start = util.formatTime(startDate);
            obj.end = util.formatTime(endDate);

            obj.startDateStr = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
            obj.startTimeStr = `${util.formatNumber(startDate.getHours())}:${util.formatNumber(startDate.getMinutes())}`;

            obj.endDateStr = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
            obj.endTimeStr = `${util.formatNumber(endDate.getHours())}:${util.formatNumber(endDate.getMinutes())}`;

            obj.start = obj.startDateStr + ' ' + obj.startTimeStr;
            obj.end = obj.endDateStr + ' ' + obj.endTimeStr;

            obj.longitude = parseFloat(obj.longitude);
            obj.latitude = parseFloat(obj.latitude);

            if(!this.data.arrObj){
              this.onLoad();
              return;
            }

            obj.departmentName = util.getKeyInObjectArr(this.data.arrObj, obj.department);
          }
          this.setData({ list });
          globalData.location = {};
          globalData.location.list = list;
        }

      }
    })
  },

  detail: function (e) {
    let id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: 'detail/detail?id=' + id })
  },
  map: function (e) {
    // let id = e.currentTarget.dataset.id;
    // if (!id) return;
    // let list = this.data.list;
    // for (const obj of list) {
    //   if (obj.id == id) {

    //     obj.map = obj.map ? false : true;
    //     this.setData({list});
    //     break;
    //   }
    // }

    let longitude = e.currentTarget.dataset.longitude;
    let latitude = e.currentTarget.dataset.latitude;
    let name = e.currentTarget.dataset.name;
    let locationDetail = e.currentTarget.dataset.locationDetail;
    wx.openLocation({
      longitude,
      latitude,
      name,
      address: locationDetail,
    })
  },

  add: function (e) {
    wx.navigateTo({ url: 'detail/detail' });
  },

})