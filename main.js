import Vue from 'vue'
import App from './App'
import $commHelper from '@/utils/commHelper.js'
import $commJsUtils from '@/utils/commJsUtils.js'
import baseConfig from '@/config/index.js';
Vue.config.productionTip = false

App.mpType = 'app'

let appSystemInfo = uni.getStorageSync("appSystemInfo")
//api 地址
Vue.prototype.$cloudFunctionUrl = baseConfig.apiUrl+'/'
//注册邀请页面地址
Vue.prototype.$webUrl = baseConfig.webUrl
Vue.prototype.commHttpRequest = function(actionurl, eventName, params, loading = true, callback, needToken = true) {
	if(appSystemInfo==''||appSystemInfo==undefined){
		uni.getSystemInfo({
			success: function (res) {
			uni.setStorageSync("appSystemInfo",res)
			appSystemInfo = res
			}
		});
	}
  if (loading == true) {
    uni.showLoading({
      mask: true
    })
  }
  if (needToken) { // 请求是否需要token 默认为true 
    if (uni.getStorageSync('Token')) {
      params['token'] = uni.getStorageSync('Token')
    } else {
      uni.showToast({
        title: '用户信息失效,请重新登录',
        icon: 'none'
      })
      setTimeout(() => {
        this.$commHelper.goHome()
      }, 500)
      return false
    }
  }

  let url = this.$cloudFunctionUrl + actionurl
  params['eventName'] = eventName
  let _this = this
  //传入uniID.createInstance 所需的参数 ---begin
  params['APPID'] = appSystemInfo.appId
  params['PLATFORM'] = appSystemInfo.platform
  params['LOCALE'] = uni.getLocale()
  params['deviceId'] = appSystemInfo.deviceId
  if (params['eventName'] != 'register') {
    params['dcloud_appid'] = appSystemInfo.appId
  }
  //传入uniID.createInstance 所需的参数 ---end

  uni.request({
    url: url,
    method: 'POST',
    data: params,
    success: res => {
		// console.log("commHttpRequest res:",res)
      uni.hideLoading()
      if (res.data.code == 0) {
        // res.result = res.data
        callback(res);
      } else {
        if (res.data.code === 30203 || res.data.code === 30202) { //token过期 或修改密码后 重新登录
          uni.showToast({
            title: '用户信息失效,请重新登录',
            icon: 'none'
          })
          uni.clearStorage({
            success() {
              _this.$commHelper.goHome();
            }
          });
          return false
        }
        uni.showToast({
          title: res.data.errMsg || res.data.msg,
          icon: res.data.errMsg < 8 || res.data.msg < 8 ? "error" : 'none'
        })
      }
    },
    fail: (err) => {
		//console.log("commHttpRequest err:",err)
      uni.hideLoading()
      uni.showToast({
        title: err,
        icon: 'none'
      });
    }
  });

}
//统一提示
global.show_nativeUI_toast = function(msg, icontype = 'success') {
  if (icontype == 'warn') {
    icontype = 'error'
  }
  uni.showToast({
    title: msg,
    icon: icontype,
    duration: 2000
  })
}
//模态对话框
global.show_nativeUI_modal = function(unimodal) {
  let modalJson = {};
  Object.assign(modalJson, {
    confirmColor: '#1168ff'
  }, unimodal);
  uni.showModal(modalJson);
}

//挂载全局，通过 this.$commHelper 和 this.$commJsUtils使用
Vue.prototype.$commHelper = $commHelper;
Vue.prototype.$commJsUtils = $commJsUtils;


Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
const app = new Vue({
  ...App
})
app.$mount()
