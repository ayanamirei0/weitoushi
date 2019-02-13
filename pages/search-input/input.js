 // pages/search-input/input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   localStorage: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      let search_history = wx.getStorageSync('localStorage');
      this.setData({
          search_history: search_history,
          inputVal: ''
      })
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
  
  },

//   搜索历史
  setStorageInput:function(e){
      let localStorage = [];
      let inputVal = e.detail.value;
      localStorage = wx.getStorageSync('localStorage') || []

      localStorage.push(inputVal);
      wx.setStorageSync('localStorage', localStorage);
      console.log(e);
      console.log(localStorage);
  }
})