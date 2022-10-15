/**
 * 通用请求Api
 * @author zhengtan
 */

import baseConfig from '@/config/index.js';
import baseConstant from './constant.js'
import commHelper from "@/utils/commHelper.js"
const appSystemInfo = uni.getStorageSync("appSystemInfo")

/**
 * 防重复提交
 */
const preventResubmit = {
	api: '', // 请求地址
	isRequest: false, // 是否请求中
	urlHandle: function(url, params) {
		let paramsStr = ''
		if(params && Object.prototype.toString.call(params)==="[object Object]") {
			Object.keys(params).forEach(key => {
				paramsStr = `${paramsStr}&${key}=${params[key]}`
			})
		}
		return url + paramsStr
	},
	requestOver: function() { //请求完成
		this.isRequest = false
	},
	reSubmit: function(url) {
		// 是否重复提交
		if (this.api && this.api === url && this.isRequest) {
			return true
		}
		this.api = url
		this.isRequest = true
		return false
	}
}

/**
 * 通用请求
 * @param {Object} actionUrl 请求api
 * @param {Object} params 请求参数
 * @param {Object} reqMethod 请求方式，默认post
 * @param {Object} headers 请求头信息
 * @param {String} responseType 设置响应的数据类型，默认text，如果是数据流则设置arraybuffer
 * @param {Object} timeout  超时时间
 * @param {Object} loading  是否显示加载框，默认显示
 */
const commHttpRequest = async function(actionUrl, params, reqMethod, headers, responseType, timeout, loading = true){
	const reqUrl = actionUrl.indexOf('http') == 0 ? actionUrl : (baseConfig.baseUrl + actionUrl);
	params = params || {};
	//判断是否重复提交
	if (preventResubmit.reSubmit(preventResubmit.urlHandle(reqUrl, params))) {
		return
	}
	headers = headers || baseConfig.baseHeaders;
	reqMethod = reqMethod || baseConstant.reqMethod.POST;
	timeout = timeout || baseConstant.reqTimeOut;
	responseType = responseType || 'text';
	
	const token = uni.getStorageSync('Token');
	if (token){
		Object.assign(headers, {
			'ys-authorization': token
		})
	}
	if (loading){
		uni.showLoading({
			title: "加载中...",
			mask: false
		})
	}

	//传入uniID.createInstance 所需的参数 ---begin
	/* params['APPID'] = appSystemInfo.appId
	params['PLATFORM'] = appSystemInfo.platform
	params['LOCALE'] = uni.getLocale()
	params['deviceId'] = appSystemInfo.deviceId */
	//传入uniID.createInstance 所需的参数 ---end
	const company_eun =  uni.getStorageSync('company_eun')
	//console.log("company_eun:"+company_eun)
	params['company_eun'] = company_eun
	return new Promise((resolve, reject) => {
		uni.request({
			url: reqUrl,
			header: headers,
			method: reqMethod,
			data: params,
			dataType: 'json',
			responseType: responseType,
			timeout: timeout,
			success: res => {
				//console.log("commHttpRequest js res:",res)
				if (res.statusCode === 200){
					const resData = res.data;
					if (responseType === 'arraybuffer'){
						//统一处理图片流，转化成base64的图片
						return resolve(uni.arrayBufferToBase64(resData));
					}
					if (resData.code === 0){
						return resolve(resData);
					}
					if (loading){
						show_nativeUI_toast(resData.msg, 'warn');
					}
					//如果token过期则重新到登录界面
					if (resData.code === 30203){
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/login/loginNew"
							})
						}, 1000)
						
					}
				} else {
					if (loading){
						show_nativeUI_toast(res.data.message, 'warn');
					}
					//如果token过期则重新到登录界面
					if (res.data.code === 30203){
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/login/loginNew"
							})
						}, 1000)
					}
				}
			},
			fail: (err) => {
				if (loading){
					show_nativeUI_toast('当前网络不可用，请检查网络', 'warn')
				}
				reject(err)
			},
			complete: () => {
				preventResubmit.requestOver();
				if (loading) {
					uni.hideLoading();
				}
			}
		});
	})
}

export default {
	commHttpRequest
}