import product_data from '../product'
export default {
  getProductList(context){
    setTimeout(() => {
      context.commit('setProductList', {product_data})
    }, 500);
  },
    //购买
  buy(context){
    //生产环境使用ajax请求服务端响应后再清空购物车
    return new Promise(resolve => {
      setTimeout(() => {
      context.commit('emptyCart');
      resolve();
       }, 500);
    });
  },
}
