<template>
	<div>
		
	<page pageId='home' :canLoadMore='true' ref='page'
		@load-more-action='handleLoadMore'
		@page-scroll='handlePageScroll'>
		<home-header></home-header>
		<home-banner></home-banner>
		<div class='newuser-info'>
			<img src='https://fuss10.elemecdn.com/3/c8/45b2ec2855ed55d90c45bf9b07abbpng.png?imageMogr/format/webp/thumbnail/!710x178r/gravity/Center/crop/710x178/' />
		</div>
		<home-list  ref='list' @list-change='handleListChange'></home-list>
	</page>
	<div>
		
	</div>
	
	<!--上拉是,还需展示搜索框	-->
	<search-bar v-show='showSearchBar' :isActive='showSearchBar'></search-bar>
	
	<!--装载子页面-->
	<transition enter-active-class='slideInRight ani' leave-active-class='slideOutRight ani'> 
	<router-view></router-view>
	</transition>
	</div>
</template>

<script>
	
	import Page from '../../common/Page.vue'
	import Banner from '../../components/home/index/Banner.vue'
	import Search from '../../components/home/index/Search.vue'
	import Header from '../../components/home/index/Header.vue'
	import List from '../../components/home/index/List.vue'
	export default {
		
		components:{
			[Banner.name]:Banner,
			[Header.name]:Header,
			[List.name]:List,
			[Page.name]:Page,
			[Search.name]:Search,
		},
		data(){
			return{
				showSearchBar:false,
				showList:false,
			}
		},
		methods:{
			handleListChange(){
				this.$refs.page.pageRefresh();
			},
			handleLoadMore(){
				//让list请求下一页数据
				this.$refs.list.requestData(()=>{
					//请求完成,执行体制加载更多的动画
					this.$refs.page.endLoadMoreAni();
				});
				//如果请求完成,就刷新滚动视图
			},
			//根据页面滚动的位置.控制是否展示secrch-bar
			handlePageScroll(y){
//				console.log('y:'+y);
				if(y<-40){
					this.showSearchBar = true;
				}else{
					this.showSearchBar = false;
				}
			}
		}
	}
</script>

<style scoped>
	.ani{
	    animation-duration: 300ms;
	    animation-timing-function: ease-in;
	}
	.newuser-info{
	    width: 100%;
	    box-sizing: border-box;
	    padding:0 .05rem 0 .08rem;
	    border-radius:0.05rem;
	    padding-bottom:.12rem;
	    background:#fff;
	}
	.newuser-info img{
	    width: 100%;
	}
</style>