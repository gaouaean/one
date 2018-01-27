<template>
	<div class='FoodList '>
		<app-header title='为你推荐' @goBack=BackAction></app-header>
		<page pageId='foodList' class='main' :canLoadMore='true' ref='page'
			@load-more-action='handleMore'>
			<div class='food-list'>
				<router-link class='food' v-for='(item,index) in dataList'  :to='"/home/detail/"+item.id+"/"+index'>
					<img :src='item.img' />
					<p>{{item.name}}</p>
					<p><span>月售{{item.sales}}份</span>&nbsp;&nbsp;<span>好评率{{item.percent}}%</span></p>
					<p>￥{{item.price}}</p>
					<div class='shop-name'>
						<p>{{item.restaurant_name}}</p>
					</div>
				</router-link>	
			</div>
		</page>
	</div>
		
	
</template>

<script>
	import AppHeader from '../../common/AppHeader.vue'
	import {getSellerList} from '../../server/DiscoverService'
	import Vuex from 'vuex'
	import Page from '../../common/Page.vue'
	export default {
		data(){
			return{
				dataList:[],
				limit:20,
				
			}
		},
		components:{
			[AppHeader.name]:AppHeader,
			[Page.name]:Page,
		},
		computed:{
			...Vuex.mapState({
				lat:state=>state.location.lat,
				lon:state=>state.location.lon,
			}),
			offset(){
				return this.dataList.length
			}
		},
		methods:{
			BackAction(){
				this.$router.back();
			},
			requestData(callback){
				getSellerList(this.lat,this.lon,this.offset,this.limit)
				.then(result=>{
					console.log(result);
					this.dataList = this.dataList.concat(result);
					if(callback){
						callback();
					}
				})
			},
			pageRefresh(){
				this.$refs.page.refresh();
			},
			handleMore(){
				this.requestData(()=>{
					this.$refs.page.endLoadMoreAni()
				})
			}
		},
		mounted(){
			//初始化请求
			if(this.lat && this.lon){
				this.requestData();
			}
			//监听纬度变化
			this.$watch('lat',()=>{
				if(this.lat && this.lon){
					//发送当前地址请求
					this.requestData();
				}
			})
		}
	}
</script>

<style scoped>
	.FoodList{
		position:absolute;
		top:0;
		right:0;
		left:0;
		bottom:0;
		background:#F7F7F7;;
		z-index:6;	
	}
	.main{
		position:absolute;
		top:.44rem;
		bottom:0;
	}
	.food-list{
		overflow:hidden;
		padding:0 .05rem;
		background:#fff;
	}
	.food-list .food{
		float:left;
		background:#fff;
		width:1.45rem;
		height:2.25rem;
		margin:0.05rem;
		border:1px solid #E8E8E8;
		box-sizing: border-box;
	}
	.food-list .food img{
		width:1.46rem;
		height:1.46rem;
	}
	.food-list .food p{
		margin-left:0.05rem;
	}
	.food-list .food p:nth-of-type(1){
		width:1.31rem;
		height:.2rem;
		font-size:.14rem;
		line-height:.2rem;
		color:#333;
		font-weight:700;
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
	}
	.food-list .food p:nth-of-type(2){
		line-height:.12rem;
		color:#999;
		font-size:.12rem;
		transform:scale(.8);
		position:relative;
		left:-.12rem;
	}
	.food-list .food p:nth-of-type(3){
		font-size:.16rem;
		color:#ff6000;
	}
	.food-list .food .shop-name{
		width:100%;
		overflow:hidden;
		position:relative;;		
	}
	.food-list .food .shop-name:before{
		content:'';
		display:block;
		height:1px;
		width:100%;
		border:1px solid #E8E8E8;
		position:absolute;
		top:-1px;
		transform:scaleY(.3);
		z-index:5;
		
	}
	.food-list .food .shop-name p{
		font-size:.12rem;
		width:100%;
		font-weight:100;
		transform:scale(.8);
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow:hidden;
		color:#999;
		line-height:.25rem;
	}
</style>