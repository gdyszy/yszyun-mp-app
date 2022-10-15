<template>
	<view class="main">
		<nav-bar @clickLeft="$commHelper.navigateBack" />
		<view class="container">
			<view class="container_title">{{agreementList.name}}</view>
			<view class="" v-html="agreementList.content">
			</view>
		</view>
		<view class="btn" v-if="!listed">
			<button type="primary" @click="$commHelper.navigateBack">我明白了</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listed: false,
				agreementList: {}
			};
		},
		onLoad(option) {
			this.listed = option.listed
      this.commHttpRequest('clientapi', 'privacyList', {}, true, (res) => {
        this.agreementList =res.data.data[0]
      },false)
		},
		methods: {}
	}
</script>

<style lang="less">
	.main {
		background-color: #fff;
		overflow: hidden;
    padding-bottom: 160rpx;
	}

	.container {
		padding: 0 28rpx;

		.container_title {
			margin-top: 10rpx;
			font-size: 24px;
			font-weight: 500;
			margin-bottom: 32rpx;
		}
	}

	.btn {
		width: 100%;
		position: fixed;
		padding: 16rpx 40rpx;
		bottom: 0;
		height: 136rpx;
		box-sizing: border-box;

		button {
			// width: 100%;
			height: 104rpx;
			line-height: 104rpx;
			font-size: 17px;
		}
	}
</style>
