import Api from '../api'
import {handleImage} from '../util/handleImage'
import axios from 'axios'

export function getSellerList(lat,lon,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get(Api.DISCOVER_FOODS_URL,{
			params:{
				offset,
				limit,
				rank_id:'b77ec02abb2d4bfd9f3eb5479d8148c4',
				latitude:lat,
				longitude:lon,
			}
		})
		.then(response=>{
			console.log(response);
			let result = response.data.items.map(item=>{
				return {
					id:item.restaurant.id,
					name:item.food.name,
					img:handleImage(item.food.image_path,600),
					percent:item.food.satisfy_rate,
				 	price:item.food.price,
				 	restaurant_name:item.food.restaurant_name,
					sales:item.food.month_sales,	
				}
			})
			resolve(result);
		})
		.catch((error)=>{
			
		})
	})
}

















