// pages/event/event.js
import ask from '../../utils/ajax.js'
import moment from '../../utils/moment.js'
Page({
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    choseItem: {},
    choseDate: '',
    startPickDate: moment().format('YYYY-MM')
  },
  onLoad: function (options) { 
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch,
      choseDate: moment().format('YYYY-MM')
    });
    this.getDateEvent(moment().format('YYYY-MM'),true);
  },
  switchDate: function(){
    this.setData({
      showPicker: !this.data.showPicker
    })
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false,
        date: year + '.' +(month>9?month:'0'+month) + '.' + (i>9?i:'0'+i)
      });
    }
    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });
      this.getDateEvent(newYear + '-' + newMonth);
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });
      this.getDateEvent(newYear + '-' + newMonth);
    }
  },
  getEventTime: function(st) { 
    var date = new Date(st);
    let hour = date.getHours() > 9 ? date.getHours() : ('0' + date.getHours());
    let min = date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes());
    return hour + ':' + min;
  },
  tapDayItem(e) {
    const idx = e.currentTarget.dataset.idx;
    const days = this.data.days;
    days.map((item) => {
      item.choosed = false;
      return item;
    })
    days[idx].choosed = !days[idx].choosed;
    this.setData({
      days,
      choseItem: days[idx],
      showPicker: false
    });
  },
  chooseYearAndMonth(e) {
      let arr = e.detail.value.split('-');
      let year = Number(arr[0]);
      let mon = Number(arr[1]);
      this.calculateEmptyGrids(year, mon);
      this.calculateDays(year, mon);
      this.setData({
        cur_year: year,
        cur_month: mon
      });
      this.getDateEvent(year + '-' + mon);
  },
  getDateEvent: function (year_month, choseToday) {
    const self = this;
    wx.showLoading({
      title: '加载中...',
    })
    let p = ask('ApiGetEventByMonth', {
      data: {
        year_month
      }
    })
    p.then((res) => {
      wx.hideLoading();
      if (res.data.success) {
        let d = res.data.data;
        let events = d.events;
        for (var i in events){
          events[i] = events[i].map((item) => {
            item.content = item.content.replace(/\<br\/\>/g,'\n');
            item.start_time = self.getEventTime(item.start_time);
            item.city_spelling_inkfile = ['beijing', 'guangzhou', 'hangzhou', 'shanghai', 'shenzhen', 'wuhan'].indexOf(item.city_spelling_inkfile) == -1 ? '' : item.city_spelling_inkfile;
            return item;
          })
        }
        let days = self.data.days
        for (var i in events){
          for (var j in days){
            if (i.split('-')[2] == days[j].day){
              // 当日存在活动
              days[j].events = events[i]
            }
          }
        }
        days.map((item) => {
          let today = moment(new Date().toLocaleDateString())._d.getTime();
          if (new Date(item.date.replace(/\./g, '/')).getTime() < today){
            item.old = true;
          }
        })
        if (choseToday){
          // 初始选择今天
          for (var i in days){
            if (days[i].day == new Date().getDate()){
              days[i].choosed = true;
              this.setData({
                choseItem: days[i]
              })
            }
          }
        }
        this.setData({
          days
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
  onShareAppMessage() {
    return {
      title: '小程序日历',
      desc: '还是新鲜的日历哟',
      path: 'pages/index/index'
    };
  }
})