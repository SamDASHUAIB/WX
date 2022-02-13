import {Spu} from "../../models/spu";

Page({
  data: {
    spu: null
  },
  onLoad: async function (options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)
    this.setData({
      spu
    })
  }
});