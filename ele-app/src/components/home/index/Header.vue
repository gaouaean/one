<template>
	<header class='header'>
		<p>深圳市福田区</p>
		<div class='box'>搜索商家、商品名称</div>
	</header>
</template>

<script>
	export default{
		name:'home-header',
	}
</script>

<style scoped>
	.header{
		width:100%;
		height:0.9rem;
		line-height:0.3rem;
		color:#fff;
		font-size:0.16rem;
		background:linear-gradient(90deg,#0af,#0085ff)
	}
	.header:after{
		width:100%;
		height:1px;
		position:absolute;
		bottom:-1px;
		left:0px;
		border-bottom:1px solid #999;
		transfrom:scaleY(0.5);
		z-index:1;
	}
	.box{
		width:90%;
		height:0.3rem;
		background:#fff;
		margin:0 0.16rem;
		text-align:center;
		line-height:0.3rem;
		color:#999;
		font-size:0.12rem;
	}
	p{
		padding:0.15rem 0 0.05rem 0.16rem;
	}
</style>