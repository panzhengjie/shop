<template>
  <div>
    <template v-if="show">
      <div class="header">
        <router-link to="/list"
                     class="header-title">电商网站首页
        </router-link>
        <div class="header-menu">
          <router-link to="/cart"
                       class="header-menu-cart">
            购物车
            <span v-if="cartList.length">{{cartList.length}}</span>
          </router-link>
        </div>
        <div class="header-menu">
          {{user}}
        </div>
        <div class="header-menu">
          <router-link to="/login/logout"
                       class="header-menu-cart">
            退出登录
          </router-link>
        </div>
      </div>
    </template>
    <router-view/>
  </div>
</template>

<script>

export default {
  data(){
    return {

    }
  },
  computed:{
    user(){
      return this.$store.state.username
    },
    show(){
      return this.$store.state.loginStatus
    },
    cartList(){
      return this.$store.state.cartList
    }
  }
}
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
body{
  background: #f8f8f9;
}
.header{
  height: 48px;
  line-height: 48px;
  background: rgba(0,0,0,.8);
  color: #fff;
}
.header-title{
  padding: 0 32px;
  float: left;
  color: #fff;
}
.header-menu{
  float: right;
  margin-right: 32px;
}
.header-menu-cart{
  color: #fff;
}
.header-menu-cart span {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  background: #ff5500;
  color: #fff;
  font-size: 12px;
}

</style>
