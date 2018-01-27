<template>
	<header class='app-header one-bottom-px'>
		<span class='left' @click='leftAction()'>&lt;</span>
		<h1>{{title}}</h1>
	</header>
</template>

<script>
	export default {
		name:'app-header',
		props:{
			title:String
		},
		methods:{
			leftAction(){
				this.$emit('goBack');
			}
		}
	}
</script>

<style scoped>
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
</style>