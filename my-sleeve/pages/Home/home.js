import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

Page({
  data: {
    themeA: null,
    themeE: null, // 基础数据
    themeF: null, // 基础数据
    themeH: null, // 基础数据
    themeESpu: [], // 带 spu 数据的详情数据
    bannerB: null,
    bannerG: null,
    grid: [],
    activityD: null,
    spuPaging: null,
    loadingType: 'loading'

  },
  async onLoad(options) {
    /**
     * models 层：业务逻辑，获取数据，业务类，业务对象
     * page 层：view 视图层，数据绑定，中间层，桥梁
     * wxml：show 层
     */
    await this.initAllData()
    await this.initBottomSpuList()

  },
  async onReachBottom() {
    const data = await this.data.spuPaging.getMoreData()
    if (!data){
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if (!data.moreData) {
      this.setData({
        loadingType:'end'
      })
    }
  },
  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()
    // t-1 和 t-2 硬编码, 不好
    // const themeA = themes.find(t =>  t.name === 't-1')
    // const themeE = themes.find(t =>  t.name === 't-2')
    // 永远保证, 调用方的调用过程是简单的
    const themeA = theme.getHomeLocationA()
    const themeE = theme.getHomeLocationE()
    const themeF = theme.getHomeLocationF()
    const themeH = theme.getHomeLocationH()

    const bannerB = await Banner.getHomeLocationB()
    const bannerG = await Banner.getHomelocationG()
    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()
    let themeESpu = []
    if (themeE.online) {
      // 只有当 themeE 没有下架, 才允许发送请求
      const data = await Theme.getHomeLocationESpu()
      if (data) {
        themeESpu = data.spu_list.slice(0, 8)
      }
    }
    this.setData({
      themeA,
      bannerB,
      grid,
      activityD,
      themeE,
      themeESpu,
      themeF,
      themeH,
      bannerG,
    })
  },
  async initBottomSpuList() {
    const paging =  SpuPaging.getLatest()
    this.data.spuPaging = paging
    const data = await paging.getMoreData()
    if (!data) {
      return
    }
    // console.log(data.items)
    // 累加
    wx.lin.renderWaterFlow(data.items)
  }
});
/**
 * 保存数据, 类的对象, 本身就具有保存数据的功能
 * 类保存数据, 类不能保存状态
 * 类的对象, 既可以保存数据, 也可以保存状态(不同对象的状态不同)
 */

/**
 * 组件没有显示出来
 * app.json xxx.json 中没有引用组件
 * 组件名拼写错误
 * 自定义组件里面的 wxml 中 数据绑定项 拼写错误, 或者层次错误
 * 没有添加 await
 */