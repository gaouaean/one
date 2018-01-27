<template>
	<div >
	<app-header title='发现' @goBack='goBackAction()'></app-header>
	<page pageId='discover' class='main'>
		
		<nav class='nav'>
			<a href='javascript:void(0)' class='gold'>
				<div class="content-wrapper">
					<p class="title" style="color: rgb(255, 153, 0);">
             			 金币商城
          			</p>
          			<p class="tips">
           		 		0元好物在这里
          			
          			</p>
				</div>
				<img class="icon" src="https://fuss10.elemecdn.com/8/38/9c9aea0e856149083d84af3444b78jpeg.jpeg?imageMogr/format/webp/">
			</a>
			<a href='javascript:void(0)' class='eat'>
				<div class="content-wrapper">
					<p class="title" style="color: rgb(245, 120, 93);">
              			必吃爆料
          			</p>
          			<p class="tips">
            			最夯外卖指南
          			</p>
				</div>
          		<img class="icon" src="https://fuss10.elemecdn.com/2/36/b784087aff96a97f4e5183d0d784fjpeg.jpeg?imageMogr/format/webp/">
			</a>
			<a href='javascript:void(0)' class='reward'>
				<div class="content-wrapper">
					<p class="title" style="color: rgb(27, 169, 225);">
              			推荐有奖
          			</p>
          			<p class="tips">
            			5元现金拿不停
          			</p>
				</div>
          		<img class="icon" src="https://fuss10.elemecdn.com/6/76/8d42eef97ff4c1c2b671085358541jpeg.jpeg?imageMogr/format/webp/">
			</a>
			<a href='javascript:void(0)' class='packet'>
				<div class="content-wrapper">
					<p class="title" style="color: rgb(232, 143, 40);">
              			百元红包
          			</p>
          			<p class="tips">
           				 兴业银行联名卡
          			</p>
				</div>
          		<img  class="icon" src="https://fuss10.elemecdn.com/3/cc/a45d2b9d7d09bbc49b40d4e626093jpeg.jpeg?imageMogr/format/webp/">
			</a>
			<a href='javascript:void(0)' class='pre'>
				<div class="content-wrapper">
					<p class="title" style="color: rgb(237, 102, 96);">
              			周边优惠
          			</p>
          			<p class="tips">
            			领取口碑好券
          			</p>
				</div>
          		<img  class="icon" src="https://fuss10.elemecdn.com/5/10/2351e989d4171479ba0d7b5c06053jpeg.jpeg?imageMogr/format/webp/">
			</a>
		</nav>
		<div class='banner'>
			<img src="https://fuss10.elemecdn.com/b/6d/656006edcd86033a1b32b23ddea37jpeg.jpeg?imageMogr/format/webp/">		
		</div>
		<Discover-list></Discover-list>
		
		
		
	</page>
	<!--装载子页面-->
		<transition enter-active-class='slideInRight ani' leave-active-class='slideOutRight ani'> 
		<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import List from '../../components/discover/List'
	import AppHeader from '../../common/AppHeader.vue'
	import Page from '../../common/Page.vue'
	export default {
		components:{
			[AppHeader.name]:AppHeader,
			[Page.name]:Page,
			[List.name]:List,
		},
		methods:{
			goBackAction(){
				this.$router.push('/home')
			},
		
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
	.main{
		position:absolute;
		top:.44rem;
	}
	.nav{
		width:100%;
		height:2rem;
		background:#fff;
	}
	.nav a{
		float:left;
		position:relative;
		width:1.6rem;
		height:0.675rem;
		margin:0 auto;
		box-sizing: border-box;		
		background:#fff;
	}
	.nav a:after{
		content:'';
		display:block;
		height:1px;
		width:100%;
		border-bottom:1px solid #999;
		position:absolute;
		bottom:-1px;
		left:0;
		transform:scaleY(.5);
		z-index:5;
	}
	.nav a:before{
		content:'';
		display:block;
		width:1px;
		height:100%;
		border-right:1px solid #999;
		position:absolute;
		right:-1px;
		transform:scaleX(.5);
		z-index:5;
	}
	.nav .gold{
		width:1.6rem;
		height:1.35rem;
	}
	.nav a .content-wrapper{
		height:100%;
		padding:.2rem 0 0 .1rem;
		box-sizing: border-box;
	}
	.nav a .content-wrapper .title{
		font-size:.16rem;
		margin-bottom:.02rem;
	}
	.nav a .content-wrapper .tips{
		font-size:.12rem;
		color:#999;
	}
	.nav a img{
		display:block;
		width:.4rem;
		height:.4rem;
		position:absolute;
		bottom:0.05rem;
		right:0.05rem;
	}
	.nav .gold img{
		width:.65rem;
		height:.65rem;
	}
	.banner{
		
		width:100%;
		height:.8rem;
		margin:.15rem 0;
	}
	.banner img{
		width:100%;
		height:100%;
	}
	
</style>