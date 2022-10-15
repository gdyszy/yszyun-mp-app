/**
 * 常量JS设置
 * @author zhengtan
 */


//通用请求常量
const reqMethod = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
}

//表单提交头部信息
const formHeaders = {
	'content-type': 'application/x-www-form-urlencoded'
}

//超时常量
const reqTimeOut = 3*60*1000;

//分页常量
const page = {
	page_num: 1,
	page_size: 10,
	count: 0
}

//下拉加载-数组对象
const loadStatus = [
	'more', //开始加载前
	'loading',  //加载中
	'noMore' //没有更多数据
]

//常用storekey
const keys = {
	token: 'token',
	myApplet: 'myApplet',
	emitMyApplet: 'emitMyApplet',
	isFirst: 'isFirst',
	loginUser: 'loginUser'
}

export default {
	reqMethod,
	formHeaders,
	reqTimeOut,
	page,
	loadStatus,
	keys
}
