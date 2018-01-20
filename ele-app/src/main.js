// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//Vue.config.productionTip = false

Vue.prototype.$event = new Vue()

import './directive/color'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//import axios from 'axios'
//console.log(axios);
//axios({
//	method:'get',
//	url:'/restapi/shopping/openapi/entries?latitude=22.54286&longitude=114.059563&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template',
//	
//}).then((response)=>{
//	console.log('请求成功了');
//	console.log(response);
//	response.data[0].entries.map(item=>{
//		console.log(item.name)
//	})
//	console.log(response.data[0].entries)
//}).catch((error)=>{
//	console.log('请求失败了');
//	console.log(error)
//})
