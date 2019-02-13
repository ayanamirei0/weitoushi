// pages/search-reult-filelink/link.js
import ask from '../../utils/ajax.js'
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let data = {
            end_time: new Date() - 0,
            page_num: 1,
            page_size: 20,
            search_word: 'keyword:证券',
            sort_pattern: 'score',
            type: 'link'
        }
        wx.showLoading({
            title: '加载中...',
        })
        ask('apiSearchReportLink',{data:data})
        .then((res) => {
            var that = this;
            wx.hideLoading();
            console.log(res);
            if (res.data.msg) {
                let list = res.data.data.records;
                this.setData({
                    list: list
                })
                let article = res.data.data.records.detail.content;
                WxParse.wxParse('article', 'html', article, that, 0);
                console.log(list);
            } else {
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})