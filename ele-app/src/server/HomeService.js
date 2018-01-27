import Api from '../api'
import axios from 'axios'
import {handleImage} from '../util/handleImage'

//轮播图请求
export function getBannerData(lat,lon,tmp){
	return new Promise((resolve,reject)=>{
		axios.get(Api.BANNER_URL,{
			params:{
				'latitude':lat,
				'longitude':lon,
				'templates':tmp
			}
		})
		.then((response)=>{
//			console.log(response)
			let newData = response.data[0].entries.map(item=>{
				return {
					name:item.name,
					img:handleImage(item.image_hash,100)
				}
			})
			let resultData = [];
			while(newData.length>0){
				resultData.push(newData.splice(0,8));
			}
			
			resolve(resultData);
		})
		.catch((error)=>{
			
		})
	})
}

//推荐商家请求
export function getListData(lat,lon,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get(Api.SELLER_URL,{
			params:{
				'latitude':lat,
				'longitude':lon,
				offset,
				limit,
				extras:['activities','tags'],
				extra_filters:'home',
				rank_id:'984553df2830414c9058eaff4b63bbaa',
				terminal:'h5'
			}
		})
		.then(response=>{
//			console.log(response);
			let result = response.data.items.map(item=>{
				return {
					recommend:{
						reason:item.restaurant.recommend.reason,
						img:handleImage(item.restaurant.recommend.image_hash,100),
						is_ad:item.restaurant.recommend.is_ad
					},
					id:item.restaurant.id,
					delivery:item.restaurant.delivery_mode,
					piecewise:item.restaurant.piecewise_agent_fee,
					name:item.restaurant.name,
					img:handleImage(item.restaurant.image_path,300),
					activities: item.restaurant.activities.map(act=>{
                        return {
                            icon_name: act.icon_name,
                            icon_color: act.icon_color,
                            description: act.description
                        }
                    }),
                    isShow: false,
                    rating: item.restaurant.rating,
                    recent_order_num: item.restaurant.recent_order_num,
              		ticket:item.restaurant.supports.map(item=>{
                    	return {
                    		icon_name:item.icon_name,
                    		icon_color:item.icon_color
						}
                    })
				}
			})
			resolve(result);
		})
		.catch((error)=>{
			
		})
	})
}


//定位地址请求
export function getLocation(lat,lon){
	
	return new Promise((resolve,reject)=>{
		axios.get(Api.LOCATION_URL,{
			params:{
				'latitude':lat,
				'longitude':lon
			}
		}).then(response=>{
//			console.log(response);
			resolve(response.data.name);
		})
		.catch((error)=>{
			
		})
	})
}

//地址搜索请求
export function searchAddressList(keyword,offset,limit,lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(Api.SEARCH_ADDRESS_URL,{
			params:{
				keyword,
				offset,
				limit,
				latitude:lat,
				longitude:lon,
			}
		})
		.then(response=>{
			console.log(response);
			let addresslist = response.data.map(item=>{
				return {
					name:item.name,
					lon:item.longitude,
					lat:item.latitude,
					address:item.address
				}
			})
			resolve(addresslist)
		})
	})
}

//轮播图后商家请求
export function getBannerList(lat,lon,keyword,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get(Api.SELLER_URL,{
			params:{
				latitude:lat,
				longitude:lon,
				keyword,
				offset,
				limit,
				extras:['activities','tags'],
				terminal:'h5',
				rank_id:'824d792273474d29957a5851cdbf1d0d',
				brand_ids:[],
				restaurant_category_ids:[245,246,247,270]
			}
		})
		.then(response=>{
//			console.log(response)
			let result = response.data.items.map(item=>{
				return {
					id:item.restaurant.id,
					recommend:{
						reason:item.restaurant.recommend.reason,
						img:handleImage(item.restaurant.recommend.image_hash,100),
						is_ad:item.restaurant.recommend.is_ad
					},
					delivery:item.restaurant.delivery_mode,
					piecewise:item.restaurant.piecewise_agent_fee,
					name:item.restaurant.name,
					img:handleImage(item.restaurant.image_path,300),
					activities: item.restaurant.activities.map(act=>{
                        return {
                            icon_name: act.icon_name,
                            icon_color: act.icon_color,
                            description: act.description
                        }
                    }),
                    isShow: false,
                    rating: item.restaurant.rating,
                    recent_order_num: item.restaurant.recent_order_num,
              		ticket:item.restaurant.supports.map(item=>{
                    	return {
                    		icon_name:item.icon_name,
                    		icon_color:item.icon_color
						}
                    })
				}
			})
			resolve(result);
		})
		.catch((error)=>{
			
		})
	})
}


