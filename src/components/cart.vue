<template>
  <div class="cart">
    <div class="cart-header">
      <div class="cart-header-title">购物清单</div>
      <div class="cart-header-main">
        <div class="cart-info">商品信息</div>
        <div class="cart-price">单价</div>
        <div class="cart-count">数量</div>
        <div class="cart-cost">小计</div>
        <div class="cart-delete">删除</div>
      </div>
    </div>
    <div>
      <!-- 列表显示购物清单 -->
      <div class="cart-content-main" v-for="(item, index) in cartList">
        <div class="cart-info">
          <img :src="product[item.id].image">
          <span>{{product[item.id].name}}</span>
        </div>
        <div class="cart-price">
          ￥ {{product[item.id].cost}}
        </div>
        <div class="cart-count">
                    <span class="cart-control-minus"
                          @click="handleCount(index, -1)">-</span>
          {{item.count}}
          <span class="cart-control-add"
                @click="handleCount(index, 1)">+</span>
        </div>
        <div class="cart-cost">
          ￥ {{product[item.id].cost * item.count}}
        </div>
        <div class="cart-delete">
                    <span class="cart-control-delete"
                          @click="handleDelete(index)">删除</span>
        </div>
      </div>
      <div class="cart-empty" v-if="!cartList.length">购物车为空</div>
    </div>
    <div class="cart-promotion" v-show="cartList.length">
      <span>使用优惠券</span>
      <input type="text" v-model="promotionCode">
      <span class="cart-control-promotion"
            @click="handleCheckCode">验证</span>
    </div>
    <div class="cart-footer" v-show="cartList.length">
      <div class="cart-footer-desc">
        共计 <span>{{countAll}}</span>
      </div>
      <div class="cart-footer-desc">
        应付总额 <span>{{costAll - promotion}}</span>
        <br>
        <template v-if="promotion">
          (优惠<span>￥ {{promotion}} </span>)
        </template>
      </div>
      <div class="cart-footer-desc">
        <div class="cart-control-order"
             @click="handleOrder">现在结算</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cart",
    data(){
      return {
        promotion:0,
        promotionCode:''
      }
    },
    methods:{
      handleOrder(){
        this.$store.dispatch('buy').then(() => {
          window.alert('购买成功');
        })
      },
      //验证优惠码，使用ccylovehs代替优惠券字符串
      handleCheckCode(){
        if(this.promotionCode === ''){
          window.alert('请输入优惠码');
          return;
        }
        if(this.promotionCode !== 'ccylovehs'){
          window.alert('优惠码输入错误');
          return;
      }
        this.promotion = 500;
      },
      handleCount(index,num){
        //最小值设置1
        if(num < 0 && this.cartList[index].count === 1) return;
        this.$store.commit('editCartCount', {
          id: this.cartList[index].id,
          count: num
        });
      },
      //根据index查找商品id进行删除
      handleDelete(index){
        if(window.confirm('确定删除该项')){
          this.$store.commit('deleteCart', this.cartList[index].id);
        }
      }
    },
    computed:{
      cartList(){
        return this.$store.state.cartList
      },
      product(){
        return this.$store.state.product
      },
      countAll(){
        let count = 0;
        this.cartList.forEach(item => {
          count += item.count;
        });
        return count;
      },
      costAll(){
        let cost = 0;
        this.cartList.forEach(item => {
          cost += item.count*(this.product[item.id].cost)
        });
        return cost
      }
    }
  }
</script>

<style  scoped>
  .cart{
    margin: 32px;
    background: #fff;
    border: 1px solid #dddee1;
    border-radius: 10px;
  }
  .cart-header-title{
    padding: 16px 32px;
    border-bottom: 1px solid #dddee1;
    border-radius: 10px 10px 0 0;
    background: #f8f8f9;
  }
  .cart-header-main{
    padding: 8px 32px;
    overflow: hidden;
    border-bottom: 1px solid #dddee1;
    background: #eee;
  }
  .cart-header-main >div {
    text-align: center;
    float: left;
    font-size: 14px;
  }
  div.cart-info{
    width: 50%;
    text-align: left;
  }
  .cart-price{
    width: 10%;
  }
  .cart-count{
    width: 20%;
  }
  .cart-cost{
    width: 10%;
  }
  .cart-delete {
    width: 10%;
  }
  .cart-content-main{
    padding: 0 32px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px dashed #e9eaec;
    overflow: hidden;
  }
  .cart-content-main div{
    float: left;
  }
  .cart-content-main img{
    width: 40px;
    height: 40px;
    position: relative;
    top: 10px;
  }
  .cart-control-minus,
  .cart-control-add{
    display: inline-block;
    margin: 0 4px;
    width: 24px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    background: #f8f8f9;
    border-radius: 50%;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    cursor: pointer;
  }
  .cart-control-delete{
    cursor: pointer;
    color: #2d8cf0;
  }
  .cart-empty{
    text-align: center;
    padding: 32px;
  }
  .cart-promotion{
    padding: 16px 32px;
  }
  .cart-control-promotion,
  .cart-control-order{
    display: inline-block;
    padding: 8px 32px;
    border-radius: 6px;
    background: #2d8cf0;
    color: #fff;
    cursor: pointer;
  }
  .cart-control-promotion{
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 3px;
  }
  .cart-footer{
    padding: 32px;
    text-align: right;
  }
  .cart-footer-desc{
    display: inline-block;
    padding: 0 16px;
  }
  .cart-footer-desc span{
    color: #f2352e;
    font-size: 20px;
  }
</style>
