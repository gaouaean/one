import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home.vue'
import Discover from '../pages/discover/Discover.vue'
import Mine from '../pages/mine/Mine.vue'
import Order from '../pages/order/Order.vue'
import Detail from '../pages/home/Detail.vue'
import Address from '../pages/home/Address.vue'
import SellerList from '../pages/home/SellerList.vue'
import FoodSearch from '../pages/home/FoodSearch.vue'
import DiscoverFood from '../pages/discover/FoodList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      alias:'/',
      component: Home,
      children:[
      	{
      		path:'detail/:item/:index',
      		component:Detail
      	},
      	{
      		path:'address',
      		component:Address
      	},
      	{
      		path:'sellerlist/:item/:index',
      		component:SellerList
      	},
      	{
      		path:'search',
      		component:FoodSearch
      	}
      ]
    },
    {
    	path:'/discover',
    	component:Discover,
    	children:[
    		{
    			path:'food',
    			component:DiscoverFood
    		}
    	]
    },
    {
    	path:'/mine',
    	component:Mine,
    },
    {
    	path:'/order',
    	component:Order,
    },
    {
    	path:'**',
    	redirect:'/home'
    }
    
  ]
})
