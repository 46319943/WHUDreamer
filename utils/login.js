let handler = require("handler.js");
let ajax = require("ajax.js");

/**
 * 后端登录
 * 实际上就是提交code到后端，并从相应头中获取到cookie中的PHPSESSID，存入变量中，以后每次请求都带上它
 */
function login() {
    // 调用微信登录获取登录码
    wx.login({
        success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
                console.log('wx.login获取code成功，正在发送请求');
                console.log(res.code);
                //发起网络请求
                ajax({
                    url: 'user/login',
                    data: {
                        code: res.code
                    },
                    success: res => {
                        console.log('登录请求解析成功！');
                        console.log(res);
                        // 从相应头中获取cookie
                        if (res.header['Set-Cookie']) {
                            let cookie = res.header['Set-Cookie'];
                            console.log(cookie);
                            let start = cookie.indexOf('PHPSESSID=') + 10;
                            let end = cookie.indexOf(';', start);
                            if (end === -1) {
                                cookie = cookie.slice(cookie.indexOf('PHPSESSID=') + 10);
                            }
                            else {
                                cookie = cookie.slice(cookie.indexOf('PHPSESSID=') + 10, end);
                            }
                            console.log(cookie);
                            console.log('获取cookie成功！');
                            handler.cookie = cookie;
                        }
                    }
                })
            } else {
                console.log('获取code失败' + res.errMsg);
            }
        }
    })

}
function request(config){
    if(config.data){
        config.data.encryptedData = handler.encryptedData;
        config.data.iv = handler.iv;
    }
    ajax(config);

}
module.exports = {
    login: login,
    request: request
  }