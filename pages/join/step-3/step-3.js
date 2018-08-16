let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({
  data: {
    indexOfArea: null,
    area: [
      '信息学部',
      '文理学部桂圆区域'
    ],
    indexOfBuilding: null,
    building: [
      '信息13舍',
      '信息14舍'
    ],
  },
  // 提交表单时
  formSubmit: function (e) {
    // 如果不先判断这个，keyValueOfBuilding（映射表）就为undefined。
    // 因为只有先选择区域之后，才会从服务器查表获取映射表
    if(this.data.areaForForm == null){
      login.show('请选择区域');
      return;
    }

    let res = e.detail.value;
    let room = res.room;

    // 获取选择区域的索引
    let indexOfBuilding = res.building;
    // 根据索引获取选择项的名称
    let buildingName = this.data.building[indexOfBuilding];
    // 通过选择项的名称，在映射表中查找value，从而将buildingName转换为building
    let building = util.getValueInObjectArray(this.data.keyValueOfBuilding, buildingName);

    
    if(building == null){
      login.show('请选择宿舍');
      return;
    }
    if(room === ''){
      login.show('请填写宿舍号');
      return;
    }
    else if(room.length !== 3){
      login.show('请填写有效宿舍号');
      return;
    }

    ajax({
      url:'whusu/dorm/info/add',
      data:{
        region:this.data.areaForForm,
        floor:building,
        room,
      },
      success: res => {
        if(res.data && res.data.errcode === 0){
          wx.redirectTo({
            url: '../step-4/step-4',
          })

        }
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax({
      url: 'map/get/type/dormarea',
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
            area: textArr,
            keyValueOfArea: arr,
          });

        }
      }
    })
  },

  // 选择区域的时候触发
  areaPickerChange: function (e) {
    this.setData({
      indexOfArea: e.detail.value,
    });

    // 获取选择区域的索引
    let indexOfArea = e.detail.value;
    // 根据索引获取选择项的名称
    let areaName = this.data.area[indexOfArea];
    // 通过选择项的名称，在映射表中查找value，从而将areaName转换为area
    let area = util.getValueInObjectArray(this.data.keyValueOfArea, areaName);

    this.data.areaForForm = area;


    ajax({
      url: 'map/get/type/floor' + area,
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
            building: textArr,
            keyValueOfBuilding: arr,
          });

        }
      }
    })

  },
  buildingPickerChange: function (e) {
    this.setData({
      indexOfBuilding: e.detail.value
    });
  },


})