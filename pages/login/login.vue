<template>
	<view class="main">
		<template v-if="isShow">
			<view class="logo">
				<image src="/static/Logo.svg">
			</view>
			<view class="btn_view">
				<button type="default" @tap="loginExper">登录体验</button>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false
			}
		},
		onLoad() {
			this.checkNetwork();
			if (uni.getStorageSync(this.$commHelper.constant.keys.isFirst)) {
				 if (uni.getStorageSync('Token')){
					this.commHttpRequest('clientapi', 'userInfo', {}, true, (res) => {
					 if(res.data.userInfo){
						 this.$commHelper.goHome() 
					 }else{
						 this.jumpLogin()
						 return
					 }
					}) 
				 }else{
					this.jumpLogin()
					return 
				 }
				
				
			}
			this.isShow = true
		},
		methods: {
			checkNetwork(){
				var _this = this
				uni.getNetworkType({
					success: function (res) {
						if(res.networkType=='none'){
							show_nativeUI_toast("网络不可用，请检查网络设置","warn")
							this.jumpLogin()
							return false
						}else{
				
						}
					}
				})
			},
			jumpLogin() {
				 uni.removeStorageSync('company_eun')
				 uni.removeStorageSync('userInfo')
				this.$commHelper.jumpPage({
					url: './loginNew',
				}, 2)
			},
			loginExper() {
				uni.setStorageSync(this.$commHelper.constant.keys.isFirst, 1)
				this.jumpLogin()
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		background: url('@/static/loginBg.png') no-repeat;
		background-size: cover;
		height: 100vh;
		text-align: center;
		overflow: hidden;
		padding: 0 84rpx;

		.logo {
			margin-top: 12vh;

			image {
				width: 60%;
			}
		}

		.btn_view {
			width: calc(100% - 168rpx);
			position: absolute;
			bottom: 15vh;
		}

		uni-button[type=default] {
			color: #1c72eb;
			background-color: #f8f8f8;
		}

		button:hover[type=default] {
			background-color: #ffffff;
		}
	}
</style>
