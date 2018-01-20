<template>
	<span class='icon':style="{background:'#'+color}"  >
		{{name}}
	</span>
</template>

<script>
	export default {
		name:'chat-icon',
		props:{
			name:String,
			color:String,
		}
	}
</script>

<style scoped>
	.icon{
		color:#fff;
		width:0.12rem;
		display:inline-block;
		font-size:0.12rem;
		line-height:0.12rem;
		padding:0.02rem;
		border-radius:0.02rem;
		text-align:center;
		margin-right:0.04rem;
	}
</style>