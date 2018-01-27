const state={
	lon:'113.844314',
	lat:'22.631697',
}
const mutations = {
	modifyLon(state,param){
		state.lon = param
	},
	modifyLat(state,param){
		state.lat = param
	},
	modifyAddress(state,param){
		state.address = param
	}
}

const actions = {
	//获取经度或纬度
	initLocation(module){
		//执行定位
		setTimeout(()=>{
			let lon = '113.844314';
			let lat = '22.631697';
			module.commit('modifyLon',lon);
			module.commit('modifyLat',lat);
		},300);
	},
	modifyAddressAction(module,param){
		module.commit('modifyAddress',param.address);
	},
	modifyLocationAction(module,param){
		module.commit('modifyLon',param.lon);
		module.commit('modifyLat',param.lat);
		module.commit('modifyAddress',param.address)
	}
}
   
const locationModule = {
	namespaced:true,//拥有独立命名空间
	state,
	mutations,
	actions,
}

export default locationModule