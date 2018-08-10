let handler = require('handler.js');
/**
 * 发送后端请求
 * @param {WeApp.RequestParam} 参数 
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
        config.header = {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=' + handler.cookie
        };
    }
    // 添加默认配置
    if(!config.method){
        config.method = 'POST'
    }
    if(!config.fail){
        config.fail = (res) => {
            console.log('Ajax请求失败');
            console.log(res);
        }
    }
    console.log(config);
    // 发起请求
    wx.request(config);
}
// 暴露ajax方法
module.exports = ajax;