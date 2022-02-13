import {Fence} from "../models/fence";
import {FenceGroup} from "../models/fence-group";

Component({
  properties: {
    spu: Object
  },
  // 如果需要处理 properties 中的数据, 就用 observers 监听器, 不要用生命周期(并不一定就能保证数据已经传到组件中了)
  observers: {
    'spu': function (spu) {
      if (!spu){
        return
      }
      const fencesGroup = new FenceGroup(spu)
      // fencesGroup.initFences()
      fencesGroup.initFencesWithMatrix()
    }
  },
  data: {},
  methods: {}
});
// 数据的流向: home 页面的 spu-preview 组件传递的 pid => 服务器 => detail(页面) => realm(大组件) => fence(小组件)