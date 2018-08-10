let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstRow: ['', '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    firstRowUp: ['', '星期', '星期', '星期', '星期', '星期', '星期', '星期'],
    firstRowDown: ['', '日', '一', '二', '三', '四', '五', '六'],
    firstColoum: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
    cellColor: null,
    setNavigationBarColor:null
  },
  touchStart: function (e) {
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cellColor = [];
    // 13行
    for (let i = 0; i < 14; i++) {
      cellColor[i] = [];
      // 7列
      for (let j = 0; j < 8; j++) {
        cellColor[i][j] = 'rgba(255,255,255,0.5)';
      }
    }
    this.setData(
      {
        cellColor: cellColor,
      }
    );
  },
  // 在单元格上面点击时，改变颜色
  cellMove: function(e){
    if(e.target.id){
      let id = e.target.id;
      let ids = id.split('-');
      let row = ids[0];
      let coloum = ids[1];
      let cellColor = this.data.cellColor;
      let R = Math.floor(Math.random()*256);
      let G = Math.floor(Math.random()*256);
      let B = Math.floor(Math.random()*256);
      cellColor[row][coloum] = `rgb(${R},${G},${B})`;
      let RS = R.toString(16);
      if(RS.length !== 2){
        RS = '0'+RS;
      }
      let GS = G.toString(16);
      if(GS.length !== 2){
        GS = '0'+GS;
      }
      let BS = B.toString(16);
      if(BS.length !== 2){
        BS = '0'+BS;
      }
      this.setData(
        {
          cellColor: cellColor,
          setNavigationBarColor:`rgb(${R},${G},${B})`
        },
        // 由于将数据发送到渲染层是一个异步事件且较慢，导致导航栏颜色先变化
        // 所以在回调函数中改变导航栏的颜色
        () => wx.setNavigationBarColor({
          backgroundColor:`#${RS}${GS}${BS}`,
          frontColor:'#000000'
        })
      );
      // 设置全局的颜色
      let navigationColor = `#${RS}${GS}${BS}`;
      globalData.navigationColor = navigationColor;
    }
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

  }
})