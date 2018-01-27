<template>
	<div ref='banner' class="swiper-container banner">
    <div class="swiper-wrapper">
        <ul class="swiper-slide list"  v-for='data in bannerList'>
        	<router-link class='item' v-for='(item,index) in data' :key='index' 
        		:to='"/home/sellerlist/"+item.name+"/"+index'>
				<img :src='item.img' />
				<p>{{item.name}}</p>
			</router-link>
        </ul>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" v-show='bannerList.length>1'></div>
    </div>
	
	
	

</template>


<script>
	import {getBannerData} from '../../../server/HomeService'
	import Vuex from 'vuex'
	export default {
		name:'home-banner',
		data(){
			return {
				bannerList:[],
			}
		},
		computed:{
			...Vuex.mapState({
				lon:state=>state.location.lon,
				lat:state=>state.location.lat
			})
		},
		methods:{
			initData(){
				getBannerData(this.lat, this.lon, [
                'main_template',
                'favourable_template',
                'svip_template'
        	])
			.then(data=>{
//				console.log(data)
				this.bannerList = data;
				//banner数据更新,更新swiper
				this.$nextTick(()=>{
					this.bannerSwiper.update();
				})
			})
		}
		},
		mounted(){
			//创建一个swiper
			this.bannerSwiper = new Swiper(this.$refs.banner,{
				 pagination: {
					el: '.swiper-pagination',
				},
			});
			//请求数据
			if(this.lon && this.lat){
				this.initData();
			}
			//监听纬度变化
			this.$watch('lat',()=>{
				if(this.lon && this.lat){
					//发送当前地址请求
					this.initData();
				}
			})
		}
	}
</script>


<style scoped>
	.banner{
		width:100%;
		height:1.6rem;
		background:#fff;
	}
	p{
		font-size:0.12rem;
		color:#666;
	}
	.banner .list{
		width:100%;
		height:90%;
		overflow:hidden;
		display:flex;
		flex-wrap:wrap;
	}
	.banner .list .item{
		width:25%;
		height:50%;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.banner .list .item img{
		width:.35rem;
	}
</style> 