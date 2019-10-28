import tool from '../tool/tool'
export default {
  brands(state){
    let arr = state.product.map(item=>item.brand);
    return tool.getFilterArray(arr)
  },
  colors(state){
    let arr =  state.product.map(item=>item.color);
    return tool.getFilterArray(arr)
  },
}
