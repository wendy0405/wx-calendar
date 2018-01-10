//index.js
var App = getApp()
//获得当年月
const date = new Date()
let cur_year = date.getFullYear()
let cur_month = date.getMonth() + 1
let now_day = date.getDate()
Page({
  data: {
    page: 0,
    now_year_month:'1970年1月',
    week: ['日', '一', '二', '三', '四', '五', '六'],
    day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    check:'',
    date:'1970-01'
  },
  onLoad:function() {
    let day = this.getMonthDay(cur_year, cur_month);  
    this.setData({
      day: day,
      now_year_month:cur_year+' 年 '+cur_month+' 月',
      date: cur_year + '-' + cur_month
    });
  },
  //获取每月天数与开始星期
  getMonthDay:function(year,month) {
    let month_day = new Date(year, month, 0).getDate();
    let start_day = new Date(Date.UTC(year, month - 1, 1)).getDay();
    let day = [];
    for(let i = 0;i < start_day;i++) {
        day.push(0);      
    }
    for(let i = 1;i < month_day + 1;i++) {
        day.push(i);
    }
    return day;      
  },
  //点击事件--
  tap_style:function(e) {
    let now_id = e.currentTarget.dataset.now;
    if(now_id > 0) {
      this.setData({
        check: now_id
      })      
    }
  },
  //左滑右滑
  touch_start:function(e) {
    this.start_x = e.changedTouches[0].clientX
    this.start_y = e.changedTouches[0].clientY
    this.start_time = e.timeStamp
  },
  touch_end: function (e) {
    //处理滑动
    let end_x = e.changedTouches[0].clientX
    let end_y = e.changedTouches[0].clientY
    let end_time = e.timeStamp
    let is_ok = false
    let angle = false
    let nav = 'right'
    //往左滑
    if ((end_x - this.start_x) < 0) {
      nav = 'left'
    }
    //判断滑动是否有效
    if ((end_time-this.start_time) < 500) {
      is_ok = true
    }
    //判断滑动角度
    let angle_num = 360 * Math.atan(parseInt(end_y - this.start_y) / parseInt(end_x - this.start_x)) / (2 * Math.PI)
    //度数小于30°时允许滑动
    if (Math.abs(angle_num) < 30) {
      angle = true
    }
    if (is_ok && angle) {
      this.changeView(nav)
    }
  },
  //滑动改变视图
  changeView:function(nav) {
      //上一个月
      if(nav === 'right') {
        //上一年
        if (cur_month === 1) {
          cur_year = cur_year - 1
          cur_month = 12
        }else{
          cur_month = cur_month - 1
        }
      }else {//下一个月
        //下一年
        if (cur_month === 12) {
          cur_year = cur_year + 1
          cur_month = 1
        } else {
          cur_month = cur_month + 1
        }
      }
      let day = this.getMonthDay(cur_year, cur_month);
      this.setData({
        day: day,
        now_year_month: cur_year + ' 年 ' + cur_month + ' 月',
        date: cur_year + '-' + cur_month
      });      
  },
  //点击选择时间
  chooseMonth:function(e) {
    let date = e.detail.value.split("-");
    cur_year = parseInt(date[0])
    cur_month = parseInt(date[1])
    let day = this.getMonthDay(cur_year, cur_month);
    this.setData({
      day: day,
      now_year_month: cur_year + ' 年 ' + cur_month + ' 月',
      date: cur_year + '-' + cur_month
    });    
  }
})
