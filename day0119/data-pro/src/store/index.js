import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    //纬度
    latitude: null,
    // 经度
    longitude: null
}

const getters = {
    count(state){//求经纬度总和
        return state.latitude+state.longitude;
    }
}

const mutations = {
    //修改纬度的方法
    modifyLonitude(state, param){
        console.log('modifyLonitude触发了');
        state.longitude = param;
    },
    modifylatitude(state, param){
        console.log('modifylatitude触发了');
        state.latitude = param;
    }
}

const actions = {
    modifyLonAction(context, action){
        console.log('modifyLonAction触发了');



        context.commit('modifyLonitude', action.val);
    },
    // getLocationAction(context, action){
    //     console.log('modifyLonAction触发了');

    //     //定位事件
    //     // 定位成功
    //     // 经度，纬度
    //     {

    //     }

    //     context.commit('modifyLonitude', lon);
    //     context.commit('modifylatitude', lat);
    // }
    
    //修改地址事件
    modifyLocationAction(context, action){
        //执行修改经度
        context.commit('modifyLonitude', action.lon);
        //执行修改纬度
        context.commit('modifylatitude', action.lat);
    }
}


// 创建全局状态管理的仓库
const store = new Vuex.Store({
    //配置仓库拥有的所有的内容

    //全局状态
    // 再外部访问：组件的dom结构中$store.state   组件的js中this.$store.state
    // 外部不能直接修改state，将修改操作放在mutations
    state: state,

    // 全局计算状态
    getters: getters,

    // 修改全局状态方法
    // key值为修改的方法名字，value为修改state具体操作
    mutations: mutations,

    //包含了逻辑处理的代码，事件
    //action中可以做异步操作
    actions: actions,



    // 将状态划分成模块的
    modules: {}  
})

export default store;

