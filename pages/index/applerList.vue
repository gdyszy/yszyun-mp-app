<template>
	<view class="container">
		<nav-bar title="小程序列表" @clickLeft="$commHelper.navigateBack" />
		<uni-search-bar radius="5" placeholder="搜索小程序" clearButton="auto" cancelButton="none" @confirm="search" />
		<uni-list :border="false">
			<uni-list-item v-for="(item,index) in appletList" :key="index" @click="openApp(item)"
				:title="item.name" :note="item.applet_short_desc" :clickable="!isAdd" :thumb="$commHelper.getImageUrl(item.applet_icon[0].path)" thumbSize="lg"
				>
				<template v-if="isAdd" v-slot:footer>
					<view style="padding: 10px 0;">
						<button v-if="findAppltId(item._id._value)" type="warn" size="mini" @click.stop="saveApplet(item._id._value, 0)">取消</button>
						<button v-else type="primary" size="mini" @click.stop="saveApplet(item._id._value, 1)">添加</button>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import applet from "@/api/applet.js"
	import myApplet from "@/api/myApplet.js"
	const mp = uni.requireNativePlugin('uniMP');
	export default {
		data() {
			return {
				appletList: [],
				pages: this.$commJsUtils.parseCopyObj(this.$commHelper.constant.page),
				isAdd: 0,
				myAppletIds: []
			};
		},
		onReachBottom() {
			if (this.pages.page_num * this.pages.page_size < this.pages.count) {
				this.pages.page_num ++
				this.getList(0)
			}
		},
		onLoad(options) {
			this.isAdd = options.isAdd;
			if (this.isAdd) {
				this.myAppletIds = options.myAppletIds ? JSON.parse(decodeURIComponent(options.myAppletIds)) : [];
			}
			this.getList()
		},
		methods: {
			async getList(isInit = 1, name = ''){
				if (isInit) {
					this.pages = this.$commJsUtils.parseCopyObj(this.$commHelper.constant.page)
				}
				const res = await applet.getAppletList(this.pages, name)
				this.appletList = isInit ? res.data : [...this.appletList, ...res.data]
				if (res.count){
					this.pages.count = res.count
				}
			},
			findAppltId(id) {
				return this.myAppletIds.includes(id)
			},
			search(e) {
				this.getList(1, e.value)
			},
			openApp(item) {
				this.$commHelper.openThirdApp(mp, item)
			},
			async saveApplet(id, saveStatus) {
				const _myAppletIds = this.$commJsUtils.parseCopyObj(this.myAppletIds);
				let tips = '添加';
				if (saveStatus) { //添加
					_myAppletIds.push(id);
				}else{ //取消
					const _index = _myAppletIds.indexOf(id);
					_myAppletIds.splice(_index, 1);
					tips = '取消';
				}
				const result = await myApplet.saveApplet(_myAppletIds);
				show_nativeUI_toast(tips + '成功');
				this.myAppletIds = _myAppletIds;
				uni.$emit(this.$commHelper.constant.keys.emitMyApplet)
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
