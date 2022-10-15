/**
 * 基础通用帮助工具类
 * @auth zhengtan
 */
import baseConfig from '@/config/index.js';
import constant from './constant.js';
import commJsUtils from './commJsUtils.js';



/**
 * 跳转页面
 * @param {Object} params
 * @param {type} 1: navigateTo  2:redirectTo
 */
const jumpPage = function(params, type = 1) {
	let _url = params.url;
	delete params.url;

	let _options = '';
	for (let key in params) {
		let _value = params[key] ? (typeof params[key] == 'object' ? encodeURIComponent(JSON.stringify(params[
			key])) : encodeURIComponent(params[key])) : '';
		_options += (_options ? `&${key}=${_value}` : `?${key}=${_value}`);
	}
	_url += _options;

	if (type == 1) {
		uni.navigateTo({
			url: _url
		})
	} else if (type == 2) {
		uni.redirectTo({
			url: _url
		})
	}
}
/**
 * 回退页面
 * @param {Object} params {delta: 1}
 */
const navigateBack = function(params) {
	uni.navigateBack(params)
}

// 返回登录
const backLogin = function() {
	//返回登录
	if (!uni.getStorageSync('Token')) {
		jumpPage({
			url: "/pages/login/loginNew"
		})
		return;
	}
}

/**
 * 详情或者登录页
 * @param {String} id
 * @param {String} type
 * @param {String} collectId
 * @param {String} pageNum
 * @param {String} classId
 */
const jumpDetail = function(id, type, collectId, pageNum, classId) {
	//返回登录
	if (!uni.getStorageSync('Token')) {
		jumpPage({
			url: "/pages/login/login"
		})
	} else {
		jumpPage({
			url: '../imageDetails/imageDetails',
			id: id,
			type: type,
			collectId: collectId,
			pageNum: pageNum,
			classId: classId
		})
	}
}

/**
 * 弹出sheet
 * @param {Object} params
 */
const showActionSheet = function(params) {
	Object.assign(params, {
		itemColor: '#333'
	})
	uni.showActionSheet(params)
}

/**
 * 通用触发
 */
const commEmit = function(emitKey, emitParams = {}, timeout = 0) {
	setTimeout(() => {
		uni.$emit(emitKey, emitParams);
	}, timeout);
}

const commOffEmit = function(eimitKey, timeout = 500) {
	setTimeout(() => {
		uni.$off(eimitKey)
	}, timeout);
}


/**
 * 获取常用的分页对象
 */
const getCommPage = function() {
	return commJsUtils.parseCopyObj(constant.page)
}

/**
 * 返回通用的图片路径
 * @param {Object} url
 */
const getImageUrl = function(url) {
	return url.indexOf('http') == 0 ? url : baseConfig.imageUrl + url
}
/**
 * 将base64转化成图片
 * @param {String} baseData
 */
const getBase64Image = function(baseData) {
	return 'data:image/png;base64,' + baseData
}

/**
 * 关闭所有页面返回主页
 */
const goHome = function() {
	if (uni.getStorageSync('Token')) {
		uni.reLaunch({
			url: "/pages/index/index"
		})
	} else {
		uni.reLaunch({
			url: "/pages/login/loginNew"
		})
	}
}
const getContentImage = function(arr) {
	arr.forEach(item => {
		let imgReg = /<img.*?(?:>|\/>)/gi //匹配图片中的img标签
		let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
		let arr = item.content.match(imgReg) //筛选出所有的img
		if (arr) {
			let srcArr = []
			for (let i = 0; i < arr.length; i++) {
				let src = arr[i].match(srcReg)
				// 获取图片地址
				srcArr.push(src[1])
				item.contentImg = srcArr[0]
			}
		}
	})
	return arr
}

const compareVersionZT = function(v1, v2) {
	const v1s = v1.split('.');
	const v2s = v2.split('.');
	
	const maxLenth = Math.max(v1s.length, v2s.length);
	while (v1s.length < maxLenth) {
		v1s.push('0')
	}
	while (v2s.length < maxLenth) {
		v2s.push('0')
	}
	
	for(let i = 0; i < maxLenth; i++) {
		const v1Num = parseInt(v1s[i])
		const v2Num = parseInt(v2s[i])
		if (v1Num > v2Num) {
			return 1
		}
	}
	return 0
}

/**
 * 打开第三方应用
 * @param {Object} mp
 * @param {Object} item
 */
const openThirdApp = function(mp, item) {
	const appVersObj = item._id['sys-applet-version'][0]
	if (appVersObj.app_type === 3) { //网页
		return;
	}
	if (appVersObj.app_type === 2) { //app
		return;
	}
	if (appVersObj.app_type === 1) { //小程序
		if (!mp) {
			uni.showToast({
				title: '不是uniapp支持的环境',
				icon:'error'
			})
			return;
		}
		mp.getUniMPVersion(item.applet_id, (ret) => { //确认小程序是否已经下载安装
			// console.log(ret, item, !compareVersionZT(appVersObj.applet_version, ret.versionInfo.name))
			if (0 == ret.code && !compareVersionZT(appVersObj.applet_version, ret.versionInfo.name)) {
				openUniApp(mp, item.applet_id)
				return;
			}
			//下载wgt
			uni.showLoading({
				title: "小程序下载中..."
			});
			const downloadTask = uni.downloadFile({
				url: getImageUrl(appVersObj.applet_url[0].path),
				success: (downloadRes) => {
					if (downloadRes.statusCode === 200) {
						uni.saveFile({
							tempFilePath: downloadRes.tempFilePath,
							success: (saveRes) => {
								const wgtFile = saveRes.savedFilePath;
								mp.installUniMP({ //安装
									appid: item.applet_id,
									wgtFile: wgtFile
								}, (r) => {
									if (0 != r.code) {
										uni.showModal({
											title: '安装小程序失败',
											content: JSON.stringify(r),
											showCancel: false
										})
										return;
									}
									openUniApp(mp, item.applet_id)
								});
							}
						})
					}
				},
				complete: () => {
					uni.hideLoading();
				}
			})
		});
	}
}

const openUniApp = function(mp, appid) {
	mp.openUniMP({ //获取成功 启动
		appid: appid
	}, (ret) => {
		if (0 != ret.code) {
			uni.showModal({
				title: '启动失败',
				content: JSON.stringify(ret),
				showCancel: false
			})
		}
	});
}
//比较版本号
const compareVersion = function(version1, version2) {
	const newVersion1 = `${version1}`.split('.').length < 3 ? `${version1}`.concat('.0') : `${version1}`;
	const newVersion2 = `${version2}`.split('.').length < 3 ? `${version2}`.concat('.0') : `${version2}`;
	//计算版本号大小,转化大小
	function toNum(a) {
		const c = a.toString().split('.');
		const num_place = ['', '0', '00', '000', '0000'],
			r = num_place.reverse();
		for (let i = 0; i < c.length; i++) {
			const len = c[i].length;
			c[i] = r[len] + c[i];
		}
		return c.join('');
	}

	//检测版本号是否需要更新
	function checkPlugin(a, b) {
		const numA = toNum(a);
		const numB = toNum(b);
		return numA > numB ? true : false;
	}
	return checkPlugin(newVersion1, newVersion2);
}

export default {
	constant, //常量
	jumpPage,
	navigateBack,
	backLogin,
	showActionSheet,
	commEmit,
	commOffEmit,
	getCommPage,
	getImageUrl,
	getBase64Image,
	jumpDetail,
	goHome,
	getContentImage,
	openThirdApp,
	compareVersion
}
