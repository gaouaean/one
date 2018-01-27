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

//请求地址的
//参数：
// latitude
//longitude
const LOCATION_URL = '/restapi/bgs/poi/reverse_geo_coding';

//地址搜索
const SEARCH_ADDRESS_URL = '/restapi/bgs/poi/search_poi_nearby';

//食物搜索
const SEARCH_FOOD_URL = '/restapi/shopping/v2/restaurants/search';

//热门食物搜索
const HOT_SEARCH_WORD = '/restapi/shopping/v3/hot_search_words';

//商家商品列表
const SELLER_SHOPLIST = '/restapi/shopping/v2/menu';

//发现页面的推荐食物
const DISCOVER_FOODS_URL = '/restapi/shopping/v1/find/recommendation';

export default {
	IMAGE_HOST,
	BANNER_URL,
	SELLER_URL,
	LOCATION_URL,
	SEARCH_ADDRESS_URL,
	SEARCH_FOOD_URL,
	HOT_SEARCH_WORD,
	SELLER_SHOPLIST,
	DISCOVER_FOODS_URL
}
