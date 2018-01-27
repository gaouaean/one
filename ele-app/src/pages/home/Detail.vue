<template>
	<sub-page  pageId='detail'>
		<div>
			<div class='recommend'  @click='goBackAction()'>
				<header class='app-header one-bottom-px'>
					<span class='left' >&lt;</span>
					<h1>{{id}}</h1>
				</header>
			</div>
			<!--主体-->
			<div class='main'>
				<nav ref='nav' class='nav'>
					<ul>
						<li v-for='(item,index) in dataList' class='one-bottom-px'><span>{{item.name}}</span></li>
					</ul>
				</nav>
				<div class='wrapper' ref='goodsList'>
					<div class='goodsList' >
						<div class='goodsKind' v-for='(item,index) in dataList'>
							<p class='one-bottom-px'><span>{{item.name}}</span><span><i>{{item.des}}</i></span></p>
							<div v-for='(data,index) in item.foods' class='goodDetail'>
								<div class='left'>
									<img :src='data.img' />
									<!--<chat-icon :name='data.icon_name' :color='data.icon_color' class='icon'></chat-icon>-->
								</div>
								<div class='info'>
									<p>{{data.name}}</p>	
									<p class='des' v-if='data.des'>{{data.des}}</p>
									<p class='des' v-else-if='data.name'>{{data.name}}</p>
									<p class='tip'>{{data.tips}}&nbsp;&nbsp;好评率{{data.satisfy_rate}}%</p>
								<!--	<p v-show='data.activity'>{{data.activity}}</p>-->
									<p class='price'>￥{{data.price}}<span v-show='data.original_price'>￥{{data.original_price}}</span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--结算-->
			<div class='footer'> 
			
			</div>
		</div>
	</sub-page>
</template>

<script>
	import AppHeader from '../../common/AppHeader.vue'
	import SubPage from '../../common/SubPage.vue'
	import {getSeller} from '../../server/HomeService.js'
//	import CharterIcon from '../../common/CharterIcon'
	export default {
		data(){
			return{
				id:this.$route.params.item,
				dataList:[]
			}
		},
		methods:{
			goBackAction(){
				this.$router.back();
			},
			requestData(){
				getSeller(this.id)
				.then(result=>{
					console.log(result);
					this.dataList = result;
				})
			},
			refreshData(){
				this.navIscroll.refresh();
			},
			refreshDa(){
				this.goodsIscroll.refresh();
			}
		},
		components:{
			[SubPage.name]:SubPage,
			[AppHeader.name]:AppHeader,
//			[CharterIcon.name]:CharterIcon
		},
		mounted(){
			this.requestData();
			//引入滚动
			this.navIscroll = new IScroll(this.$refs.nav,{
				bounce:true,
				probeType:3,
			})
			this.goodsIscroll = new IScroll(this.$refs.goodsList,{
				bounce:true,
				probeType:3,
			})
			this.navIscroll.on('scrollStart',this.refreshData);
			this.goodsIscroll.on('scrollStart',this.refreshDa)
		}
	}
</script>

<style scoped>
	
	.recommend{
		position:absolute;
		width:100%;
		height:2rem;
		background:darkred;
	}
	.app-header{
		width:100%;
		height:.44rem;
		background:linear-gradient(90deg,#0af,#0085ff);
	}
	.app-header .left{
		font-size:.25rem;
		position:absolute;
		left:.05rem;
		top:-.02rem;
		width:.4rem;
		height:.44rem;
		text-align:center;
		color:#fff;
		line-height:.44rem;
	}
	.app-header h1{
		line-height:.44rem;
		font-size:.16rem;
		text-align:center;
		font-weight:normal;
		color:#fff;
	}
	.main{
		position:absolute;
		top:2rem;
		left:0;
		right:0;
		bottom:.6rem;
	}
	.footer{
		position:absolute;
		bottom:0;
		left:0;
		width:100%;
		height:.6rem;
		background:#666;
	}
	.main{
		display:flex;
	}
	.main .nav{
		width:.65rem;
		background-color:#F0F0F0;
		font-size:.16rem;
		color:#333;
		overflow:hidden;
		
	}
	.main .nav ul li{
		width:100%;
	}
	.main .nav ul li span{
		display:block;
		width:.54rem;
		/*height:.4rem;*/
		/*text-indent:.5em;*/
		font-size:.12rem;
		line-height:.15rem;
		padding:.1rem .05rem;
		/*overflow:hidden;*/
	}
	.main .wrapper{
		flex:1;
		padding-left:0.08rem;
		overflow:hidden;
	}
	.main .wrapper .goodsKind>p{
		height:.25rem;
		line-height:.25rem;
	}
	.main .wrapper .goodsKind>p span:nth-of-type(1){
		font-size:.12rem;
		max-width:.54rem;
		height:100%;
		overflow:hidden;
		float:left;
		color:#666;
		font-weight:700;
	}
	.main .wrapper .goodsKind>p span:nth-of-type(2){
		float:left;
		width:1.8rem;
		height:.2rem;
		position:relative;;
	}
	.main .wrapper .goodsKind>p span:nth-of-type(2) i{
		font-style:normal;
		font-size:.12rem;
		transform:scale(.8);
		width:1.8rem;
		color:#999;
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow:hidden;
		position:absolute;
		left:0;
	}
	.main .wrapper .goodsKind .goodDetail{
		display:flex;
		padding:.1rem 0;
		box-sizing: border-box;
	}
	.goodDetail .left{
		position:relative;
	}
	.goodDetail img{
		width:.65rem;
		height:.65rem;
	}
	
	.goodDetail .info{
		flex:1;
		padding:0 .08rem;
	}
	.goodDetail .info p:nth-of-type(1){
		font-size:.13rem;
		color:#333;
		width:1.6rem;
		font-weight:700;
	}
	.goodDetail .info .des{
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
		width:2rem;
		font-size:.12rem;
		color:#999;
		transform:scale(.8);
		position:relative;
		left:-.2rem;
	}
	.goodDetail .info .tip{
		font-size:.12rem;
		color:#333;
		transform:scale(.8);
		position:relative;
		left:-.2rem;
	}
	.goodDetail .info .price{
		color:#f60;
		font-size:.12rem;
		font-weight:700;
	}
	.goodDetail .info .price span{
		display:inline-block;
		color:#666;
		transform:scale(.8);
		text-decoration:line-through;
		font-weight:100;
	}
	
</style>