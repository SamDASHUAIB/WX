import {Http} from "../utils/http";

export class Spu {
  static getDetail(id) {
    return Http.request({
      url: `/v1/spu/id/${id}/detail`
    })
  }
}