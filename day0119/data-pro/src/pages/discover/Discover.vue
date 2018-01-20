<template>
<page pageId="discover">
    <h1>发现</h1>
    <p>经度为：{{$store.state.longitude}}</p>
    <p>纬度为：{{$store.state.latitude}}</p>

    <!-- <br/>
    经度：<input type="number" v-model.number="$store.state.longitude"/>
    <br/>
    纬度：<input type="number" v-model.number="$store.state.latitude"/> -->

    <br/>
    经度：<input type="number" v-model.number="lon"/>
    <button @click="modifyLonAct()">修改</button>
    <br/>
    纬度：<input type="number" v-model.number="lat"/>

</page>
</template>

<script>
import Page from '../../common/Page.vue'
export default {
    components: {
        [Page.name]: Page
    },
    data(){
        return {
            lat: this.$store.state.latitude,
            lon: this.$store.state.longitude
        }
    },
    methods: {
        modifyLonAct(){
            //读取出输入框的longitude
            // 触发store中的mutations中的modifyLonitude方法
            // this.$store.commit('modifyLonitude', this.lon);

            // 触发store中的actions中的modifyLonAction方法
            //方式1触发action:
            // this.$store.dispatch({
            //     type: 'modifyLonAction',
            //     val: this.lon
            // });
            //方式2触发action:
            this.$store.dispatch('modifyLonAction', {
                val: this.lon
            });
        }
    }
}
</script>

<style>

</style>

