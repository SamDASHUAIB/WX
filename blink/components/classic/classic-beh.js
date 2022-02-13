/* 行为: 定义多个组件共有的行为(properties data method) 其实就是一个 Component */
let classicBeh = Behavior({
  properties: {
    /* 大图片的地址 */
    img: String,
    /* 评论 */
    content: String,
    hidden: Boolean,
  },
})
export { classicBeh }
