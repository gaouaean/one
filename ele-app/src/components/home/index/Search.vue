<template>
<div class="search" :class="{active: isActive}">
    <div class="text">搜索商家、商品名称</div>
</div>
</template>

<script>
export default {
    name: 'search-bar',
    props: {
        isActive: Boolean
    }
}
</script>

<style scoped>
.search{
    padding: .05rem .12rem;
    width: 100%;
    height: .4rem;
    box-sizing: border-box;
    background: linear-gradient(90deg,#0af,#0085ff);
}
.search.active{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
}
.search .text{
    background: #fff;
    color: #999;
    font-size: .12rem;
    text-align: center;
    line-height: .3rem;
    height: .3rem;
    width: 100%;
}
</style>

