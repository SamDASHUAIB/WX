import {Paging} from "../utils/paging";

export class SpuPaging {

  static getLatest() {
    return new Paging(
      {url: '/v1/spu/latest',},
      5,
      0)
  }
}
