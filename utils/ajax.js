import api from '../config/index.js';
const baseURL = 'https://api-search-dev.analyst.ai';
// https://wechat.modeling.ai
// https://wechat-pre.modeling.ai
// https://wechat-dev.modeling.ai
var ask = (name, opt = {}) => {
  let {
    header,
    data,
    params,
    responseType
  } = opt //取传进来的用户信息
  let {
    method,
    url
  } = api[name] //取接口信息
  method = method || 'GET'

  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseURL + url,
      data,
      method,
      header: Object.assign({
        'Cookie': 'token=' + wx.getStorageSync('token') + ';' + 'userId=' + wx.getStorageSync('userId')
      }, header),
      success: (res) => {
        if (res.statusCode === 401){
          // wx.redirectTo({
          //   url: '../login/login'
          // })
        }else{
          resolve(res)
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 2000
        })
        reject(err);
      }
    })
  });
  return promise;
};

export default ask;