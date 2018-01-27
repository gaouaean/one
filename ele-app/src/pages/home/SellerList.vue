<template>
	<sub-page ref='subpage' pageId='sellerList'>
		<app-header :title='title' @goBack='goBackAction'></app-header>
		<ul class='nav one-bottom-px'>
			<li @click='searchAction'>
				综合排序
				<p v-show='isSearch'>
					<span class='one-top-px'>综合排序</span>
					<span>销量最高</span>
					<span>起送价最低</span>
					<span>配送最快</span>
				</p>
			</li>
			<li>距离最近</li>
			<li>会员领红包</li>
			<li>筛选</li>
		</ul>
		<div class='wrapper' ref='wrap'>
		<ul class='showlists'>
				<div class='showlist' v-for='(item,index) in dataList'  :key='index' >
					<!--:to='"/home/detail/"+item+"/"+index'-->
					<router-link class='logo' :to='"/home/detail/"+item.id+"/"+index'>
						<img :src='item.img' />
					</router-link>
					<div class='info'>
						<router-link class='info-top' :to='"/home/detail/"+item.id+"/"+index'>
							<p class='p p1' >
								<span class='s2'>{{item.name}}</span>
								<span class='advert' v-show='item.recommend.is_ad==true && item.recommend.reason'>
									{{item.recommend.reason}}
								</span>
								<span class='ticket' v-show='item.ticket'>票</span>
							</p>
							<p class='p p2'>
								<span class='sale'>
									<div class='stars'>
										<i class= 'iconfont'>
											&#xe61a;&#xe61a;&#xe61a;&#xe61a;&#xe61a;
										</i>
									</div>
									<div :style="'width:'+item.rating/5*.7+'rem'" class='stars active'>
										<i class='active iconfont'>
											&#xe61a;&#xe61a;&#xe61a;&#xe61a;&#xe61a;
										</i>
									</div>
									{{item.rating}}&nbsp;&nbsp;月售{{item.recent_order_num}}单
								</span>
								<span class='niao' v-show='item.delivery'>蜂鸟专送</span>
							</p>
							<p class='p p3'>￥{{item.piecewise.rules[0].price}}起送<span>|</span>{{item.piecewise.description}}</p>
							<p class='p p4' v-show='item.recommend.reason && item.recommend.is_ad==false'>
								<img v-color='item.recommend.color' :src='item.recommend.img'>
								{{item.recommend.reason}}
							</p>
						</router-link>
						<div class='activities'>
							<p class='act-list' v-for='(data,index) in item.activities' :key='index' v-if='index<2 || item.isShow'>
									<!--<span v-color='data.icon_color'>{{data.icon_name}}</span>-->
									<chat-icon :name='data.icon_name' :color='data.icon_color'></chat-icon>
									{{data.description}}
							</p>
							<span v-show='item.activities.length>2' class='btn' @click='showAction(index)'>{{item.activities.length}}个活动</span>
						</div>
					</div>
				</div>
				<!--显示上拉加载更多-->
			<div  class='load-more' :class='{down:isDown==1}'>
				<img :src='imgPath' />
				<span>{{downInfo}}...</span>
			</div>
			<div class='opacity' v-show='isSearch'></div>
		</ul>
		
		</div>
	</sub-page>
</template>

<script>
	import Vuex from 'vuex'
	import CharterIcon from '../../common/CharterIcon'
	import AppHeader from '../../common/AppHeader.vue'
	import SubPage from '../../common/SubPage.vue'
	import {getBannerList} from '../../server/HomeService'
	const NO_TRIGGER = 0;
	const TRIGGER = 1;
	const ACTIVE =2;
	export default {
		data(){
			return{
				title:this.$route.params.item,
				dataList:[],
				limit:8,
				isDown:NO_TRIGGER,//0没有触发加载更多  1触发加载更多 2正在加载更多
				downInfo:'上拉加载更多',
				imgPath:'/static/img/arrow.png',
				isSearch:false
			}
		},
		computed:{
			...Vuex.mapState({
				lat:state=>state.location.lat,
				lon:state=>state.location.lon
			}),
			offset(){
				return this.dataList.length;
			}
		},
		components:{
			[SubPage.name]:SubPage,
			[AppHeader.name]:AppHeader,
			[CharterIcon.name]:CharterIcon,
		},
		methods:{
			goBackAction(){
				this.$router.push('/home');
			},
			requestData(callback){
				getBannerList(this.lat,this.lon,this.title,this.offset,this.limit)
				.then(result=>{
					this.dataList = this.dataList.concat(result);
					if(callback){
						callback();
					}
				})
			},
			//页面刷新滚动
			pageRefresh(){
				console.log('要滚动了')
				this.scroll.refresh();
			},
			//列表展开查看活动的事件
			showAction(index){
				this.dataList[index].isShow = !this.dataList[index].isShow;
			},
			//结束滚动
			endLoadMoreAni(){
				this.isDown=NO_TRIGGER,
				this.downInfo='上拉加载更多',
				this.imgPath='/static/img/arrow.png'
			},
			//挑选
			searchAction(){
				this.isSearch = !this.isSearch
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
					//发送地址请求
					this.requestData(()=>{
						this.searchAction();
					});
				}
			})
			//添加滚动
			this.scroll = new IScroll(this.$refs.wrap,{
				bounce:true,
				probeType:3,
			})
			//让页面可以滚动
			this.scroll.on('scrollStart',this.pageRefresh);
			
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
							this.requestData(()=>{
								this.endLoadMoreAni();
							});
						}
					}
				})
		}
	}
