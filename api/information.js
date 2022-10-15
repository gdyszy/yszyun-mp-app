import commHttpRequest from '@/utils/commHttpRequest.js';
import constant from '@/utils/constant.js';
//api基础的路径
const BASE_API_URL = '/api/cli/information';

const getConsultList = async function(pages) {
	const url = BASE_API_URL + '/list';
	return commHttpRequest.commHttpRequest(url, pages, constant.reqMethod.GET);
}
const getConsultDetail = async function(id) {
	const url = BASE_API_URL;
	return commHttpRequest.commHttpRequest(url, {
		id
	}, constant.reqMethod.GET);
}

export default {
	getConsultList,
	getConsultDetail
}
