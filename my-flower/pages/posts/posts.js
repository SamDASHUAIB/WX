import {postList} from "../../data/data";

Page({
  data: {
    postList: []
  },
  onLoad: function (options) {
    //  创建 + 更新
    this.setData({
      postList
    })
  },
  onGoToDetail(event) {
    // wxml 中 以 data- 开头的自定义属性, 都放在了 dataset 中
    const id = event.currentTarget.dataset.id || event.detail.id
    // 页面与页面之间的数据通信, 通过 路由跳转 + 查询参数
    // 查询参数 ?key1=value1&key2=value2
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${id}`
    })
  },
});
// 第一次初始化: onLoad(大多数的业务代码) => onShow(页面显示) => onReady(数据渲染完成)
// 后续切换前后台: onHide(切后台) onShow(切前台)
// 路由的跳转, onUnload