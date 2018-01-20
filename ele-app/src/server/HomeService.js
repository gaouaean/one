import Api from '../api'
import axios from 'axios'
import {handleImage} from '../util/handleImage'

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
//			console.log(response.data[0].entries)
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
			console.log(response);
			let result = response.data.items.map(item=>{
				return {
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
