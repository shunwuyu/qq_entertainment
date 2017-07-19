// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bstop: true,
    song_list: [],
    musicSize: 20,
    musicOffset: 0,
    music:{},
    song_id: '',
    playerId: 0,
    hideEmptyData: true,
    playerSrc: '../../public/images/icons/musicplayer.png',
    playerLrc: '凉凉',
    playerAnimation: {}
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.addData(function(id) {
      // that.playmusic(id);
    })
  },
  onPlay: function(event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    var song_id = event.currentTarget.dataset.song_id;
    this.setData({
      playerId: id
    })
    that.setData({
      playerSrc: that.data.music.songinfo.pic_radio
    })
  },
  onMore: function() {
    if (this.data.bstop) {
      console.log('滑到底部')
      this.setData({
        musicSize: this.data.musicSize + 20
      })
      this.addData();
    }
  },
  onScroll: function () {

  },
  addData: function (fn) {
    console.log('请求歌曲中')

    var that = this;
    if (this.data.bstop) {
      this.setData({//不请求多次
        bstop: false
      })
      wx.request({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList',
        data: {
          type: 1,
          size: that.data.musicSize,
          offset: that.data.musicOffset
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          //later 等绚烂完数据再讲
          if(res.data.song_list.length === 0) {
            that.setData({
              hideEmptyData: false
            });
            return;
          }
          console.log(res.data.song_list)
          that.setData({
            song_list: res.data.song_list,
            bstop: true
          })
          console.log('请求歌曲列表成功', that.data.song_list)
          var num = that.data.playerId
          var song_id = res.data.song_list[num].song_id;
          console.log(song_id)
          if (fn) {
            fn(song_id)
          }
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
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