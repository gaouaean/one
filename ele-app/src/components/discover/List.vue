<template>
	<!--为你推荐-->
		<div class='foodsList'>
			<div class='showlist-title'>推荐商家</div>
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
				<div class='see-more' @click=goFoodList()>
					查看更多&gt;
				</div>
				</div>
			</div>
		</div>
</template>

<script>
	import {getSellerList} from '../../server/DiscoverService'
	import Vuex from 'vuex'
	
	export default {
		name:'Discover-list',
		data(){
			return{
				dataList:[],
				limit:6,
			}
		},
		computed:{
			...Vuex.mapState({
				lon:state=>state.location.lon,
				lat:state=>state.location.lat,
			}),
			offset(){
				return this.dataList.length
			}
		},
		methods:{
			requestData(){
				getSellerList(this.lat,this.lon,this.offset,this.limit)
				.then(result=>{
//					console.log(result);
					this.dataList = result
				})
			},
			goFoodList(){
				this.$router.push('/discover/food')
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
	.showlist-title{
		height:0.32rem;
		line-height:0.32rem;
		font-size:.14rem;
		color:#000;
		text-align:center;
		display:flex;
		align-items:center;
		justify-content: center;
		background:#fff; 
	}
	.showlist-title:before{
		content:'';
		display:block;
		height:.01rem;
		width:.15rem;
		background:#999;
		margin-right:.1rem;
	}
	.showlist-title:after{
		content:'';
		display:block;
		height:.01rem;
		width:.15rem;
		background:#999;
		margin-left:.1rem;
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
	.food-list .see-more{
		width:100%;
		height:.28rem;
		text-align:center;
		line-height:.15rem;
		font-size:.12rem;
		background:#fff;
		color:#999;
		float:left;
		margin-top:.1rem;
	}
</style>