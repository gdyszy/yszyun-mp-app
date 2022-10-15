<template>
	<uni-nav-bar :backgroundColor="backgroundColor" :color="color" :title="title" fixed statusBar @clickLeft="clickLeft"
		@clickRight="clickRight">
		<block slot="left">
			<image v-if="leftIcon.includes('http')" :src="leftIcon" class="images" mode=""></image>
			<uni-icons v-else :type="leftIcon" :color="color" :size="size" />
		</block>
		<block slot="right">
			<uni-icons :type="rightIcon" :color="color" :size="size" />
		</block>
	</uni-nav-bar>
</template>

<script>
	export default {
		name: 'navBar',
		props: {
			backgroundColor: {
				type: String,
				default: "#fff"
			},
			size: {
				type: Number,
				default: 20
			},
			//标题
			color: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			leftIcon: {
				type: String,
				default: 'back' //默认显示返回图标
			},
			rightIcon: {
				type: String,
				default: ''
			},
		},
		data() {
			return {

			}
		},
		methods: {
			clickLeft() {
				this.$emit('clickLeft')
			},
			clickRight() {
				this.$emit('clickRight')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.images {
		width: 60rpx;
		height: 60rpx;
	}

	/deep/ .uni-navbar__content_view {
		font-weight: 600;
	}

	/deep/ .uni-navbar--border {
		border: none !important;
	}

	.navbar_icon_view {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.nav-icon {
		font-size: 40rpx;
		font-weight: 600;

	}

	/deep/ .uniui-bars {
		margin-left: 15px;
	}

	/deep/ .uni-nav-bar-text {
		font-size: 17px;
	}
</style>
