Page({
  data: {
    items: null,
  },
  onLoad() {
    var self = this;
    dd.getAuthCode({
      success: function (res) {
        var authCode = res.authCode
        console.log("授权码---" + authCode)
        //获取用户个人信息
        dd.httpRequest({
          url: 'http://abc.liangyy.cn/api/getuserinfo',
          method: 'POST',
          data: {
            code: authCode
          },
          dataType: 'json',
          success: function (res) {
            self.setData({
              items: res.data.data
            })

            console.log(res)
          },
          fail: function (res) {
            dd.alert({content: res});
            console.log(res)
          }
        });
      },
      fail: function (err) {
      }
    });
  },

  onBack(e) {
    dd.navigateBack({
      delta: 1
    })
  },
});
