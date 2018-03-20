//app.js
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null,
    _host: "https://www.yidianlin.com"
  },
  // 封装请求函数
  myRequest: function (obj) {
    let that = this;
    wx.request({
      url: this.globalData._host + (obj.url ? obj.url : ''),
      method: obj.method ? obj.method : "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'my-ua': 'wx-mini-program',
        "skey": wx.getStorageSync('skey'),
      },
      data: obj.data ? obj.data : {},
      success: function (redata) {
        if (redata.statusCode == 200) {
          if (obj.success) {
            obj.success(redata);
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '发送请求失败',
            image: '/images/gantan.png'
          })
        }
      },
      fail: function (redata) {
        if (obj.fail) {
          obj.fail(redata)
        }
      }
    })
  },
  // 封装跳转页面
  
})