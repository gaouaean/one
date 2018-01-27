<template>
	<header class='header'>
		<p @click='addressAction()'>{{address}}</p>
		<router-link  to='/home/search' >
			<div class='box'>搜索商家、商品名称</div>	
		</router-link>
	</header>
</template>

<script>
	import Vuex from 'vuex'
	import {getLocation} from '../../../server/HomeService'
	export default{
		name:'home-header',
		data(){
			return{
				address:''
			}
		},
		computed:{
			...Vuex.mapState({
				lon:state=>state.location.lon,
				lat:state=>state.location.lat,
			})
		},
		methods:{
			requestData(){
				//发送当前地址请求
				getLocation(this.lat,this.lon)
				.then(result=>{
					this.address = result;
					this.$store.dispatch('location/modifyAddressAction',{
						address:this.address
					})
				})
			},
			addressAction(){
				this.$router.push('/home/address');
			},
//			foodAction(){
//				this.$router.push('/home/search')
//			}
		},
		mounted(){
			//初始化请求
			if(this.lat && this.lon){
				this.requestData();
			}
			//监听纬度的变化
//			this.$watch('lat',()=>{
//				if(this.lat && this.lon){
//					//发送当前地址请求
//					this.requestData();
//				}
//			})
			//取得变化的地址
			this.$event.$on('address',result=>{
				this.address = result;
			})
		}
	}
</script>

<style scoped>
	.header{
		width:100%;
		height:0.9rem;
		line-height:0.3rem;
		color:#fff;
		font-size:0.16rem;
		background:linear-gradient(90deg,#0af,#0085ff)
	}
	.header:after{
		width:100%;
		height:1px;
		position:absolute;
		bottom:-1px;
		left:0px;
		border-bottom:1px solid #999;
		transform:scaleY(0.5);
		z-index:1;
	}
	.box{
		width:90%;
		height:0.3rem;
		background:#fff;
		margin:0 0.16rem;
		text-align:center;
		line-height:0.3rem;
		color:#999;
		font-size:0.12rem;
	}
	p{
		padding:0.15rem 0 0.05rem 0.16rem;
		height:.5rem;
		color:#fff;
		box-sizing:border-box;
	}
</style>