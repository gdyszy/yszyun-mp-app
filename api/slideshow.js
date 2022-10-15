import commHttpRequest from '@/utils/commHttpRequest.js';
import constant from '@/utils/constant.js';
//ApI基础的路径
const BASE_API_URL = '/api/cli/slideshow';
//获取轮播图
const getSwiperImageList = async function(pages) {
	const url = BASE_API_URL + '/list';
	return commHttpRequest.commHttpRequest(url, {}, constant.reqMethod.GET);
}


export default {
	getSwiperImageList
}