</script>

<style scoped>
	.opacity{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:#333;
		opacity:.6;
		z-index:10;
	}
	.nav{
		width:100%;
		height:.36rem;
		line-height:.36rem;
		/*display:flex;
		justify-content: space-around;*/
		font-size:.12rem;
		color:#666;
		background:#fff;
	}
	.nav li {
		width:25%;
		float:left;
		text-align:center;
		
	}
	.nav li p{
		
	}
	.nav li p span{
		display:block;
		width:3.2rem;
		height:.36rem;
		text-align:left;
		text-indent:1.5em;
		background:#fff;
		z-index:20;
	}
	.nav li:nth-of-type(1){
		position:relative;
		z-index:11;
	}
	.nav li:nth-of-type(1):after{
		content:'';
		position:absolute;
		right:.03rem;
		top:0.18rem;
		display:inline-block;
		width:0;
		height:0;
		border:0.04rem solid #999;
		border-right:0.04rem solid transparent;
		border-left:0.04rem solid transparent;
		border-bottom:0.04rem solid transparent
	}
	.wrapper{
		position:absolute;
		width:100%;
		top:.8rem;
		left:0;
		bottom:0;
		overflow:hidden;
	}
	.showlists .showlist{
		padding:.08rem;
		width:100%;
		display:flex;
		box-sizing:border-box;
		background:#fff;
		position:relative;
	}
	.showlists .showlist:after{
		content:'';
		display:block;
		width:100%;
		height:1px;
		border-bottom:1px solid #F1F1F1;
		position:absolute;
		bottom:-1px;
		left:0;
		transform:scaleY(0.5);
		z-index:1;
	}
	.list{
		border-top:.06rem solid #F1F1F1;
	}
	.showlist .logo{
		width:.55rem;
	}
	.showlist .logo img{
		width:100%;
	}
	.showlist .info{
		flex:1;
		margin-left:0.1rem;
		font-size:0.15rem;
	}
	.showlist .info .activities .act-list{
		position:relative;
		left:0;
		font-size:0.12rem;
		line-height:0.24rem;
		color:#666;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		width:1.8rem;
		/*width:2.75rem;
		transform:scale(.8)*/
	}
	.showlist .info .activities{
		position:relative;
		padding-top:0.1rem;
	}
	.showlist .info .activities:before{
		content:'';
		display:block;
		border-top:1px dotted #999;
		width:100%;
		height:1px;
		position:absolute;
		top:-1px;
		transform:scaleY(0.5);
		z-index:1;
	}
	.btn{
		position:absolute;
		top:0.12rem;
		right:0.04rem;
		font-size:0.12rem;
		color:#999;
		padding-right:0.1rem;
	}
	.btn:after{
		content:'';
		position:absolute;
		right:0;
		top:0.06rem;
		display:inline-block;
		width:0;
		height:0;
		border:0.04rem solid #999;
		border-right:0.04rem solid transparent;
		border-left:0.04rem solid transparent;
		border-bottom:0.04rem solid transparent;
	}
	.showlists .showlist .info .info-top{
		margin-bottom:.05rem;
		display:block;
	}
	.showlists .showlist .info .p{
		height:.2rem;
		line-height:.2rem;
		font-size:.12rem;
		color:#666;
	}
	.showlists .showlist .info .p1 .s2{
		font-size:.16rem;
		color:#333;
		font-weight:600;
		display:inline-block;
		width:1.9rem;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;	
	}
	.showlists .showlist .info .p1 .advert{
		line-height:.18rem;
		width:0.4rem;
		text-align:center;
		border:.005rem solid #F1F1F1;
		transform:scale(0.6);
		position:absolute;
		right:.3rem;
		color:#9D9D9D
	}
	.showlists .showlist .info .p.p1 .ticket{
		margin-left:.18rem;
		border:0.005rem solid #F0F0F0;
		color:#888;
		padding:0.01rem;
		position:relative;
		top:-.05rem;
		
	}
	.showlists .showlist .info .p.p2{
		display:flex;
		padding-right:0.04rem;
		justify-content: space-between;
		align-items:center;
	}
	.showlists .showlist .info .p.p2 .sale{
		position:relative;
	} 
	.showlists .showlist .info .p.p2 .sale .stars{
		font-style:normal;
		margin-right:.01rem;
		display:inline-block;
	}
	.showlists .showlist .info .p.p2 .sale .stars i{
		font-size:.14rem;
		color:#999;
		
	}
	.showlists .showlist .info .p.p2 .sale .stars.active{
		
		position:absolute;
		left:0;
		width:.6rem;
		overflow:hidden;
	}
	.showlists .showlist .info .p.p2 .sale .stars.active i{
		color:orangered;
	}
	.showlists .showlist .info .p.p2 .niao{
		color:#fff;
		background:linear-gradient(90deg,#00AAFF,#2395FF);
		font-size:.12rem;
		width:.51rem;
		text-align:center;
		line-height:.15rem;
		height:.15rem;
		border-radius:0.03rem;
		transform:scale(0.8);
		
	}
	.showlists .showlist .info .p.p3 span{
		color:#999;
		margin:0 .05rem;
	}
	.showlists .showlist .info .p.p4{
		color:#e8470b;
	}
	.showlists .showlist .info .p.p4 img{
		width:.12rem;
		display:inline-block;
		margin-right:.03rem;
	}
</style>