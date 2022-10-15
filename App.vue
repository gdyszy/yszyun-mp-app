<script>
	export default {
		onLaunch: function() {
			uni.removeStorageSync("appSystemInfo")
		uni.getSystemInfo({
			success: function (res) {
			uni.setStorageSync("appSystemInfo",res)
			}
		});
		},
		/* onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		} */
	}
</script>

<style lang="scss">
  @import "@/static/iconfont.css";
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	/* #endif */
	@import '@/static/common.css';
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
  // 设置整个项目的背景色
  page {
  	background-color: #f5f7fa;
  }
</style>
