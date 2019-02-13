import ask from '../../utils/ajax.js'
import moment from '../../utils/moment.js'
import { convertHtmlToText } from '../../utils/util.js'
Page({
	data: {
    queryType: 'this_week',
    array: ['今天', '本周', '上周', '本月', '上个月', '近三个月'],
    arrayCode: ['today', 'this_week', 'last_week', 'this_month', 'last_month', 'last_three_month'],
    index: 1,
    // 时间对比
    dateQuery: [],
    date: moment().format('YYYY.MM.DD'),
    conceptLoading: false,
    companyLoading: false,
    analystsLoading: false,
    hotCompanyList: [], //最热公司列表
    hotConcept: [], //最热行业
    analystsList: [], //明星分析人
	},
	onLoad:function(){
    this.getDateList();
    this.getHotcompany('company');
    this.getHotcompany('concept');
    this.getAnalystStar();
	},
  bindPickerChange: function (e) {
    let index = e.detail.value;
    let value = this.data.arrayCode[index];
    this.setData({
      queryType: value,
      index
    })
    if (value === 'today') {
      this.setData({
        date: moment().format('YYYY.MM.DD')
      })
    } else {
      this.setData({
        date: this.getDateByNum(this.data.dateQuery[value])
      })
    }
    this.getHotcompany('company')
    this.getHotcompany('concept')
    this.getAnalystStar();
  },
  getDateByNum(value) {
    let start = moment(value.start_time).format('YYYY.MM.DD')
    let end = moment(value.end_time).format('YYYY.MM.DD')
    return start + ' - ' + end;
  },
  getDateList() {
    // 查询时间区间
    const self = this;
    ask('queryTimeSection')
    .then((res) => {
      if(res.data.success){
        let d = res.data.data;
        self.setData({
          dateQuery: d,
          date: self.getDateByNum(d['this_week'])
        })
      }
    })
  },
  getHotcompany: function(type) {
    const self = this;
    let data = {
      limit: 10,
      type,
      queryTime: this.data.queryType
    }
    if (type === 'concept') {
      this.setData({
        conceptLoading: true,
        hotConcept: []
      })
    } else if (type === 'company') {
      this.setData({
        companyLoading: true,
        hotCompanyList: []
      })
    }
    ask('hot', {
      data
    }).then((res) => {
      if (res.data.success) {
        let d = res.data.data.items
        d.map((item,index) => {
          // 处理talkers
          item.talkersnum = item.talkers.length;
          item.talkers = item.talkers.map((item) =>
            item.length > 5 ?
            (item.substr(0, 3) + '...') :
            item
          ).slice(0, 2).join('、');
          return item;
        })
        if (type === 'company') {
          self.setData({
            hotCompanyList: d,
            companyLoading: false
          })
        } else if (type === 'concept') {
          self.setData({
            hotConcept: d,
            conceptLoading: false
          })
        }
      }
    })
  },
  getAnalystStar() {
    this.setData({
      analystsList: [],
      analystsLoading: true
    })
    wx.showLoading({
      title: '加载中...'
    })
    ask('SpiIndexAnalystStar', {
      data: {
        limit: 10,
        queryTime: this.data.queryType
      }
    }).then((res) => {
      wx.hideLoading();
      if (res.data.success) {
        let d = res.data.data.analysts
        d.map((item) => {
          item.update_time = moment(item.update_time).format('YYYY.MM.DD');
          item.view = convertHtmlToText(item.view);
          item.content = convertHtmlToText(item.content);
          return item;
        })
        this.setData({ 
          analystsList: d,
          analystsLoading: false
        })
      }
    })
  },
  tosearch: function(e,item) {
    const self = this;
    wx.navigateTo({
      url: '../search/search?keyword=' + e.currentTarget.dataset.name + '&query_time=' + self.data.queryType + '&type=' + e.currentTarget.dataset.type
    })
  },
  todetail: function (e) {
    // 跳转详情
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?group_id=' + data.group_id + '&record_id=' + data.record_id + '&type=default'
    })
  },
  toViewpoint: function(e){
    // 某个观点详情
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?group_id=' + data.group_id + '&record_id=' + data.record_id + '&type=viewpoint' + '&name=' + data.name
    })
  },
  toanalyst: function(e){
    // 分析师观点列表
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../analyst/analyst?group=' + data.group + '&tag=' + data.tag + '&name=' + data.name + '&avatar=' + data.avatar
    })
  }
})