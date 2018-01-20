<template>
	<div class='page' :id='pageId' ref='page'>
		<div class='wrapper'>
			<slot></slot>
			<!--显示上拉加载更多-->
			<div v-if='canLoadMore' class='load-more' :class='{down:isDown==1}'>
				<img :src='imgPath' />
				<span>{{downInfo}}...</span>
			</div>
		</div>
	</div>
</template>

<script>
//	import IScroll from 'iscroll'

	const NO_TRIGGER = 0;
	const TRIGGER = 1;
	const ACTIVE =2;
	export default {
		name:'page',
		props:{
			pageId:String,
			canLoadMore:Boolean,//是否需要加载更多的功能
		},
		data(){
			return{
				isDown:NO_TRIGGER,//0没有触发加载更多  1触发加载更多 2正在加载更多
				downInfo:'上拉加载更多',
				imgPath:'/static/img/arrow.png'
			}
		},
		methods:{
			//页面刷新滚动
			pageRefresh(){
				console.log('要滚动了')
				this.scroll.refresh();
			},
			endLoadMoreAni(){
				this.isDown=NO_TRIGGER,
				this.downInfo='上拉加载更多',
				this.imgPath='/static/img/arrow.png'
			}
		},
		mounted(){
			this.scroll = new IScroll(this.$refs.page,{
				bounce:true,
				probeType:3,
			});
			//让页面可以滚动
			this.scroll.on('scrollStart',this.pageRefresh)
			if(this.canLoadMore){
				//上拉加载更多,加载距离为40
				this.scroll.on('scroll',()=>{
				if(this.isDown != ACTIVE){
					let maxScrollY = this.scroll.maxScrollY;
					let y = this.scroll.y;
					//显示上啦加载更多 maxScrollY < y <maxScrollY + 40
//					console.log(maxScrollY,y)
					if(y>maxScrollY){
						this.downInfo = '上拉可以加载更多';
						this.isDown = NO_TRIGGER;
					}
					//显示:释放立即加载更多 y<maxScrillY
					else if(y<maxScrollY){
						this.downInfo = '释放立即加载更多';
						this.isDown = TRIGGER;
					}
				}
				});
				
				this.scroll.on('scrollEnd',()=>{
					if(this.isDown != ACTIVE){
						//srcoll没有正在加载更多是,才进行判断
						let maxScrollY = this.scroll.maxScrollY;
						let y = this.scroll.y;
						//判断是否达到加载更多的条件
						//maxScrollY <  y <maxScrollY+40没有达到加载更多的条件
						if(y>maxScrollY && y<maxScrollY+40){
							this.scroll.scrollTo(0,maxScrollY+40,200);
						}
						else if(y==maxScrollY){
							this.imgPath='/static/img/ajax-loader.gif';
							this.downInfo='正在加载更多';
							this.isDown=ACTIVE;
							this.$emit('load-more-action')
						}
					}
				})
			}
			//home组件需要监听滚动的设置
			this.scroll.on('scroll',()=>{
				this.$emit('page-scroll',this.scroll.y);
			})
		}
	}
</script>

<style>
	.page{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:49px;
		overflow:hidden;
	}
	.page .load-more{
		width:100%;
		height:0.4rem;
		background:#00AAFF;
		background: palegreen;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	.page .load-more img{
		width:0.15rem;
		height:0.15rem;
		transition:.2s transform;
	}
	.page .load-more span{
		font-size:.12rem;
		color:#333;
	}
	.page .load-more.down img{
		transform:rotate(180deg);
	}
</style>