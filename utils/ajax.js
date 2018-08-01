let handler = require('handler.js');
let defaultConfig = {
    method: "POST",
    fail: function (res) {
        console('Ajax请求失败');
        console(res);
    },
};
/**
 * 发送后端请求
 * @param {*} 参数 
 */
function ajax(config) {
    // 判断是否传入了相对路径
    if (!config.url) {
        throw "必须传入请求的接口 url!";
    }
    // 设置请求的链接
    config.url = handler.common + config.url;
    // 判断是否存在cookie
    if (handler.cookie) {
        defaultConfig.header = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=' + handler.cookie
        };
    }
    // 添加默认配置
    let _config = Object.assign(defaultConfig, config);
    console.log(_config);
    // 发起请求
    wx.request(_config);
}
// 暴露ajax方法
module.exports = ajax;