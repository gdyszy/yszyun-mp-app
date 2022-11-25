const NODE_ENV = 'prod';
//apiUrl api 地址
const apiUrl = 'https://b312a12c-6467-405d-8da3-50d34d78ec89.bspapp.com'
const  webUrl  = 'https://unimp.yszyun.com/app'
const BASE_URL = { //请求URL
	prod: apiUrl+'/cliApplets'
}


const config = {
	baseUrl: BASE_URL[NODE_ENV],
	apiUrl:apiUrl,
	webUrl:webUrl,
	imageUrl: '',
	isEncry: false, //是否加密请求
	storeKeys: { //缓存通用keys
		userId: 'userId'
	},
	baseHeaders: { //headers基础配置都放在这下面
		'content-type': 'application/json',
		// 'content-type': 'application/x-www-form-urlencoded'
	}
}
export default config
