<template>
	<page pageId='order'>
		<app-header title='订单' @goBack='goBackAction()'></app-header>
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

<style>
</style>