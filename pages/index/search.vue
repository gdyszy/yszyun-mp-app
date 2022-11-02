<template>
	<view class="container">
		<nav-bar title="搜索" @clickLeft="$commHelper.navigateBack" />
		<uni-search-bar radius="5" placeholder="关键词" clearButton="auto" cancelButton="none" @input="input"
			@confirm="search" />
		<view class="applet" v-if="appletList.length">小程序</view>
		<view class="">
			<view class="item" v-for="(item,index) in appletList" :key="index" @click="open(item)">
				<image :src="$commHelper.getImageUrl(item.applet_icon[0].path)" style="background-color: aliceblue;" mode=""></image>
				<view class="item_content">
					<view class="item_title">{{item.name}}</view>
					<view class="item_text">{{item.applet_short_desc}}</view>
				</view>
				<!-- <view class="item_use">使用过</view> -->
			</view>
		</view>
		<view class="applet" v-if="information.length">资讯</view>
		<view class="">
			<view class="item" v-for="item in information" :key="item._id" @click="jumpDetail(item._id)">
				<image v-if="item.contentImg" :src="item.contentImg" style="background-color: aliceblue;" mode="">
				</image>
				<view class="item_content">
					<view class="item_title">{{item.title}}</view>
					<view class="item_text" v-if="!item.contentImg" v-html="item.content"></view>
					<view class="item_time">{{new Date(item.create_date).Format('yyyy-MM-dd hh:mm:ss')}}</view>
				</view>
			</view>
		</view>
		<view class="noInformation" v-if="!information.length&&!appletList.length">暂未找到相关资讯或小程序</view>
	</view>
</template>

<script>
	import applet from "@/api/applet.js"
	import consult from "@/api/information.js"
	import myApplet from "@/api/myApplet.js"
	const mp = uni.requireNativePlugin('uniMP');
	export default {
		data() {
			return {
				appletList: [],
				information: []
			};
		},
		onLoad() {
		},
		methods: {
			open(item) {
				this.$commHelper.openThirdApp(mp, item)
			},
			jumpDetail(id) {
				this.$commHelper.jumpPage({
					url: '../consult/consultDetail',
					id
				})
			},
			async search(e) {
				const res = await applet.seachAll({
					name: e.value
				})
				this.appletList = res.data.applet
				this.information = res.data.information
				this.$commHelper.getContentImage(this.information)
				// .then((res) => {
				// 	// this.appletList = res.data.applet
				// 	// this.information = res.data.information
				// 	// this.$commHelper.getContentImage(this.information)
				// })
			},
			input(e) {
				// if (!e) {
				// 	applet.getAppletInAll({
				// 		name: ''
				// 	}).then((res) => {
				// 		this.appletList = res.data.applet.filter((item, index) => {
				// 			return index < 2
				// 		})
				// 		this.information = res.data.information.filter((item, index) => {
				// 			return index < 2
				// 		})
				// 		this.$commHelper.getContentImage(this.information)
				// 	})
				// }
			}
		}
	}
</script>

<style lang="less">
	.container {
		background-color: #fff;
		min-height: 100vh;
		padding: 0 32rpx;

		.noInformation {
			line-height: 200rpx;
			text-align: center;
			color: #666;
			font-size: 14px;
		}

		.applet {
			font-size: 17px;
			margin: 10rpx 0 0;
		}

		.item {
			height: 188rpx;
			box-sizing: border-box;
			padding: 28rpx 0;
			display: flex;
			position: relative;

			.item_use {
				position: absolute;
				right: 0;
				border-radius: 4px;
				background: #fef6ea;
				color: #eb8d00;
				font-size: 11px;
				padding: 4rpx 10rpx 4rpx;
				border: 1px solid #F1A22C;
			}

			image {
				width: 132rpx;
				height: 132rpx;
				flex-shrink: 0;
			}

			.item_content {
				margin: 0 14px;

				.item_title {
					font-size: 17px;
					margin-bottom: 6px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					/* 行数 */
					-webkit-line-clamp: 1;
					overflow: hidden;
				}

				.item_time {
					color: #9d9fa3;
					font-size: 12px;
				}

				.item_text {
					color: #6c6e76;
					font-size: 14px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					/* 行数 */
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}
	}

	/deep/ .uni-searchbar {
		padding: 20rpx 0;
	}
</style>
