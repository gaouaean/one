/*
 首页轮播图接口
 参数:
 latitude:维度
 longitude:经度
 templates[]...
 * */

const IMAGE_HOST='https://fuss10.elemecdn.com/';
const BANNER_URL='/restapi/shopping/openapi/entries';
/*
首页推荐商家请求接口
参数：
?latitude=22.54286
&longitude=114.059563
&offset=0
&limit=12
&extras[]=activities   tags
&extra_filters=home
&rank_id=984553df2830414c9058eaff4b63bbaa
&terminal=h5
*/
const SELLER_URL='/restapi/shopping/v3/restaurants';

export default {
	IMAGE_HOST,
	BANNER_URL,
	SELLER_URL
}
