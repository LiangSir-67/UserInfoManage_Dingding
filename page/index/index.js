let app = getApp();

//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名
// let domain = "http://127.0.0.1:8000/api";
// let url = domain + '/getuserinfo';
var qrcode = null;

Page({
  DDSaoMa() {
    dd.scan({
      type: 'qr',
      success: (res) => {
        qrcode = res.code
        console.log(res)

        dd.getAuthCode({
          success: function (res) {
            var authCode = res.authCode
            console.log("授权码---" + authCode)
            //获取用户个人信息
            dd.httpRequest({
              url: 'http://abc.liangyy.cn/api/ddsaoma',
              method: 'POST',
              data: {
                code: authCode,
                qrcode: qrcode
              },
              dataType: 'json',
              success: function (res) {
                console.log(res.data.msg)
                dd.alert({content: res.data.msg});
              },
              fail: function (res) {
                dd.alert({content: res});
                console.log(res)
                console.log(res.data.msg)
              }
            });
          },
          fail: function (err) {
          }
        });
      }
    });
  },
  jump() {
    dd.navigateTo({
      url: '/page/showinfo/showinfo'
    })
  },
  onLoad() {
    let _this = this;
    this.setData({
      corpId: app.globalData.corpId
      // corpId: dingd5aca511ee4b636bee0f45d8e4f7c288
    })
    //dd.alert({content: "step1"});
  }
})
