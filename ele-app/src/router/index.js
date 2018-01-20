import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home.vue'
import Discover from '../pages/discover/Discover.vue'
import Mine from '../pages/mine/Mine.vue'
import Order from '../pages/order/Order.vue'
import Detail from '../pages/home/Detail.vue'

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
      	}
      ]
    },
    {
    	path:'/discover',
    	component:Discover,
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
