//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    windowWidth: '',
    userInfo: {},
    song_list: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user?id=123'
    }
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          scrollHeight: res.windowHeight - 44
        })
      }
    })
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList',
      data: {
        type: 1,
        size: 6,
        offset: 0
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          song_list: res.data.song_list
        })
      }
    })
    wx.request({
      url: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=6',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.data.movies)
        var movies=res.data.data.movies;
        that.setData({
          movieList:movies
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

    //请求视频列表;
    wx.request({
      url:'https://newapi.meipai.com/output/channels_topics_timeline.json?id=1&limit=6',
      success:function(res){
        console.log(res.data)
        var video=[];
        for(var i=0;i<6;i++){
          video[i]=res.data[i]
        }
        that.setData({
          videoList:video
        })
      }
    })
  }
})
