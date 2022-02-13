import {Http} from "../utils/http";

export class Category {
  static async getHomeLocationC() {
    return await Http.request({
      url: `/v1/category/grid/all`
    })
  }
}