//热门食物搜索
	export function hotSearchWord(lat,lon){
		return new Promise((resolve,reject)=>{
			axios.get(Api.HOT_SEARCH_WORD,{
				params:{
					latitude:lat,
					longitude:lon,
				}
			})
			.then(response=>{
//				console.log(response.data);
				let result = response.data.map(item=>{
					return {
						name:item.search_word,
					}
				})
				resolve(result);
			})
			.catch((error)=>{
				
			})
		})
	}

//食物搜索店铺请求
	export function searchFoodList(lat,lon,keyword,offset,limit){
		return new Promise((resolve,reject)=>{
			axios.get(Api.SEARCH_FOOD_URL,{
				params:{
					offset,
					limit,
					keyword,
					latitude:lat,
					longitude:lon,
					search_item_type:3,
					is_rewrite:1,
					extras:['activities','coupon'],
					terminal:'h5',
				}
			})
			.then(response=>{
				let arr=[];
				for(var i in response.data.inside){
					console.log(response.data.inside[i])
				let res = response.data.inside[i];
					arr.push(res);
				}

				if(arr[0].filter){
					let result = arr[0].restaurant_with_foods.map(item=>{
					return {
						id:item.restaurant.id,
						recommend:{
							reason:item.restaurant.recommend.reason,
							img:handleImage(item.restaurant.recommend.image_hash,100),
							is_ad:item.restaurant.recommend.is_ad
						},
						foods:item.foods.map(item=>{
							return {
								name:item.name,
								img:handleImage(item.image_path,1000),
								
							}
						}),
						isfood: false,
						delivery:item.restaurant.delivery_mode,
						piecewise:item.restaurant.piecewise_agent_fee,
						name:item.restaurant.name,
						img:handleImage(item.restaurant.image_path,300),
						activities: item.restaurant.activities.map(act=>{
	                        return {
	                            icon_name: act.icon_name,
	                            icon_color: act.icon_color,
	                            description: act.description
	                        }
	                    }),
	                    isShow: false,
	                    rating: item.restaurant.rating,
	                    recent_order_num: item.restaurant.recent_order_num,
	              		ticket:item.restaurant.supports.map(item=>{
	                    	return {
	                    		icon_name:item.icon_name,
	                    		icon_color:item.icon_color
							}
	                    })
					}
				})
					resolve(result);
				}

				
			})
			.catch((error)=>{
			
			})
		})
		
	}

//商家请求
	export function getSeller(id){
		return new Promise((resolve,reject)=>{
			axios.get(Api.SELLER_SHOPLIST,{
				params:{
					restaurant_id:id,
				}
			})
			.then(response=>{
				console.log(response);
				let result = response.data.map(item=>{
					return {
						des:item.description,
						foods:item.foods.map(item=>{
							return {
								name:item.name,
								des:item.description,
								img:handleImage(item.image_path,600),
								tips:item.tips.split(' ')[1],
								original_price:parseInt(item.specfoods[0].original_price),
								price:item.specfoods[0].price,
								satisfy_rate:item.satisfy_rate,
//								icon:item.attributes.map(item=>{
//									return {
//										icon_name:item.icon_name,
//										icon_color:item.icon_color,		
//									}
//								})
							}
						}),
						name:item.name,
					}
				})
				resolve(result);
			})
			.catch((error)=>{
				
			})
		})
	}
