Component({
  properties: {
    banner: {
      type: Object,
    }
  },
  observers: {
    'banner': function (banner) {
      // 非空检验
      if (!banner) {
        return
      }
      if (banner.items.length === 0) {
        return;
      }
      const left = banner.items.find(i => i.name === 'left')
      const rightTop = banner.items.find(i => i.name === 'right-top')
      const rightBottom = banner.items.find(i => i.name === 'right-bottom')
      this.setData({
        left,
        rightTop,
        rightBottom,
      })
    }
  },
  data: {
    left: null,
    rightTop: null,
    rightBottom: null,
  },
  methods: {}
});
