# Vue实现电商网站项目
`vue` + `vue-router` + `vuex`实现电商网站
Vue-cli 是 vue 官方提供的用于搭建基于 vue+webpack+es6 项目的脚手架工具
  npm install -g vue-cli 
  vue init webpack shop 
  cd gshop 
  npm install 
  npm run dev 
  访问:localhost:8080
## 需求分析
1. 登录页面、商品列表页（网站首页）、购物车页（实现结算）、商品详情页
2. 可按颜色、品牌对商品进行筛选，单击选中，再次点击取消
3. 根据价格进行升序降序、销量降序排列
4. 商品列表显示图片、名称、销量、颜色、单价
5. 实时显示购物车数量（商品类别数）
6. 购物车页面实现商品总价、总数进行结算，优惠券打折
## 数据存储 & 数据处理
* `product.js`存放商品数据（生产环境需通过接口调用获取数据）
```javascript
把照片放在static下可以本地访问
{
	id: 1,
	name: 'AirPods',
	brand: 'Apple',
	image: '../static/images/airPods.jpg',
	imageDetail: '../static/images/airPods_detail.jpg',
	sales: 10000,
	cost: 1288,
	color: '白色'
},
```
* `window.localStorage`实现数据存储与验证

```javascript
let username = window.localStorage.getItem('username');
let password = window.localStorage.getItem('password');
if(!util.trim(this.username) || !util.trim(this.username) ){
	window.alert('账号或密码不能为空');
	return;
}
if(username === this.username && password === this.password){
	this.login = false;
	window.localStorage.setItem('loginStatus', 'login');
	this.$store.commit('getUser', this.username);
	window.alert('登陆成功，确定进入网站首页');
	window.location.href = '/list';
}else{
	window.alert('账号或密码错误');
}
用loginStatus来标识用户登录的状态，false则需要登录界面，true则直接显示界面。
```
**数据过滤与排序处理**
```javascript
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
```
**实时显示应付总额与商品数**
```javascript
//购物车商品总数
countAll(){
	let count = 0;
	this.cartList.forEach(item => {
		count += item.count;
	});
	return count;
},
//购物车商品总价
costAll(){
	let cost = 0;
	this.cartList.forEach(item => {
		cost += this.productDictList[item.id].cost * item.count;
	});
	return cost;
}
```
**购物车结算处理**
```javascript
//通知Vuex,完成下单
handleOrder(){
	this.$store.dispatch('buy').then(() => {
		window.alert('购买成功');
	})
},
```
