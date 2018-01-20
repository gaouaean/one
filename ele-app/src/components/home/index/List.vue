<template>
	<div class='list'>
		<div class='showlist-title'>推荐商家</div>
		<ul class='showlists'>
				<div class='showlist' v-for='(item,index) in dataList'  :key='index' >
					<!--:to='"/home/detail/"+item+"/"+index'-->
					<router-link class='logo' :to='"/home/detail/"+item+"/"+index'>
						<img :src='item.img' />
					</router-link>
					<div class='info'>
						<router-link class='info-top' :to='"/home/detail/"+item+"/"+index'>
							<p class='p p1' >
								<span class='s2'>{{item.name}}</span>
								<span class='advert' v-show='item.recommend.is_ad==true && item.recommend.reason'>
									{{item.recommend.reason}}
								</span>
								<span class='ticket' v-for='tit in item.ticket'>{{tit.icon_name}}</span>
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
					<!--111-->
				</div>
		</ul>
	</div>
</template>

<script>

	import {getListData} from '../../../server/HomeService'
	import CharterIcon from '../../../common/CharterIcon'
	
	
	export default {
		name:'home-list',
		data(){
			return {
				dataList:[],//列表请求的数据源
				limit:12,//一次请求的数据长度
			}
		},
		components:{
			[CharterIcon.name]:CharterIcon,
			
		},
		computed:{
			offset(){
				//告诉后台从哪里开始请求下一条数据
				return this.dataList.length
			}
		},
		methods:{
			requestData(callback){
				getListData(22.54286,114.059563,this.offset,this.limit)
				.then((result)=>{
					//第一次进入需要加载第一页数据
	                //触发滚动视图的加载更多，加载下一页数据
	                console.log(result);
	                this.dataList = this.dataList.concat(result);
					this.$nextTick(()=>{
						//请求完成,执行停止加载更多的动画
						if(callback){
							callback();
						}
					})
				})
			},
			//列表展开查看活动的事件
			showAction(index){
				this.dataList[index].isShow = !this.dataList[index].isShow;
				//更新滚动视图
				this.$nextTick(()=>{
					//告诉home组件更新滚动
					this.$emit('list-change');
				})
			}
		},
		created(){
//			this.$event.$on('modify-index',(obj)=>{
//				console.log(obj)
//				console.log(obj.item)
//				this.dataList.splice(obj.index,1,obj.item);
//			})
		},
		mounted(){
			this.requestData();
		}
	}
</script>

<style>
	.showlist-title{
		height:0.32rem;
		line-height:0.32rem;
		font-size:.14rem;
		color:#000;
		text-align:center;
		display:flex;
		align-items:center;
		justify-content: center; 
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
	.showlists .showlist .info .p.p1{
		
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