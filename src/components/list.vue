<template>
  <div v-show="list.length">
    <div class="list-control">
      <div class="list-control-filter">
        <span>品牌:</span>
        <span class="list-control-filter-item"
              :class="{on: item === filterBrand}"
              v-for="item in brands"
              @click="handleFilterBrand(item)">{{item}}</span>
      </div>
      <div class="list-control-filter">
        <span>颜色:</span>
        <span class="list-control-filter-item"
              :class="{on: item === filterColor}"
              v-for="item in colors"
              @click="handleFilterColor(item)">{{item}}</span>
      </div>

      <div class="list-control-order">
        <span>排序:</span>
        <span class="list-control-order-item"
              :class="{on: order === ''}"
              @click="handleOrderDefault">默认</span>
        <span class="list-control-order-item"
              :class="{on: order.indexOf('sales') > -1}"
              @click="handleOrderSales">
                    销量
                    <template v-if="order === 'sales-desc'">↓</template>
                    <template v-if="order === 'sales-asc'">↑</template>
                </span>
        <span class="list-control-order-item"
              :class="{on: order.indexOf('cost') > -1}"
              @click="handleOrderCost">
                    价格
                    <template v-if="order === 'cost-desc'">↓</template>
                    <template v-if="order === 'cost-asc'">↑</template>
                </span>
      </div>
    </div>
    <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
    <div class="product-not-found"
         v-show="!filteredAndOrderedList.length">暂无相关商品</div>
  </div>
</template>

<script>
  import Product from '../page/product'
  export default {
    name: "list",
    components:{Product},
    data(){
      return {
        //品牌过滤
        filterBrand: '',
        //颜色过滤
        filterColor: '',
        //排序依据，可选值：
        //cost-desc价格降序
        //cost-asc价格升序
        //sales销量
        order: ''
      }
    },
    methods:{
      handleFilterBrand(item){
        //点击品牌过滤，再次点击取消
        if (this.filterBrand === item) {
          this.filterBrand = '';
        }else{
          this.filterBrand = item;
        }
      },
      handleFilterColor(item){
        if (this.filterColor === item) {
          this.filterColor = '';
        }else{
          this.filterColor = item;
        }
      },
      handleOrderDefault(){
        this.order = '';
      },
      handleOrderSales(){
        //当点击升序时将箭头更新↓,降序设置为↑
        if(this.order === 'sales-desc'){
          this.order = 'sales-asc';
        }else{
          this.order = 'sales-desc';
        }
      },
      handleOrderCost(){
        //当点击升序时将箭头更新↓,降序设置为↑
        if(this.order === 'cost-desc'){
          this.order = 'cost-asc';
        }else{
          this.order = 'cost-desc';
        }
      },
    },
    computed:{
      list(){
        return this.$store.state.product
      },
      brands(){
        return this.$store.getters.brands;
      },
      colors(){
        return this.$store.getters.colors;
      },
      filteredAndOrderedList(){
        //拷贝原数组
        let list = [...this.list];
        //品牌过滤
        if(this.filterBrand !== ''){
          list = list.filter(item => item.brand === this.filterBrand);
        }
        //颜色过滤
        if(this.filterColor !== ''){
          list = list.filter(item => item.color === this.filterColor);
        }
        //排序
        if(this.order !== ''){
          if(this.order === 'sales-desc'){
            list = list.sort((a, b) => b.sales - a.sales);
          }else if(this.order === 'sales-asc'){
            list = list.sort((a, b) => a.sales - b.sales);
          }else if(this.order === 'cost-desc'){
            list = list.sort((a, b) => b.cost - a.cost);
          }else if(this.order === 'cost-asc'){
            list = list.sort((a, b) => a.cost - b.cost);
          }
        }
        return list;
      }
    },
    mounted(){
      //初始化时通过Vuex actions获取商品列表信息
      this.$store.dispatch('getProductList');
    }
  }
</script>

<style scoped>
  .list-control{
    background: #fff;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
  }
  .list-control-filter{
    margin-bottom: 16px;
  }
  .list-control-filter-item,
  .list-control-order-item {
    cursor: pointer;
    display: inline-block;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
  }
  .list-control-filter-item.on,
  .list-control-order-item.on{
    background: #f2352e;
    border: 1px solid #f2352e;
    color: #fff;
  }
  .product-not-found{
    text-align: center;
    padding: 32px;
  }
</style>
