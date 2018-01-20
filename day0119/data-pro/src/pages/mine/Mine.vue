<template>
<page pageId="mine">
<h1>我的</h1>

<p>经度：<input type="text" v-model="lon"></p>
<p>纬度：<input type="text" v-model="lat"></p>
<button @click="btnAction()">提交</button>

</page>
</template>

<script>
import Page from '../../common/Page.vue'
import Vuex from 'vuex'
export default {
    components: {
        [Page.name]: Page
    },
    data(){
        return {
            lon: '',
            lat: ''
        }
    },
    methods: {
        ...Vuex.mapActions({
            //key值是：可以在组件中通过this调用的事件名字
            // value值是：全局的actions事件名字
            modifyLocation: 'modifyLocationAction'
        }),
        ...Vuex.mapMutations({
            modifyLon: 'modifyLonitude',
            modifyLat: 'modifylatitude'
        }),

        btnAction(){
            //将this.lon this.lat告诉store
            // 通过actions告诉store
            // this.$store.dispatch('modifyLocationAction', {
            //     lon: this.lon,
            //     lat: this.lat
            // })

            // this.modifyLocation( {
            //     lon: this.lon,
            //     lat: this.lat
            // });


            //通过mutations告诉store
            this.modifyLon(this.lon);
            this.modifyLat(this.lat);
        }
    }
}
</script>

<style>

</style>
