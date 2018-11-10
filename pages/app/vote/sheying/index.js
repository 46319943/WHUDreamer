// pages/app/vote/sheying/index.js
let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
var ans = {};
Page({

  data: {
    groups: [],
    teams: [],
    widths: [],
    btnstyle: [],
    submit: true,
    visible: true,
    showguide: '加载中，请稍候...',
    load: 3
  },

  onLoad: function (options) {
    var that = this;
    var groups = {};
    var teams = {};
    var btnstyle = {};
    ajax({
      url: 'sheying/get/grouplist',
      success: res => {
        if (res.data.errcode === 0) {
          for(let j in res.data.list){
            groups[res.data.list[j].gid+'g'] = res.data.list[j];
            console.log('遍历groups');
            ans[res.data.list[j].gid+'g']=new Array();
          }
          for(let i in res.data.list){
            ajax({
              url: 'sheying/get/groupvotelist',
              data: {gid: res.data.list[i].gid},
              success: listres => {
                if (listres.data.errcode === 0) {
                  teams[listres.data.data[0].gid+'g'] = listres.data.data;
                  for(let k in listres.data.data){
                    btnstyle[res.data.list[i].gid+'g'+listres.data.data[k].id] = 'btn';
                  }
                  that.setData({groups, teams, btnstyle});
                  for(let x in btnstyle) console.log(x);
                } else{login.show(res.data.errmsg);}
              },
            })
          }
          
          console.log("显示投票队伍列表");
          console.log(groups);
          console.log(teams);
          
          
        } else{login.show(res.data.errmsg);}
      },
    })
    wx.getSystemInfo({
      success: function(res){
        console.log("系统信息");
        console.log(res);
        that.setData({height: res.screenHeight});
      }
    })
  },
  loadimg: function(e){
    var widths = this.data.widths;
    widths[e.currentTarget.dataset.id+''] = 300 * e.detail.width / e.detail.height;
    this.setData({widths})
  },
  vote: function(e){
    var that = this;
    var gid = e.currentTarget.dataset.gid;
    var id = e.currentTarget.dataset.id;
    var btnstyle = that.data.btnstyle;
    for(let j in ans[gid+'g']){
      if(parseInt(ans[gid+'g'][j]) == parseInt(id)){
        console.log('重复');
        ans[gid+'g'].splice(j, 1);
        btnstyle[gid+'g'+id+''] = 'btn';
        that.setData({btnstyle});
        return;
      }
    }
    if(ans[gid+'g'] && ans[gid+'g'].length == parseInt(that.data.groups[gid+'g'].need)){
      console.log('超过最大');
      login.show('该组已经投足够的票了');
      return;
        btnstyle[gid+'g'+ans[gid+'g'].shift()+''] = 'btn';
        ans[gid+'g'].push(id);
        btnstyle[gid+'g'+id] = 'btn2';
    } else{
      ans[gid+'g'].push(id);
      btnstyle[gid+'g'+id] = 'btn2';
    }
    that.setData({btnstyle});
    that.setData({submit: false});
    for(let i in that.data.groups){
      if(parseInt(ans[i+''].length) != parseInt(that.data.groups[i].need)) that.setData({submit: true})
    }
  },
  sub: function(e){
    var that = this;
    var temp = "{";
    for(let i in that.data.groups){
      if(parseInt(ans[i+''].length) != parseInt(that.data.groups[i].need)) return
    }
    for(let j in ans){
      temp=temp+"'"+j+"':'"+ans[j]+"',";
    }
    temp = temp.slice(0, temp.length-1);
    temp = temp+"}"
    console.log(temp);
    ajax({
      url: 'sheying/add/result',
      data: {ans: temp},
      success: listres => {
        if (listres.data.errcode === 0) {
          login.show('投票成功，感谢您的参与');
          setTimeout(function(){wx.navigateBack()}, 1000);
        } else if (listres.data.errcode === 20002) {
          login.show('找不到您的信息，请确定您已经绑定梦想珈');
        } else if (listres.data.errcode === 50041) {
          login.show('您的数据异常，暂时无法投票');
        } else if (listres.data.errcode === 50042) {
          login.show('您的数据异常，暂时无法投票');
        } else if (listres.data.errcode === 50043) {
          login.show('您已经投过票了哦');
          setTimeout(function(){wx.navigateBack()}, 1000);
        } else{login.show(listres.data.errmsg);}
      },
    })
  },
  show: function(e){
    this.setData({
      showguide: '加载中，请稍候...'
    })
    var url = e.currentTarget.dataset.url;
    this.setData({
      url,
      visible: false
    })
  },
  cancel: function(){
    this.setData({
      visible: true
    })
  },
  loadover: function(){
    this.setData({
      showguide: ''
    })
  },
  onShareAppMessage: function(e){
    var that = this;
    
    console.log(that.data.groups);
    console.log(that.data.teams);
    var gid = e.target.dataset.gid;
    var id = e.target.dataset.id;
    var title = '';
    console.log(gid);
    for(let i in that.data.teams[gid+'g']){
      if(that.data.teams[gid+'g'][i].id == id) title = that.data.teams[gid+'g'][i].title;
    }
    return {
      title: "【金秋摄影】快来帮“"+that.data.groups[gid+'g'].name+"-"+title+"”投票",
      imageUrl:  `https://whusu.oss-cn-shanghai.aliyuncs.com/media/img/2018%E9%87%91%E7%A7%8B%E6%91%84%E5%BD%B1%E6%8A%95%E7%A5%A8%E8%BD%AC%E5%8F%91%E5%9B%BE.jpeg` ,
      path: `pages/app/app?type=2`, //点击分享的图片进到哪一个页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        login.show('转发成功！');
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  onPageScroll: function (res) {
    var that = this;
    var teams = that.data.teams;
    console.log(res.scrollTop);
    for(let i in that.data.groups){
      console.log(i);
      for(let j in that.data.teams[i]){
        console.log(j);
        wx.createSelectorQuery().select('.item-'+i+'-'+j).boundingClientRect((ret)=>{
          console.log("load的值");
          console.log(ret);
          if((parseInt(ret.top)<that.data.height)) teams[i][j].visible = true;
          if((parseInt(ret.bottom)>res.scrollTop)) teams[i][j].visible = false;
          that.setData({teams});
        }).exec()
      }
    }
  }
})