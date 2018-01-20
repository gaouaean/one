<template>
	<nav class='tabs'>
		<router-link class='tab' v-for='(item,index) in dataList' :key='index' :to='item.path'>
			<i class='iconfont' v-if='index==0' style='font-size:.3rem;'>&#xe722;</i>
			<i class='iconfont' v-else-if='index==1' style='font-size:.16rem;font-weight:bolder'>&#xe612;</i>
			<i class='iconfont' v-else-if='index==2' style='font-size:.16rem;font-weight:bolder'>&#xe606;</i>
			<i class='iconfont' v-else-if='index==3' style='font-size:.15rem;font-weight:bolder'>&#xe621;</i>
			{{item.title}}
		</router-link>
	</nav>
</template>

<script>
	export default {
		name:'tabs',
		data(){
			return {
				dataList:[
					{title:'首页', path:'/home'},
					{title:'发现', path:'/discover'},
					{title:'订单', path:'/order'},
					{title:'我的', path:'/mine'},
				]
			}
		}
	}
</script>
 
<style scoped>
	.tabs{
		position:absolute;
		bottom:0;
		left:0;
		height:49px;
		line-height:18px;
		display:flex;
		width:100%;
	}
	.tabs .tab {
		flex:1;
		text-align:center;
		color:#8e8e93;
		background:#fff;
		display:flex;
		font-size:15px;
		flex-direction: column;
		justify-content: center;
		align-items:center;
	}
	.tabs:before{
		content:'';
		position:absolute;
		display:block;
		height:1px;
		width:100%;
		top:-1px;
		left:0;
		border-top:1px solid #999;
		transform:scaleY(0.5);
		z-index:1;
	}
	.tabs .tab.router-link-active{
		color:#0089dc;
	}
</style>