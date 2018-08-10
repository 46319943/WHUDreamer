module.exports = {
    /**ajax基础路径 */
    common: "https://think.whusu.org/",
    /**保存全局cookie */
    cookie: undefined,
    /**cookie过期code */
    COOKIE_OUTOFDATE: 20002,
    init,
}

function init (){
    let cookie = wx.getStorageSync('cookie');
    if(cookie){
        this.cookie = cookie;
    }
}