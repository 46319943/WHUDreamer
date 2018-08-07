let handler = require("handler.js");
let ajax = require("ajax.js");

let app;
let globalData;
function init(_app) {
    app = _app;
    globalData = app.globalData;
}
/**
 * 后端登录
 * 实际上就是提交code到后端，并从相应头中获取到cookie中的PHPSESSID，存入变量中，以后每次请求都带上它
 * 获取cookie后，将调用getAccount方法获取账户信息
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

                            getAccount();

                        }
                    }
                })
            } else {
                console.log('获取code失败' + res.errMsg);
            }
        }
    })

}
/**
 * 获取账户信息
 */
function getAccount() {
    ajax({
        method: 'GET',
        url: 'user/info/get',
        success: (res) => {
            if (res.data.errcode === 0) {
                let result = res.data;
                delete result.errcode;
                delete result.errMsg;
                globalData.account = result;
            }
        }
    });
}
/**
 * 快捷设置account相关信息到当前page
 * @param {*} that 
 */
function setAccount(that,accountObj) {
    if(!that){
        throw new DOMException('未传入this','this异常');
    }
    let flag = true;
    let account = {};
    if (globalData.account) {
        account = globalData.account
        that.setData({
            account,
            name: account.name,
            position: account.department + ' - ' + account.duties,
        });
    }
    else flag = false;
    if (globalData.userInfo && globalData.userInfo.avatarUrl) {
        that.setData({
            avatar: globalData.userInfo.avatarUrl,
        });
        account.avatar = globalData.userInfo.avatarUrl;
    }
    else flag = false;
    // 如果绑定了并且可以使用头像的话，就顺便返回account，减少判断
    return flag?account:false;
}
module.exports = {
    login,
    init,
    getAccount,
    setAccount,
}