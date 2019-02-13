// pages/detail/detail.js
import ask from '../../utils/ajax.js'
import moment from '../../utils/moment.js'
import { convertHtmlToText } from '../../utils/util.js'
Page({
  data: {
    item: {},
    type: 'default'
  },
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    if (options.type ==='viewpoint'){
      wx.setNavigationBarTitle({ title: options.name })
    }
    this.getContextMessage(options.record_id, options.group_id);
  },
  getContextMessage: function(record_id = '', group_id = '') {
    const self = this;
    let data = {
      group_id: group_id,
      ignore_record: false,
      limit: 1,
      record_id: record_id,
      type: 'all'
    }
    wx.showLoading({
      title: '加载中...'
    })
    let p = ask('WechatapiSubscribeLocationContext', { data })
    p.then((res) => {
      wx.hideLoading();
      if (res.data.success) {
        let data = res.data.data.records[0];
        data.receive_time = moment(data.receive_time).format('YYYY.MM.DD hh:mm:ss');
        if (data.type === 'text'){
          data.detail.content = convertHtmlToText(data.detail.content);
          if (data.detail.feature_type && data.detail.feature_type ==='event'){
            // 活动类型 显示活动卡片
            this.setData({
              type: 'event'
            })
            wx.setNavigationBarTitle({ title: '活动详情' })
            data.detail.event_detail.content = convertHtmlToText(data.detail.event_detail.content);
            data.detail.event_detail.start_time = moment(data.detail.event_detail.start_time).format('YYYY.MM.DD');
          }
        } else if (data.type === 'link'){
          data.detail.content = convertHtmlToText(data.detail.content);
        }
        this.setData({
          item: data
        })
      }
    })
  },
  openlink: function (e) {
    let data = e.currentTarget.dataset;
    wx.showActionSheet({
      itemList: ['复制链接'],
      success: function (res) {
        wx.setClipboardData({
          data: data.url,
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  onShareAppMessage: function () {
  
  }
})