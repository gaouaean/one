<template>
<page pageId="home">
<h1>首页</h1>
<h2>{{word}}</h2>
<p>经度为：{{$store.state.longitude}}</p>
<p>纬度为：{{$store.state.latitude}}</p>
<p>总和为：{{$store.getters.count}}</p>

<input type="text" v-model="text"/>

</page>
</template>

<script>
import Page from '../../common/Page.vue'
export default {
    components: {
        [Page.name]: Page
    },
    data(){
        console.log(this.$store.state);
        return {
            word: 'hello vuex',
            text: ''
        }
    }
}
</script>

<style>

</style>
