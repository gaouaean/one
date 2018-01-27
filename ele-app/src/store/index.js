import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import locationModule from './location'

export default new Vuex.Store({
	
	modules:{
		location:locationModule
	}
})
