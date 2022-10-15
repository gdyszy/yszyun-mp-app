/**
 * 基础能力js支持
 * @author zhengtan
 */

/**
 * 将json转换为params参数
 * @param {Object} json
 * 
 */
const json2param = function(json){
	let params = Object.keys(json).map(function (key) {
		let _value = typeof json[key] == 'object' ? JSON.stringify(json[key]) : json[key];
	    return encodeURIComponent(key) + "=" + encodeURIComponent(_value);
	}).join("&");
	
	return params;
}


/**
 * 合并对象
 * @param target
 * @param source
 * @returns {*}
 */
const objectMerge = function(target, source) {
    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property]
		if (sourceProperty === null || sourceProperty === undefined){
			return;
		}
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}

/**
 *
 * @param source  原对象
 * @param target 要拷贝的对象
 * @returns {*}
 */
const objClone = function(source, target) {
    if (!target && typeof target !== 'object') {
        throw new Error('error arguments shallowClone')
    }
    const sourceKeys = Object.keys(source)
    sourceKeys.forEach(key => {
        source[key] = target[key]
    })
    Object.keys(target).forEach(key => {
        if (!sourceKeys.includes(key)) {
            source[key] = target[key]
        }
    })
    return source
}


const deepClone = function(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
 * 数组去重
 * @param arr
 * @returns {T[]}
 */
const uniqueArr = function(arr) {
    return Array.from(new Set(arr))
}

/**
 * 判断是否链接
 * @param path
 * @returns {boolean}
 */
const isExternal = function(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断对象是否为空
 * @param {Object} param
 */
const hasEmpty = function(param){
	if (typeof param != 'object'){
		return true;
	}
	let keys =Object.keys(param);
	return keys.length == 0
}

/**
 * 判断对象中属性是否有空值
 * @param param
 * @returns {boolean}
 */
const hasAttributeEmpty = function(param) {
    const keys = Object.keys(param);
    if (keys.length === 0) {
        return true
    }
    for (let i = 0; i < keys.length; i++) {
        if (!param[keys[i]]) {
            return true
        }
    }
    return false
}

/**
 * 暴力解决拷贝值改变, 深拷贝
 * @param {Object} source
 */
const parseCopyObj = function(source){
	return JSON.parse(JSON.stringify(source))
}

/**
 * 过滤掉value为null或者为空的
 * @param {Object} params
 */
const filterNullValue = function(params){
	Object.keys(params).forEach((key) => {
		const _value = params[key];
		if (_value === '' || _value === null || _value === undefined){
			delete params[key]
		}
	})
	return params
}



/**
 * Check if an elmment has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
const hasClass = function(elm, cls) {
    return !!elm.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to elmment
 * @param {HTMLElement} elm
 * @param {string} cls
 */
const addClass = function(elm, cls) {
    if (!hasClass(elm, cls)) elm.className += ' ' + cls
}

/**
 * Remove class from elmment
 * @param {HTMLElement} elm
 * @param {string} cls
 */
const removeClass = function(elm, cls) {
    if (hasClass(elm, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        elm.className = elm.className.replace(reg, ' ')
    }
}

/**
 * 获取url中的请求key=value形式
 * @param {Object} url
 */
const getRequestParameters = function(url){
	let theRequest = {};  
	if (url.indexOf("?") != -1) {  
	    let str = url.substr(1);  
	    let strs = str.split("&");  
	    for (let i = 0; i < strs.length; i++) {  
	        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);  
	    }  
	}  
	return theRequest; 
}


export default{
	json2param,
	objectMerge,
	objClone,
	deepClone,
	parseCopyObj,
	filterNullValue,
	uniqueArr,
	isExternal,
	hasEmpty,
	hasAttributeEmpty,
	hasClass,
	addClass,
	removeClass,
	getRequestParameters
}