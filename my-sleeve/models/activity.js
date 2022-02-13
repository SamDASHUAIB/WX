import {Http} from "../utils/http";

export class Activity {
  //  a-2标识Home主页里的优惠活动
  static locationD = 'a-2'

  /*首页优惠券*/
  static async getHomeLocationD() {
    return await Http.request(
      {
        url: `/v1/activity/name/${Activity.locationD}`,
      }
    )
  }
}