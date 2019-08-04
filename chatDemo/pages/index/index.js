//index.js
Page({
  data: {
    messageInputVal: '',
    messageList: [
      {
        type: 'L',
        con: "微软开发者大会，请各界技术爱好者参加，欢迎报名",
        avater: '../../imgs/avater.jpg'
      },
      {
        type: 'R',
        con: "微软开发者大会，请各界技术爱好者参加，欢迎报名",
        avater: '../../imgs/pig.jpg'
      }
    ]
  },
  onLoad: function (options) {
    if (options.q) {
      let queryAll = decodeURIComponent(options.q);
      let id = gup('id', queryAll);
      //console.log(queryAll);
      //console.log(id);
    }
  },
  //发送消息
  messageSend: function () {
    let self = this;
    let messageVal = self.data.messageInputVal;
    if (!messageVal) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //发送的消息
    let objR = {
      type: 'R',
      con: messageVal,
      avater: '../../imgs/pig.jpg'
    };
    //自动回复（模拟数据）
    let objL = {
      type: 'L',
      con: "请问有什么可以帮到您？",
      avater: '../../imgs/avater.jpg'
    };
    let messageArr = [];
    messageArr.push(objR);
    messageArr.push(objL);
    let newMessageArr = self.data.messageList.concat(messageArr);
    //更新数据
    self.setData({
      messageInputVal: "",
      messageList: newMessageArr
    })
    //使页面滚动到底部
    wx.createSelectorQuery().select('#wrapperCon').boundingClientRect(function (rect) {
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec();
  },
  //获取输入内容
  messageInput: function (e) {
    this.setData({
      messageInputVal: e.detail.value
    })
  },
})

/**
 * 获取URL中某个字符串字段
 * gup('id', 'https://www.lubanso.com/wx/home/?id=bHViYW5zb7W7DJI=&jhkfdhkjfda')
 * //===> bHViYW5zb7W7DJI=
 */
function gup(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
}