let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({
  data: {
    delBtnWidth: 160
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
          let i = 0;
          for (const obj of list) {
            
            let startDate = new Date(obj.startTime * 1000);
            let endDate = new Date(obj.endTime * 1000);
            obj.num = i;
            i++;
            obj.txtStyle = "";
            
            obj.start = util.formatTime(startDate);
            obj.end = util.formatTime(endDate);
            obj.data = util.formatData(endDate);
            obj.startDateStr = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
            obj.startTimeStr = `${util.formatNumber(startDate.getHours())}:${util.formatNumber(startDate.getMinutes())}`;

            obj.endDateStr = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
            obj.endTimeStr = `${util.formatNumber(endDate.getHours())}:${util.formatNumber(endDate.getMinutes())}`;

            obj.start =obj.startTimeStr;
            obj.end =obj.endTimeStr;

            obj.longitude = parseFloat(obj.longitude);
            obj.latitude = parseFloat(obj.latitude);

            if(!this.data.arrObj){
              this.onLoad();
              return;
            }

            obj.departmentName = util.getKeyInObjectArr(this.data.arrObj, obj.department);
          }
          console.log(list[0]);
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

  touchS: function (e) {
    console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      
      
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX,
        
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.list;
      for (let i in list) {
        list[i].txtStyle = "left: 0"
      }
      console.log(list);
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },
  touchE: function (e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.list;
      for (let i in list) {
        list[i].txtStyle = "left: 0"
      }
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        list: list
      });
    }
  },
  toast: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.list;
    console.log(list);
    let longitude = e.currentTarget.dataset.longitude;
    let latitude = e.currentTarget.dataset.latitude;
    let name = e.currentTarget.dataset.name;
    let id = e.currentTarget.dataset.id;
    let edit = list[index].edit;
    let locationDetail = e.currentTarget.dataset.locationDetail;
    if (edit) {
      wx.showActionSheet({
        itemList: ['查看地图', '修改', '启用'],
        itemColor: '#007aff',
        success(res) {
          console.log(res.tapIndex);
          if (res.tapIndex === 0) {
            wx.openLocation({
              longitude,
              latitude,
              name,
              address: locationDetail,
            })
          } else if (res.tapIndex === 1) {
            let id = e.currentTarget.dataset.id;
            if (!id) return;
            wx.navigateTo({ url: 'detail/detail?id=' + id })
          } else if (res.tapIndex === 2) {
            ajax({
              url: 'interview/admin/department/start',
              data: { id: id },
              success: res => {
                wx.showToast({
                  title: '启用成功',
                  icon: 'success',
                  duration: 2000
                })
                  
                  list[index].edit = false;
                  console.log(list);
                  that.setData({
                    list: list
                  });

                
              }
            })
          }
        }
      })
    } else {
      wx.showActionSheet({
        itemList: ['查看地图'],
        itemColor: '#007aff',
        success(res) {
          console.log(res.tapIndex);
          if (res.tapIndex === 0) {
            wx.openLocation({
              longitude,
              latitude,
              name,
              address: locationDetail,
            })
          }
        }
      })
    }
  },
  navi:  function(e)  {
    wx.redirectTo({
      url: '/pages/app/admit/admit'
    })
    
    
  }
})