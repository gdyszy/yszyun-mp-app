import commHttpRequest from '@/utils/commHttpRequest.js';
import constant from '@/utils/constant.js';
//ApI基础的路径
const BASE_API_URL = '/myapplet/';
//获取我的小程序列表
const getMyAppletList = async function(params = {}) {
	//添加应用ID
	params.appId = uni.getAppBaseInfo().appId
	const url = BASE_API_URL + 'getList';
	return commHttpRequest.commHttpRequest(url, params, '', '', '', '', false);
}
//保存
const saveApplet = async function(params) {
	const url = BASE_API_URL + 'save';
	const reqParams = {
		sys_applet_ids: params
	}
	return commHttpRequest.commHttpRequest(url, reqParams);
}

export default {
	getMyAppletList,
	saveApplet
}
