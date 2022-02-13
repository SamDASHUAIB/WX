import {convertToCastInfos, convertToCastString} from "../../utils/util";

const app = getApp()
Page({
  onViewBigPic() {
    wx.previewImage({
      urls: [this.data.movie.images.large],
    })
  },
  data: {
    movie: {}
  },
  onLoad: function (options) {
    const mid = options.mid
    wx.request({
      url: app.gBaseUrl + 'subject/' + mid,
      success: result => {
        // console.log(result)
        // this.setData({
        //   movie: result.data
        // })
        this.processMovieData(result.data)
      }
    })
  },
  processMovieData(movie) {
    const data = {}
    data.directors = convertToCastString(movie.directors)
    data.casts = convertToCastString(movie.casts)
    data.image = movie.images.large
    data.title = movie.title
    data.subtitle = movie.countries[0] + '·' + movie.year
    data.wishCount = movie.wish_count
    data.commentsCount = movie.comments_count
    data.rating = movie.rating.stars / 10
    data.average = movie.rating.average
    data.genres = movie.genres.join('、')
    data.summary = movie.summary
    data.castsInfo = convertToCastInfos(movie.casts)
    this.setData({
      movie: data
    })
  },
});