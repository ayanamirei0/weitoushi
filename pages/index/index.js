// pages/index/index.js
import ask from '../../utils/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerList: [{
      title: '全部',
      key: 'all'
    }, {
      title: '新闻',
      key: 'news'
    }, {
      title: '观点',
      key: 'view'
    }, {
      title: '纪要',
      key: 'summary'
    }, {
      title: '研报',
      key: 'report'
    }, {
      title: '讨论',
      key: 'discuss'
    }, {
      title: '活动',
      key: 'event'
    }, {
      title: '图片',
      key: 'image'
    }, {
      title: '消息',
      key: 'text'
    }, {
      title: '链接',
      key: 'link'
    }, {
      title: '文件',
      key: 'file'
    }],
    activeTabKey: 'all',
    dataList: []
  },
  changeTab: function(e) {
    console.log(e);
    let key = e.currentTarget.dataset.tapkey;
    if (key !== this.data.activeTabKey){
      this.setData({
        activeTabKey: key
      })
      this.loadTabData(key);
    }
  },
  loadTabData: function(type) {
    let data = {
      //category: 'all',
      end_time: new Date() - 0,
      search_word: [],
      page_num: 1,
      page_size: 20,
      prior: 0,
      search_word: "",
      type
    }
    wx.showLoading({
      title: '加载中...'
    })
    ask('apiSearchReport',{data:data})
    .then((res) => {
        var that = this;
      wx.hideLoading();
      console.log(res);
      if (res.data.msg) {
        let list = res.data.data.item;
        that.setData({
            list:list
        })
        console.log(list);
      }else{
        wx.showToast({
          title: '获取数据失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(() => {
      wx.hideLoading();
      wx.showToast({
        title: '网络错误',
        icon: 'none',
        duration: 2000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadTabData('all');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})