let app = getApp();
let globalData = app.globalData;
let handler = globalData.handler;
let ajax = globalData.ajax;
let login = globalData.login;
let util = globalData.util;
Page({

  data: {

  },
  /*
    根据模版消息传入的链接下载PDF

    如果在本地中已经找得到学号对应文件路径，那么说明已经下载了，并且已经上传到了OSS
    如果没有，那么就下载文件，保存，并上传OSS，然后将链接复制到剪贴版

    保存并改变状态在上传OSS成功之后，避免改变了状态但OSS上传失败导致链接无效

  */


  onLoad: function (options) {
    // 获取模版消息传进来的参数
    let num = options.num;
    let code = options.code;
    // 如果有一个没有，就关闭页面
    if (!num || !code) {
      login.show('内部错误，联系管理员');
      setTimeout(() => {
        wx.switchTab({ url: '../user/user' });
      }, 2000);
      return;
    }
    // 设置全局数据
    this.data.num = num;
    this.data.code = code;

    // 获取本地存储的学号对应的pdf的路径
    let res = wx.getStorageSync(num);
    let filePath = res.filePath;
    let OSSUrl = res.OSSUrl;
    // 如果路径存在，那么就设置为已完成下载，并设置全局文件路径
    if (filePath && OSSUrl) {
      this.setData({ complete: true });
      this.data.filePath = filePath;
      this.data.OSSUrl = OSSUrl;
    }

  },
  // 下载pdf，并且上传PDF到OSS
  download: function (e) {
    login.show('正在获取PDF，请等待几秒');

    // 首先上传formId
    login.formIdUpload(e);

    // 获取下载参数
    let num = this.data.num;
    let code = this.data.code;
    // 如果成功获取了参数，点击按钮开始下载，并获取下载监听对象
    let url = `https://www.whusu.org/entry/index.php?studentnum=${num}&code=${code}`;
    this.data.url = url;
    let downloadTask = wx.downloadFile({
      url,
      success: res => {
        login.show('下载原始PDF成功');
        // 获取临时文件路径
        let tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        // 将临时文件永久保存
        wx.saveFile({
          tempFilePath,
          success: res => {
            login.show('保存PDF成功');
            // 获取永久保存的路径，并保存在全局路径
            let filePath = res.savedFilePath;
            this.data.filePath = filePath;
            console.log(filePath);
            let OSSPath;
            let OSSUrl;
            // 1.将PDF上传到OSS
            ajax({
              url: 'sign/oss/get/signuppdf',
              success: res => {
                login.show('获取PDF签名成功');
                if (res.data && res.data.errcode === 0) {
                  // 获取上传所需签名
                  let sign = res.data;
                  delete sign.errcode;
                  delete sign.errmsg;
                  OSSPath = sign.dir + this.data.num + '.pdf';
                  OSSUrl = sign.host + '/' + OSSPath;
                  // 需要后端改，但后端不改
                  OSSUrl = 'https://files.whusu.org/' + OSSPath;
                  console.log(OSSUrl);
                  wx.uploadFile({
                    filePath,
                    url: sign.host,
                    name: 'file',
                    formData: {
                      key: sign.dir + this.data.num + '.pdf',//上传文件的文件名。如果名称包含路径，则OSS会自动创建相应的文件夹
                      name: filePath,
                      policy: sign.policy,
                      Signature: sign.signature,
                      OSSAccessKeyId: sign.accessid,
                      success_action_status: '200',
                    },
                    success: res => {
                      login.show('生成PDF链接成功');
                      // 如果上传成功了的话
                      if (res.statusCode === 200) {
                        // 2.在本地存储学号对应pdf文件的路径
                        wx.setStorage({
                          key: num,
                          data: { filePath, OSSUrl },
                        });
                        // 3.设置为已完成下载状态
                        this.setData({ complete: true });
                        this.data.OSSUrl = OSSUrl;
                        login.show('获取PDF完成');
                      }
                      else {
                        login.show('获取PDF失败，请检查网络');
                      }

                    }

                  });
                }
              }

            });





          }
        });

      }
    });


    /*
    不需要回调，因为文件很小
    downloadTask.onProgressUpdate = res => {
      let progress = res.progress;
      let totalBytesWritten = res.totalBytesWritten;
      let totalBytesExpectedToWrite = res.totalBytesExpectedToWrite;
      console.log(progress);
      console.log(totalBytesWritten);
      console.log(totalBytesExpectedToWrite);
      this.setData({
        progress,totalBytesWritten,totalBytesExpectedToWrite,
      })
    }
    */


  },
  // 打开pdf
  open: function (e) {
    // 首先上传formId
    login.formIdUpload(e);
    // 获取全局路径
    let filePath = this.data.filePath;

    // 打开文件
    wx.openDocument({
      filePath,
      fileType: 'pdf',
    });

    // let url = this.data.url;
    // wx.navigateTo({url:`../html/html?url=${url}`});
  },
  // 返回小程序
  back: function (e) {
    // 首先上传formId
    login.formIdUpload(e);
    // 跳转到用户中心
    wx.switchTab({ url: '../user/user' });
  },
  copy: function (e) {
    wx.setClipboardData({
      data: this.data.OSSUrl,
      success: res => {
        login.show('PDF下载链接已设置到剪贴板');
      }
    })

  },
  delete: function (e) {
    this.setData({ complete: false });

  },
})