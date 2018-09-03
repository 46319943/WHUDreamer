let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexOfSection: null,
    typeRange: ['一面', '二面', '补面'],
    type: -1
  },

  onLoad: function (options) { 
    // 1.首先获取部门映射

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
          this.data.arr = arr;
          // 设置部门的名称数组
          this.setData({ sectionArr: arr });
        }
      }
    });


    // 2.如果传入了id说明是编辑信息
    let id = options.id;
    if (id) {
      this.setData({ editting: true });
      this.setData({ id });
      let list = globalData.location.list;
      let item;
      for (const obj of list) {
        if (obj.id == id) {
          item = obj;
          this.setData({
            item,
            startDate: item.startDateStr,
            startTime: item.startTimeStr,
            endDate: item.endDateStr,
            endTime: item.endTimeStr,
            longitude: item.longitude,
            latitude: item.latitude,
            locationDetail: item.locationDetail,
            type: item.type
          });
          break;
        }
      }
    }
    // 没有传入就是新增
    else {
      this.setData({ editting: true });
    }

  },

  

  edit: function () {
    this.setData({ editting: true });
  },
  finish: function () {
    this.setData({ editting: true });
  },
  delete: function () {
    var that = this;
    wx.showModal({
      
      content: '确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          ajax({
            url: 'interview/admin/department/del',
            data: { id: that.data.id },
            success: res => {
              if (res.data && res.data.errcode === 0) {
                login.show('删除成功');
                wx.navigateBack();
              }
            }
          })
        } else if (res.cancel) {
          
        }
      }
    })
    
  },

  upload: function (e) {
    console.log(e);
    let id = this.data.id;
    let res = e.detail.value;

    let addInfo = res.addInfo;
    let addName = res.addName;
    let interviewRoom = res.interviewRoom;
    let waitRoom = res.waitRoom;
    

    let longitude = this.data.longitude;
    let latitude = this.data.latitude;
    let locationDetail = this.data.locationDetail;

    let startDate = this.data.startDate;
    let startTime = this.data.startTime;
    let endDate = this.data.startDate;
    let endTime = this.data.endTime;
    let type = this.data.type;
    
    if (!addInfo || !addName || !interviewRoom || !waitRoom || type < 0) {
      console.log(addInfo + "-" + addName + "-" + interviewRoom + "-" + waitRoom + "-" + type)
      login.show('有未填写数据！');
      return;
    }
    if (!startDate || !startTime || !endDate || !endTime) {
      login.show('有未填写的日期');
      return;
    }
    if (!longitude) {
      login.show('未选择位置');
      return;
    }

    

    let start = this.parse(startDate, startTime);
    let end = this.parse(endDate, endTime);
    console.log(startDate + ",,," + start);
    if(end <= start){
      login.show('时间设置错误！');
      return;
    }
    // console.log('看这里~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // console.log(new Date(startDate + ' ' + startTime).toString());
    // console.log(new Date(startDate + ' ' + startTime).getTime().toString());
    // console.log((new Date(startDate + ' ' + startTime).getTime() / 1000).toString());
    // console.log((new Date(startDate + ' ' + startTime).getTime() / 1000).toFixed(0).toString());

    // let start = (new Date(startDate + ' ' + startTime).getTime() / 1000).toFixed(0);
    // let end = (new Date(endDate + ' ' + endTime).getTime() / 1000).toFixed(0);
    console.log(start);
    ajax({
      url: `interview/admin/department/${id ? 'update' : 'add'}`,
      data: {
        startTime: start,
        endTime: end,
        addName,
        addInfo,
        waitRoom,
        interviewRoom,
        latitude,
        longitude,
        locationDetail,
        type,
        id: id ? id : '',
      },
      success: res => {
        if (res.data && res.data.errcode === 0) {
          login.show('提交成功！');
          setTimeout(() => { wx.navigateBack() }, 2000);
        }
      }
    })

  },


  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindStartTypeChange: function (e) {
    
    this.setData({
      type: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },


  sectionPickerChange: function (e) {
    this.setData({ indexOfSection: e.detail.value });
    // 注意获得到的index是字符串类型
    let index = e.detail.value;
    // 要查询的部门对应的值
    let sectionValue = util.getValueInObjectArray(this.data.arrObj, this.data.arr[index]);
    // 设置页域数据
    this.data.sectionValue = sectionValue;
  },

  chooseLoc: function (e) {
    wx.chooseLocation({
      success: res => {
        this.data.longitude = res.longitude;
        this.data.latitude = res.latitude;
        this.data.locationDetail = res.name + ' - ' + res.address;
        this.data.name = res.name;
        this.setData({ locationDetail: this.data.locationDetail });
        login.show('设置位置成功！');
      }
    })
  },
  currentLoc: function (e) {
    if (this.data.longitude) {
      wx.openLocation({
        longitude: this.data.longitude,
        latitude: this.data.latitude,
        name: this.data.name,
        address: this.data.locationDetail,
      })

    }
    else {
      login.show('位置还未选择');
    }
  },
  parse: function(_date, time) {
    let arr;
    let date = new Date("1999-09-09");
    arr = _date.split('-');
    date.setDate(parseInt(arr[2]));
    date.setFullYear(parseInt(arr[0]));
    date.setMonth(parseInt(arr[1], 10)-1);
    
    console.log("999999999999");
    console.log(parseInt(arr[1], 10));
    arr = time.split(':');
    date.setHours(parseInt(arr[0]));
    date.setMinutes(parseInt(arr[1]));
    
    

    return(date.getTime() / 1000).toFixed(0);
    }
})