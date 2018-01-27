<template>
	<sub-page pageId='address' >
		<app-header title='选择收货地址' @goBack='goBackAction()'></app-header>
 	
 		<div class='search'><input type='search' placeholder='请输入地址' v-model='keyword' /></div>
 		
 		<div class='current-address' v-show="!isSearch">
 			当前地址
 			<p class='current'>{{this.$store.state.location.address}}</p>
 		</div>
 		
 		
 		<div class='wrapper' ref='subPage'>
	 		<ul v-show='isSearch' class='address-list'>
	 			<li class='address-item one-bottom-px' v-for='(item,index) in addressList ' :key='index'
	 				@click='selectAction(index)'>
	 				<h4>{{item.name}}</h4>
	 				<p>{{item.address}}</p>
	 			</li>
	 		</ul>
 		
 		</div>
	</sub-page>
	
</template>

<script>
	import SubPage from '../../common/SubPage.vue'
	import appHeader from '../../common/AppHeader.vue'
	import {searchAddressList} from '../../server/HomeService'
	import Vuex from 'vuex'
//	import IScroll from 'iscroll'
	export default {
		components:{
			[SubPage.name]:SubPage,
			[appHeader.name]:appHeader
		},
		data(){
			return {
				keyword:'',
				isSearch:false,
				//装载地址的数据源
				addressList:[],
				limit:20
			}
		},
		computed:{
			...Vuex.mapState({
				lon:state=>state.location.lon,
				lat:state=>state.location.lat
			}),
			offset(){
				return this.addressList.length;
			},
		},
		watch:{
			keyword(){
				//用户在500ms内没有输入内容,才发请求
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					if(this.keyword){
						this.requestData();
						this.isSearch = true;
					}else{
						this.isSearch = false;
					}
				},500);
			}
		},
		methods:{
			goBackAction(){
				this.$router.back();
			},
			//搜索地址请求事件
			requestData(){
				searchAddressList(
					this.keyword,
					this.offset,
					this.limit,
					this.lat,
					this.lon
				).then(result=>{
					this.addressList = result;
				})
			},
			//选择地址的事件
			selectAction(index){
				console.log(this.addressList[index]);
				//修改全局的地址相关状态
				this.$store.dispatch('location/modifyLocationAction',{
					lon:this.addressList[index].lon,
					lat:this.addressList[index].lat,
					address:this.addressList[index].name
				});
				//返回上一页
				this.goBackAction();
				//返回地址
				this.$event.$emit('address',this.addressList[index].name)
			},
			//页面刷新滚动
			pageRefresh(){
				console.log('要滚动了')
				this.Addscroll.refresh();
			},
		},
		mounted(){
			this.Addscroll = new IScroll(this.$refs.subPage,{
				bounce:true,
				probeType:3,
			});
			//让页面可以滚动
			this.Addscroll.on('scrollStart',this.pageRefresh)
		}
	}
</script>

<style scoped> 
	.search{
		width:100%;
		height:.5rem;
		background:#fff;
		overflow:hidden;
	}
	input[type=search]{
		display:block;
		width:2.9rem;
		height:.3rem;
		margin:.1rem auto;
		background:#F4F4F4;
		border:0;
		color:#444;
		padding: 0 0.1rem 0 .3rem;
		outline:none;
	}
	/*::-webkit-input-placeholder{
		padding-left:.2rem;
	}*/
	.current-address{
		line-height:.4rem;
		font-size:.12rem;
		text-indent:2em;
		color:#666;
	}
	.current-address .current{
		width:100%;
		height:.4rem;
		background:#fff;
		font-weight:bold;
		font-size:.15rem;
		color:#333;
	}
	.wrapper{
		width:100%;
		overflow:hidden;
		width:100%;
		position:absolute;
		left:0;
		top:.94rem;
		bottom:0;
	}
	.address-item {
		width:100%;
		height:.5rem;
		background:#fff;
		padding:.1rem .15rem;
		box-sizing:border-box;
	}
	.address-item h4{
		line-height:.15rem;
		font-size:.15rem;
		color:#2a2a2a;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.address-item p{
		line-height:.15rem;
		font-size:.12rem;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
</style>