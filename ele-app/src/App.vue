<template>
  <div id="app">
    <keep-alive>
    	<router-view></router-view>
   	</keep-alive>
   <tabs></tabs>
  </div>
</template>

<script>
	import Tabs from './common/Tabs.vue'
export default {
  components:{
  	[Tabs.name]:Tabs
  }
}
</script>

<style>
#app,html,body{
  font-family:  'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
  font-size:0.16rem;
	width:100%;
	height:100%;
	touch-action:none;
}
.swiper-pagination-bullet{
		width: 4px;
	  height: 4px;
	  display: inline-block;
	  border-radius: 100%;
	  background: #000;
	  opacity: .2;
	}
	.swiper-pagination-bullet-active{
		opacity: .6;
    background: #000;
	}
</style>
