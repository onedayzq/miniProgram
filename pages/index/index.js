//index.js
//获取应用实例
const app = getApp()
const BMapWX = require('../../libs/bmap-wx.min.js');
var bmapsdk;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }        
    // 实例化API核心类
    // bmapsdk = new QQMapWX({
    //   key: '6K7BZ-QLCWK-BXOJK-A5XZS-TXIVQ-D5F3C'
    // });
    // 获取地理位置信息
    wx.getLocation({
      success: function(res) {
        console.log(res);
        // bmapsdk.reverseGeocoder({
        //   location: {
        //     latitude: res.latitude,
        //     longitude: res.longitude
        //   },
        //   success: function(res) {
        //     console.log(res)
        //   }
        // })
      },
    })
    // wx.chooseLocation({
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  login: function () {
    app.myRequest({
      url: '/Q7/wx/submitLogin.htm', 
      method: "POST",
      data: {
        loginName: 'wmyg',
        loginPwd: '1',
      },
      success:function (res) {
        if (res.isOk) {
          wx.setStorageSync(skey, res.message)
        }
      }
    })
  }
})
