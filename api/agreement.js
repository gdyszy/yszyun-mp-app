import commHttpRequest from '@/utils/commHttpRequest.js';
import constant from '@/utils/constant.js';

//基础的路径
const BASE_API_URL = '/api/cli/agreement';
//获取协议
const agreementDetail = async function(pages = {}) {
	const url = BASE_API_URL;
	return commHttpRequest.commHttpRequest(url, pages, constant.reqMethod.GET);
}

export default {
	agreementDetail
}
