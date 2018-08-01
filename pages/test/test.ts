let mainPage: WeApp.Page;

Page({
    data: {
        message: 'hello world'
    },
    onLoad: function (): void {
        mainPage = this as WeApp.Page;
    },
    testFunction: function () {
        var that = this;
        wx.login({
          success: function (res) {
            if (res && res.code) {
              console.log('获取code成功，正在发送请求');
              console.log(res.code);
              //发起网络请求
              wx.request({
                url: 'https://think.whusu.org/user/login',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                  code: res.code
                },
                method: 'POST',
                success: function (res) {
                  console.log('登录请求解析成功！');
                  console.log(res);
    
                  // 从相应头中获取cookie
                  if(res && res.header && res.header['Set-Cookie']){
                    var cookie = res.header['Set-Cookie'];
                    console.log(cookie);
                    let start = cookie.indexOf('PHPSESSID=')+10;
                    let end = cookie.indexOf(';',start);
                    if(end === -1){
                      cookie = cookie.slice(cookie.indexOf('PHPSESSID=')+10);
                    }
                    else{
                      cookie = cookie.slice(cookie.indexOf('PHPSESSID=')+10,end);
                    }
                    console.log(cookie);
                    console.log('获取cookie成功！');
                  }
    
                  wx.request({
                    url:'https://think.whusu.org/wechat/user/getsessionvalue',
                    header: { 'Content-Type': 'application/x-www-form-urlencoded','cookie':'PHPSESSID='+cookie},
                    method: 'GET',
                    data: {
                      // code: res.code
                    },
                    success: function (res) {
                      console.log(res);
                      console.log('二次请求成功！')
                      
                    },
                    fail:function(res){
                      console.log(res);
                      console.log('二次请求失败~');
                    }
                  });
    
                },
                fail: function (res) {
                  console.log('登录请求解析失败~');
                  console.log(res);
                }
              })
            } else {
              console.log('获取code失败' + res.errMsg);
            }
          }
        });
      }
});