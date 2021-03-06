let handler = require('handler.js');
let login = require('login.js');
/**
 * 发送后端请求
 * @param {WeApp.RequestParam} 参数 
 */
function ajax(config) {
    // 判断是否传入了相对路径
    if (!config.url) {
        throw "必须传入请求的接口 url!";
    }

    // 添加默认配置
    if (!config.method) {
        config.method = 'POST'
    }
    if (!config.fail) {
        config.fail = (res) => {
            console.log('Ajax请求失败');
            console.log(res);
            // 隐藏加载状态
            wx.hideNavigationBarLoading();
        }
    }

    // 还要保存url，在cookie过期时的逻辑使用
    let url = config.url;
    // 设置绝对的请求链接
    config.url = handler.common + config.url;

    // 判断是否存在cookie
    if (handler.cookie) {
        config.header = {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=' + handler.cookie
        };
    }

    // 用一个变量来保存传入的回调方法。因为对象引用的原因，否则会递归调用。闭包
    let success = config.success;

    config.success = (res) => {
        // 隐藏加载状态
        console.log('隐藏加载状态')
        // wx.hideNavigationBarLoading();
        wx.hideLoading();
        console.log(res);
        // 判断是否返回cookie过期
        if (res.data && (res.data.errcode === handler.COOKIE_OUTOFDATE || 
            res.data.errcode === 10001 ) ) {
            // 如果过期了，首先清除cookie
            handler.cookie = null;
            // 然后重新调用login.login
            login.login(() => {
                // 重新登录之后，重新发送请求
                // 将success和url设置回去
                config.success = success;
                config.url = url;
                ajax(config);
            });

        }
        else {
            if(res.data && res.data.errcode === 20011){
                login.show('有未填写的必填数据');
            }
            if (res.data && res.data.errcode === 10002) {
              login.show('您没有操作权限');
            }
            // config.success(res);
            if (success) {
                success(res);
            }

        }

    }




    console.log(config);
    // 发起请求
    wx.request(config);
    // 显示加载状态
    console.log('显示加载状态');
    // wx.showNavigationBarLoading();
    wx.showLoading({
        title:'正在网络请求',
    });
}
// 暴露ajax方法
module.exports = ajax;