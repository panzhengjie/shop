export default {
  //当前用户账号
  username: window.localStorage.getItem('username'),
  //登录状态
  loginStatus: !!window.localStorage.getItem('loginStatus'),
  product: [],
  cartList:[]
}
