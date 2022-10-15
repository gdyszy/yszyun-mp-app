/**
 * 登录Api
 */
import commHttpRequest from '@/utils/commHttpRequest.js';
import constant from '@/utils/constant.js';

//登录ApI基础的路径
const BASE_API_URL = '/api/cli/user/';

// 登录
const login = async function(params) {
	const url = BASE_API_URL + 'login';
	return commHttpRequest.commHttpRequest(url, params);
}

// 注册
const register = async function(params) {
	const url = BASE_API_URL + 'register';
	return commHttpRequest.commHttpRequest(url, params);
}

// 发送重置密码验证码
const resetCode = async function(mobile) {
	const url = BASE_API_URL + 'send-reset-passwd-code';
	return commHttpRequest.commHttpRequest(url, {
		mobile: mobile
	}, constant.reqMethod.POST, constant.formHeaders);
}
// 重置密码
const resetPwd = async function(data) {
	const url = BASE_API_URL + 'reset-passwd';
	return commHttpRequest.commHttpRequest(url, {
		mobile: data.mobile,
		verifCode: data.verifCode
	});
}

// 修改密码
const changePwd = async function(params) {
	const url = BASE_API_URL + 'change-passwd';
	return commHttpRequest.commHttpRequest(url, params);
}
export default {
	login,
	register,
	resetCode,
	resetPwd,
	changePwd
}
