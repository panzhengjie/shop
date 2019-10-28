import product_data from "../product";


export default {
  getUser(state, username){
    console.log('username',username)
    state.username = username;
  },
  getLoginStatus(state, flag){
    state.loginStatus = flag;
  },
  setProductList(state,{product_data}){
    state.product = product_data
  },
  addCart(state,id){
    const isAdded = state.cartList.find(item => item.id === id);
    //如果不存在设置购物车为1，存在count++
    if(isAdded){
      isAdded.count++;
    }else{
      state.cartList.push({
        id: id,
        count: 1
      })
    }
  },
  //清空购物车
  emptyCart(state){
    state.cartList = [];
  },
  //修改购物车商品数量
  editCartCount(state, payload){
    const product = state.cartList.find(item => item.id === payload.id);
    product.count += payload.count;
  },
  deleteCart(state,id){
    const index = state.cartList.findIndex(item => item.id === id);
    state.cartList.splice(index, 1)
  }
}
