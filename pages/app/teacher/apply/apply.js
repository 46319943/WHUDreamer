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
    /**是否为管理员 */
    department: undefined,
  },
  submit: function(e){
    login.formIdUpload(e);

    let res = e.detail.value;
    // 解构赋值
    // let {name,phone,content,materials} = res;
    if(this.data.collegeForForm == undefined || this.data.type === undefined){
      login.show("有未填写字段！");
      return;
    }

    for (const key in res) {
      if (res.hasOwnProperty(key)) {
        const value = res[key];
        if(value.trim() === ""){
          login.show("有未填写字段！");
          return;
        }
      }
    }
    res.college = this.data.collegeForForm;
    res.type = this.data.type;

    ajax({
      url:'redlecturer/apply',
      data:res,
      success: res=>{
        if(res.data.errcode === 0){
          login.show("申请成功");
        }
        else{
          login.show("失败" + res.data.errmsg);
        }
      }
    })

  },
  onLoad: function (options) {
    // 判断用户是否为管理员
    ajax({
      url: 'redlecturer/isadmin',
      method: 'get',
      success: res => {
        if (res.data.errcode === 0) {
          let data = res.data;
          let department = data.department;
          // department = department === 0 ? false : true;
          this.setData({ department });
          globalData.collegeList  = data.collegelist;
        }
      }
    });




    ajax({
      url: 'map/get/type/college',
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
            college: textArr,
            keyValueOfCollege: arr,
          });

        }
      }
    })






  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  radioChange: function (e) {
    let value = e.detail.value;
    value = parseInt(value);
    this.data.type = value;
  },

  // 选择区域的时候触发
  collegePickerChange: function (e) {
    this.setData({
      indexOfCollege: e.detail.value,
    });

    // 获取选择区域的索引
    let indexOfCollege = e.detail.value;
    // 根据索引获取选择项的名称
    let collegeName = this.data.college[indexOfCollege];
    // 通过选择项的名称，在映射表中查找value，从而将collegeName转换为college
    let college = util.getValueInObjectArray(this.data.keyValueOfCollege, collegeName);

    this.data.collegeForForm = college;

  },
})