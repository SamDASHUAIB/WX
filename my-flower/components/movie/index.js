Component({
  properties: {
    movie: Object
  },
  data: {},
  methods: {
    onGoToDetail(event) {
      // console.log(this.properties.movie)
      const mid = this.properties.movie.id
      wx.navigateTo({
        url: '/pages/movie-detail/movie-detail?mid='+mid
      })
    }
  }
});
