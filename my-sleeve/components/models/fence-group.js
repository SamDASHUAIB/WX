import {Matrix} from "./matrix";
import {Fence} from "./fence";

export class FenceGroup {
  spu
  skuList = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  initFences() {
    // 可读性查, 不好维护, 思路直接, 双重循环。
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    let currentJ = -1
    matrix.forEach((element, i, j) => {
      if (currentJ !== j) {
        // 开启一个新列, 需要创建一个新的 fence
        currentJ = j
        // createFence
        fences[currentJ] = this._createFence()
      }
      fences[currentJ].pushValueTitles(element.value)
    })
    console.log(fences)
  }
  initFencesWithMatrix() {
    // 行列式, 矩阵转置 + 去重
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    const AT = matrix.transpose()
    console.log(AT)
    AT.forEach(r => {
      const fence = new Fence(r)
      fence.init()
      fences.push(fence)
    })
    console.log(fences)
  }
  _createMatrix(skuList) {
    const m = []
    skuList.forEach(sku => m.push(sku.specs))
    return new Matrix(m)
  }

  _createFence() {
    return new Fence()
  }
}