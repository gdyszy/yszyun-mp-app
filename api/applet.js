import commHttpRequest from '@/utils/commHttpRequest.js';
import constant from '@/utils/constant.js';

//ApI基础的路径
const BASE_API_URL = '/applet/';
//获取小程序列表
const getAppletList = async function(pages = {}, name = '') {
	pages.name = name
	//添加应用ID
	pages.appId = uni.getAppBaseInfo().appId
	const url = BASE_API_URL + 'getList';
	return commHttpRequest.commHttpRequest(url, pages);
}
const seachAll = async function(params) {
	params.appId = uni.getAppBaseInfo().appId
	const url = BASE_API_URL + 'seachAll';
	return commHttpRequest.commHttpRequest(url, params);
}

const getById = async function(id, versionId) {
	const url = BASE_API_URL + 'getById';
	return commHttpRequest.commHttpRequest(url, {
		id, 
		versionId
	});
}

export default {
	getAppletList,
	seachAll,
	getById
}
