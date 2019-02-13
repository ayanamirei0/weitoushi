import ask from '../../utils/ajax.js'
Page({
    data: {
    username: '',
    password: '',
    loginIng: false,
    noUseLogin: true
  },
  changeUsername: function(e) {
    var username = e.detail.value.trim();
    this.setData({
      username
    })
    if (username.length === 0 || this.data.password.length === 0){
      this.setData({
        noUseLogin: true
      })
    }else{
      this.setData({
        noUseLogin: false
      })
    }
    return username;
  },
  changePwd: function(e) {
    var password = e.detail.value.trim();
    this.setData({
      password
    })
    if (password.length === 0 || this.data.username.length === 0) {
      this.setData({
        noUseLogin: true
      })
    } else {
      this.setData({
        noUseLogin: false
      })
    }
    return password;
  },
  loginHandle: function () {
    var self = this;
    wx.showLoading({
      title: '正在登录...',
    })
    let p = ask('ApiAccountLogin', {
      data: {
        email: this.data.username,
        password: this.data.password
      }
    })
    p.then((res) => {
      wx.hideLoading();
      if(res.data.success){
        let token = res.data.data.access_token
        let username = res.data.data.user_name
        let email = res.data.data.email
        let avatar = res.data.data.avatar
        wx.setStorageSync('token', token)
        wx.setStorageSync('username', username)
        wx.setStorageSync('email', email)
        wx.setStorageSync('avatar', avatar)
        wx.switchTab({
          url: '../home/home'
        })
      }else{
        if (res.data.error_code === 4) {
          // 新用户 未绑定
          wx.showToast({
            title: '您还未绑定账户，请前往pc版绑定账户',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.error_code === 3) {
          // 等待激活
          wx.showToast({
            title: '您还未激活账户，请前往pc版激活账户',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.error_code === 2) {
          // 等待激活
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.error_code === 5) {
          // 等待激活
          wx.showToast({
            title: '您尚未通过认证',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.message || '登录失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    }),
    (err) => {
      console.log(err)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  loginByWechat: function() {
    // 微信登录
    wx.showLoading({
      title: '正在登录...',
    })
    wx.login({
      success: resp => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let p = ask('getWeChartLoginInfoByCode', {
          data: {
            code: resp.code,
            source: 'applet'
          }
        })
        p.then((res) => {
          wx.hideLoading();
          if (res.data.success) {
            // 直接登录
            let token = res.data.data.access_token
            let username = res.data.data.user_name
            let email = res.data.data.email
            let avatar = res.data.data.avatar
            wx.setStorageSync('token', token)
            wx.setStorageSync('username', username)
            wx.setStorageSync('email', email)
            wx.setStorageSync('avatar', avatar)
            wx.switchTab({
              url: '../home/home'
            })
          } else {
            if (res.data.error_code === 4) {
              // 新用户 未绑定
              wx.showToast({
                title: '您还未绑定账户，请前往pc版绑定账户',
                icon: 'none',
                duration: 2000
              })
            } else if (res.data.error_code === 3) {
              // 等待激活
              wx.showToast({
                title: '您还未激活账户，请前往pc版激活账户',
                icon: 'none',
                duration: 2000
              })
            } else if (res.data.error_code === 2) {
              // 等待激活
              wx.showToast({
                title: '账号或密码错误',
                icon: 'none',
                duration: 2000
              })
            } else if (res.data.error_code === 5) {
              // 等待激活
              wx.showToast({
                title: '您尚未通过认证',
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: res.data.message || '登录失败',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  onShareAppMessage: function () {
  
  }
})