Component({
  properties: {
    post: Object
  },
  data: {},
  methods: {
    // id 传入 post-detail
    // 点击之后做什么事情, 组件不要绑定具体业务逻辑, 由组件的使用者来决定
    onTap(event) {
      const id = this.data.post.postId
      this.triggerEvent('posttap', {
        id
      })
    },
  }
});