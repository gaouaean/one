<template>
	<div class=' page subpage' :id='pageId'>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props:{
			pageId:String,
		},
		name:'sub-page'
	}
</script>

<style>
	.page.subpage{
		position:absolute;
		width:100%;
		top:0;
		left:0;
		bottom:0;
		background:#fff;
		z-index:5;
	}
</style>