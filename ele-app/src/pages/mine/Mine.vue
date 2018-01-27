<template>
	<page pageId='mine'>
		<app-header title='我的' @goBack='goBackAction()'></app-header>
		<section class='user'>
			<div class='left'>
				<img src='../../../static/img/star.png'>
			</div>
			<div class='right'>
				<a href='javascript:void(0)'>登录</a>/<a href='javascript:void(0)'>注册</a>
				<p>登录后享受更多特权</p>
			</div>
		</section>
		<div class='nav'>
			<a href='javascript:void(0)'><img src='../../../static/img/star.png'>红包</a>
			<a href='javascript:void(0)'><img src='../../../static/img/star.png'>金币</a>
		</div>
		<a class='address' href='javascript:void(0)'><i class='l'>1</i><span>我的地址</span></a>
		<div class='money'>
			<a href='javascript:void(0)'><i class='l'>1</i><span class='one-bottom-px'>金币商城</span></a>
			<a href='javascript:void(0)'><i class='l'>1</i><span>分享拿5元现金</span></a>
		</div>
		<div class='service'>
			<a href='javascript:void(0)'><i class='l'>1</i><span class='one-bottom-px'>我的客服</span></a>
			<a href='javascript:void(0)'><i class='l'>1</i><span>下载饿了么APP</span></a>
		</div>
	</page>
</template>

<script>
	import AppHeader from '../../common/AppHeader.vue'
	import Page from '../../common/Page.vue'
	export default {
		components:{
			[AppHeader.name]:AppHeader,
			[Page.name]:Page,
		},
		methods:{
			goBackAction(){
				this.$router.push('/home')
			}
		}
	}
</script>

<style scoped>
	.user{
		width:100%;
		height:.9rem;
		background:linear-gradient(90deg,#0af,#0085ff);
		overflow:hidden;
		display:flex;
		align-items:center;
	}
	.user .left{
		width:.5rem;
		height:.5rem;
		background:#F1F1F1;
		border-radius:50%;
		line-height:.9rem;
		overflow:hidden;
		margin:.2rem;
	}
	.user .left img{
		width:.5rem;
		height:.5rem;
		background-size:cover;
	}
	.user .right{
		flex:1;
		color:#fff;
		font-size:.2rem;
		font-weight:bolder;
	}
	.user .right a{
		color:#fff;
	}
	.user .right p{
		font-size:.12rem;
		font-weight:100;
	}
	.nav{
		width:100%;
		height:.7rem;
		display:flex;
		background:#fff;
		margin-bottom:.1rem;
	}
	.nav a{
		flex:1;
		display:flex;
		flex-direction: column;
		align-items:center;
		justify-content: center;
		position:relative;
	}
	.nav a img{
		display:block;
		width:.2rem;
		height:.2rem;
		border-radius:50%;
		background:#999;
		background-size:80%;
	}
	.nav a:nth-of-type(1):after{
		content:'';
		display:blcok;
		height:100%;
		width:1px;
		border-right:1px solid #999;
		position:absolute;
		top:0;
		right:-1px;
		transform:scaleX(.5);
		z-index:1;
	}
	.address{
		display:block;
		width:100%;
		height:.35rem;
		background:#fff;
		line-height:.35rem;
		margin-bottom:.1rem;
		display:flex;
	}
	.address .l{
		width:.15rem;
		height:.15rem;
		margin:0 .05rem 0 .15rem;
	}
	.address span{
		flex:1;
		font-size:.14rem;
	}
	.money{
		width:100%;
		height:.7rem;
		margin-bottom:.1rem;
		background:#fff;
	}
	.money a{
		display:block;
		width:100%;
		height:.35rem;
		background:#fff;
		line-height:.35rem;
		display:flex;
	}
	.money a .l{
		width:.15rem;
		height:.15rem;
		margin:0 .05rem 0 .15rem;
	}
	.money a span{
		flex:1;
		font-size:.14rem;
	}
	.service{
		width:100%;
		height:.7rem;
		margin-bottom:.1rem;
		background:#fff;
	}
	.service a{
		display:block;
		width:100%;
		height:.35rem;
		background:#fff;
		line-height:.35rem;
		display:flex;
	}
	.service a .l{
		width:.15rem;
		height:.15rem;
		margin:0 .05rem 0 .15rem;
	}
	.service a span{
		flex:1;
		font-size:.14rem;
	}
</style>