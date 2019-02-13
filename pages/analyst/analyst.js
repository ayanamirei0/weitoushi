// pages/search/search.js
import ask from '../../utils/ajax.js'
import moment from '../../utils/moment.js'
import { convertHtmlToText } from '../../utils/util.js'
Page({
  data: {
    records: [],
    subscribe_type: 'keyword',
    total: 0,
    loading: false,
    hasMore: true,
    name: '',
    group: '',
    tag: '',
    avatar: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: options.name })
    this.setData({
      name: options.name,
      group: options.group,
      tag: options.tag,
      avatar: options.avatar
    })
    this.getContextMessage();
  },
  getContextMessage: function (record_id) {
    const self = this;
    this.setData({
      loading: true
    })
    let data = {
      limit: 10,
      record_id: record_id || '',
      analyst_name: this.data.name
    }
    let p = ask('ApiSearchAnAnalystOpinion', { data })
    p.then((res) => {
      if (res.data.success) {
        let d = res.data.data
        if (!record_id) {
          self.setData({
            loading: false,
            total: d.total
          })
        } else {
          self.setData({
            loading: false,
          })
        }
        if (d.records.length < 10) {
          self.setData({
            hasMore: false
          })
        }
        d.records = d.records.map((item) => {
          item.receive_time = moment(item.receive_time).format('YYYY.MM.DD')
          if (item.type == 'file') {
            item.detail.filesize = (item.detail.filesize / 1024 / 1024).toFixed(2)
            item.detail.filename = convertHtmlToText(item.detail.filename)
          } else if (item.type == 'link') {
            item.detail.view = convertHtmlToText(item.detail.view)
            item.detail.content = convertHtmlToText(item.detail.content)
          } else if (item.type == 'text') {
            item.detail.view = convertHtmlToText(item.detail.view)
            item.detail.content = convertHtmlToText(item.detail.content)
          }
          return item
        })
        if (record_id) {
          self.setData({
            records: self.data.records.concat(d.records)
          })
        } else {
          self.setData({
            records: d.records
          })
        }
      }
    })
  },
  onScrollBottom: function () {
    if (!this.data.loading && this.data.hasMore) {
      this.getContextMessage(this.data.records[this.data.records.length - 1].record_id)
    }
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
  openfile: function (e) {
    let data = e.currentTarget.dataset;
    if (data.type == 'unkon') {
      return;
    }
    if (Number(data.size) > 100) {
      wx.showToast({
        title: '大于10M的文件不支持下载',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showActionSheet({
      itemList: ['下载并查看'],
      success: function (res) {
        wx.showLoading({
          title: '文件下载中...',
        })
        let url = data.url.replace('http://cdn.weiyoubot.cn/wxmsgimg', 'https://wechat-dev.modeling.ai//files');
        wx.downloadFile({
          url,
          success: function (res) {
            wx.hideLoading();
            var filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      }
    })
  },
  todetail: function (e) {
    // 跳转详情
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?group_id=' + data.group_id + '&record_id=' + data.record_id + '&type=default'
    })
  },
  onShareAppMessage: function () {
  
  }
})