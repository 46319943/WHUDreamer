let handler = require("handler.js");
let ajax;// = require("ajax.js");

let app;
let globalData;
/**
 * 
 * @param {WeApp.AppParam} _app 
 */
function init(_app) {
    app = _app;
    globalData = app.globalData;
    ajax = globalData.ajax;
}
/**
 * 后端登录
 * 实际上就是提交code到后端，并从相应头中获取到cookie中的PHPSESSID，存入变量中，以后每次请求都带上它
 * 获取cookie后，将调用getAccount方法获取账户信息
 * @param {Function} callback 回调函数
 */
function login(callback) {
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
                            wx.setStorage({
                                key:'cookie',
                                data:cookie,
                            });

                            getAccount(callback);

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
 * @param {function} callback 回调函数
 */
function getAccount(callback) {
    ajax({
        method: 'GET',
        url: 'user/info/get',
        success: (res) => {
            let result = res.data;
            if (result.errcode === 0) {
                delete result.errcode;
                delete result.errMsg;
                globalData.account = result;
            }
            else if (result.errcode === 10004) {
                globalData.account = null;
            }


            // 回调函数，判断它是不是一个函数
            if (callback && (callback instanceof Function)) {
                callback();
            }
        }
    });
}
/**
 * 快捷设置account相关信息到当前page
 * 包括name posion
 * 还有avatar
 * @param {WeApp.PageParam} that 传入this
 */
function setAccount(that, accountObj) {
    // 判断是否传入了this
    if (!that) {
        throw new DOMException('未传入this', 'this异常');
    }
    // 在外部声明account用于返回
    let account;
    // 判断account
    if (globalData.account) {
        account = globalData.account
        //兼容驼峰命名规范
        account.studentNum = account.studentnum;
        that.setData({
            account,
            name: account.name,
            position: account.department + ' - ' + account.duties,
            studentnum: account.studentnum,
            studentNum: account.studentnum,
        });
    }
    else 
    {
        // 如果全局变量中没有account，那么就把这个this页面的account值设为null。相当于刷新
        that.setData({
            account:null,
        });
    }


    // 判断avatar
    if (globalData.userInfo && globalData.userInfo.avatarUrl) {
        that.setData({
            avatar: globalData.userInfo.avatarUrl,
        });
        if(account){
            account.avatar = globalData.userInfo.avatarUrl;
        }
    }
    else{
        if(account){
            account.avatar = null;
        }
    }
    // 如果绑定了并且可以使用头像的话，就顺便返回account，减少判断
    return account ? account : false;
}


function getAvatar(){
    return globalData.userInfo.avatarUrl ? globalData.userInfo.avatarUrl : null;
}

/**
 * 显示消息提示框
 * @param {string} message 提示的消息
 * @param {number} type 1为正确，2为错误，3为等待，4为无。默认为无
 * @param {number} duration 显示时间，默认为2000毫秒
 */
function show(message, type, duration) {
    if (!message) {
        throw new DOMException('未传入消息', '空消息错误');
    }
    if (!duration) {
        duration = 2000;
    }
    // 定义显示的图标，还没写好
    switch (type) {
        // case 1:
        // break;
        default:
            type = 'none'
            break;
    }
    wx.showToast({
        title: message,
        icon: 'none',
        duration,
    })
}
/**
 * 刷新页面，在每次的onShow中调用
 * @param {WeApp.PageParam} that 调用的页面引用
 */
function flush(that) {
    let color;
    if ((color = globalData.navigationColor)) {
        wx.setNavigationBarColor({
            backgroundColor: color,
            frontColor: '#000000'
        })
        if(that){
            that.setData({
                color,
            });
        }

    }
}

function formIdUpload(e){
    if(e && e.detail && e.detail.formId){
        ajax({
            url:'user/formid/record',
            data:{
                formId:e.detail.formId,
            }
        })

    }
}
module.exports = {
    login,
    init,
    getAccount,
    setAccount,
    show,
    flush,
    formIdUpload,
}