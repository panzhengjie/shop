import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import list from '../components/list'
import cart from '../components/cart'
import product from '../components/product'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login/:loginStatus',
      meta: {
        title: '登录注册'
      },
      component: login
    },
    {
      path: '/list',
      meta: {
        title: '商品列表'
      },
      component: list
    },
    {
      path: '/product/:id',
      meta: {
        title: '商品详情'
      },
      component: product
    },
    {
      path: '/cart',
      meta: {
        title: '购物车'
      },
      component: cart
    },
    {
      path: '*',
      redirect: '/login/login'
    }
  ]
})
