<template>
	<sub-page  pageId='detail'>
		<h1>详情页</h1>
		<input type='text' v-model='val'>
			<button @click='modifyback()'>修改并返回</button>
	</sub-page>
</template>

<script>
	import SubPage from '../../common/SubPage.vue'
	export default {
		data(){
			return{
				val:this.$route.params.item
			}
		},
		methods:{
			modifyback(){
				this.$event.$emit('modify-index',{
					item:this.val,
					index:this.$route.params.index
				})
				this.$router.back();
			}
		},
		components:{
			[SubPage.name]:SubPage
		
		},
		
	}
</script>

<style>
</style>