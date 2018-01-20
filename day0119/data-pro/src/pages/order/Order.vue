<template>
<page pageId="order">
<h1>订单</h1>

<p>使用全局的：</p>
<p>经度：{{$store.state.longitude}}</p>
<p>纬度：{{$store.state.latitude}}</p>

<br/>
<br/>

<!-- <p>自己再次声明的的：</p>
<p>经度：{{longitude}}</p>
<p>纬度：{{latitude}}</p> -->

<p>自己再次声明的的：</p>
<p>经度：{{lon}}</p>
<p>纬度：{{lat}}</p>

<p>a:{{a}}</p>
<p>b:{{b}}</p>
<p>c:{{c}}</p>

<br/>
<br/>
<hr/>
<p>getters属性</p>
<p>{{$store.getters.count}}</p>
<p>{{sum}}</p>

</page>
</template>

<script>
import Page from '../../common/Page.vue'
import Vuex from 'vuex'
console.log(Vuex);

//Vuex.mapState
//让全局状态成为组件自己的属性使用。
// 也需要全局变化，全局状态成为自己的属性跟着变化

//Vuex.mapGetters
//让全局计算状态成为组件自己的属性使用。
// 会跟着全局发生变化


export default {
    components: {
        [Page.name]: Page
    },
    data(){
        return {
            a: 1,
            b: 2
            // longitude: this.$store.state.longitude,
            // latitude: this.$store.state.latitude
        }
    },
    //方式1：
    // computed: Vuex.mapState(['latitude', 'longitude'])
    //方式2：
    // computed: Vuex.mapState({
    //     lat: 'latitude',
    //     lon: 'longitude'
    // })
    //方式3：
    // computed: Vuex.mapState({
    //     lat: (state)=>{
    //         return state.latitude;
    //     },
    //     lon: 'longitude'
    // })
    //方式4：
    
    // computed: Vuex.mapState(['latitude', 'longitude']),

    computed: {
        ...Vuex.mapState({
            lat: 'latitude',
            lon: 'longitude'
        }),
        ...Vuex.mapGetters({
            sum: 'count'
        }),
        c: function(){
            return this.a+this.b;
        }
    }
}



var obj = {
    a: 'a',
    b: 'b'
}

var obj1 = {
    ...obj,
    c: 'c'
}


console.log(obj1);

</script>

<style>

</style>
