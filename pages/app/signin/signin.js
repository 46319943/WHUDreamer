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
    pickerdate: null,
    pickertime: null,
    title: null,
    hiddenmodalput: true,
    deletemodalput: true,
    nowdate: null,
    nowtime: null,
    deleteid: null,
    type: 0,
    actionSheetItems:[
      {bindtap:'dosignin',txt:'签到详情'},
      {bindtap:'beforedelete',txt:'删除'}
     ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowdate = util.formatData(new Date());
    let nowtime = util.formatTime(new Date());
    this.setData({
      nowdate,
      nowtime 
    })
    var that = this;
    ajax({
      url: 'signin/getsignlist',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          for(let i in res.data.data){
            let date = new Date(res.data.data[i].time * 1000);
            res.data.data[i].time = date.getFullYear()+'年'+(date.getMonth()+1)+'月'+ date.getDate()+'日'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            
          }
          that.setData({
            activity: res.data.data
          })
        }else if (res.data.errcode === 50001) {
          login.show('暂无签到活动');
        }
      }
    })
  },
  scanCode: function (e) {
    let signinid = e.currentTarget.dataset.id;
    this.setData({signinid});
    var that = this;
    wx.scanCode({
      success: res => {
        console.log(res);
        let uid = res.result;
        that.setData({ uid });
        that.data.uid = uid;
        that.dosignin();
        
      }
    })
  },
  plus: function(e){
    wx.navigateTo({url: 'detail/detail'})
    /** 
    this.setData({
      hiddenmodalput: false
    })
    */
  },
  cancel: function(){
    this.setData({
      hiddenmodalput: true,
      deletemodalput: true
    })
  },
  bindDateChange: function(e){
    this.setData({
      pickerdate: e.detail.value
    })
  },
  bindTimeChange: function(e){
    this.setData({
      pickertime: e.detail.value
    })
  },
  bindTextChange: function(e){
    this.setData({
      title: e.detail.value
    })
  },
  confirm: function(){
    var that = this;
    if(!this.data.pickerdate) {
      login.show('请选择一个日期');
      return;
    }else if(!this.data.pickertime){
      login.show('请选择一个时间');
      return;
    }else if(!this.data.title){
      login.show('请输入签到标题');
      return;
    }else{
      let date = this.data.pickerdate;
      let time = this.data.pickertime;
      let title = this.data.title;
      time = this.parse(date, time);
      ajax({
        url: `signin/addsignin`,
        data: {
          title,
          time
        },
        success: res => {
          if (res.data && res.data.errcode === 0) {
            login.show('提交成功！');
            that.onLoad();
            setTimeout(() => { that.cancel() }, 1000);
          }
        }
      })
    }
  },
  delete: function(e){
    let deleteid = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    this.setData({
      deletemodalput: false,
      deleteid,
      type
    })
  },
  beforedelete: function(e){
    var that = this;
    wx.showModal({  
      title: '提示',  
      content: '确定要删除吗',  
      success: function(res) {  
          if (res.confirm) {  
            that.dodelete()
          } else if (res.cancel) {  
          
          }  
      }  
  }) 
  },
  dodelete: function(e){
    var that = this;
    let deleteid = this.data.deleteid;
    
    ajax({
      url: `signin/deletesignin`,
      data: {
        deleteid
      },
      success: res => {
        if (res.data && res.data.errcode === 0) {
          login.show('删除成功！');
          that.onLoad();
          setTimeout(() => { that.cancel() }, 1000);
        }else {
          login.show('删除失败');
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
    this.cancel;
    var that = this;
    ajax({
      url: 'signin/getsignlist',
      success: res => {
        if (res.data && res.data.errcode === 0) {
          for(let i in res.data.data){
            let date = new Date(res.data.data[i].time * 1000);
            res.data.data[i].time = date.getFullYear()+'年'+(date.getMonth()+1)+'月'+ date.getDate()+'日'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            
          }
          that.setData({
            activity: res.data.data
          })
        }else if (res.data.errcode === 50001) {
          login.show('暂无签到活动');
        }
      }
    })
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
  dosignin: function() {
    let id = this.data.deleteid;
    let type = this.data.type;
    this.cancel();
    wx.navigateTo({url: 'dosignin/dosignin?id=' + id + '&type=' + type});
    /** 
    var that = this;
    let uid = this.data.uid;
    let signinid = this.data.signinid;
    ajax({
      url: 'signin/dosignin',
      data: {
        uid: uid,
        signinid: signinid
      },
      success: res => {
        if (res.data.errcode === 0) {
          if (res.data.latetime > 0) {
            var date = new Date(res.data.latetime * 1000);
            login.show('迟到' + date.getHours() + '小时' + date.getMinutes() + '分钟' + date.getSeconds() + '秒')
            setTimeout(that.scanCode(), 1000);
          } else {
            login.show('签到成功');
            setTimeout(that.scanCode(),1000);
          }
        } else if (res.data.errcode === 50024) {
          login.show('该用户已经签过到了');
        } else if (res.data.errcode === 20010) {
          login.show('签到失败' + res.data.errmsg);
        }

      },
    })*/
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
