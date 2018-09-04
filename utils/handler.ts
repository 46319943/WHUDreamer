let handler = {
    /**ajax基础路径 */
    common: "https://dreamer.api.whusu.org/",
    /**保存全局cookie */
    cookie: {} as any,
    /**cookie过期code */
    COOKIE_OUTOFDATE: 20002,
    init,
};

function init (){
    let cookie = wx.getStorageSync('cookie');
    if(cookie){
        handler.cookie = cookie;
    }
}
export default handler;