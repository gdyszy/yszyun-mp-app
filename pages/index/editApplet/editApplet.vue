<template>
	<view>
		<nav-bar title="我的小程序" @clickLeft="$commHelper.navigateBack" rightIcon="checkmarkempty"
			@clickRight="saveApplet">
		</nav-bar>
		<uni-notice-bar text="上下拖拽可以调整顺序"></uni-notice-bar>
		<view id="applet">
			<uni-list-item v-for="(item,index) in myApplet" :key="index" :title="item.name" :data-id="item._id._value"
				:note="item.applet_short_desc" :thumb="$commHelper.getImageUrl(item.applet_icon[0].path)" thumbSize="lg"
				class="applet-item">
				<template v-slot:footer>
					<view class="u-sort-icon">
						<button type="warn" size="mini" @click.stop="delApplet(item, index)">删除</button>
						<!-- <uni-icons @click.stop="delApplet(item, index)" type="trash-filled" size="28" color="#ff0000"></uni-icons> -->
					</view>
				</template>
			</uni-list-item>
		</view>
	</view>
</template>

<script>
	import myApplet from "@/api/myApplet.js"
	export default {
		data() {
			return {
				myApplet: [],
				myAppletIds: []
			}
		},
		onLoad(options) {
			const stroeValues = uni.getStorageSync(this.$commHelper.constant.keys.myApplet);
			if (stroeValues) {
				this.myApplet = JSON.parse(stroeValues);
				this.myAppletIds = this.myApplet.map(item => {
					return item._id._value
				})
			}
		},
		methods: {
			delApplet(item, index) {
				this.myAppletIds.splice(this.myAppletIds.indexOf(item._id._value), 1)
				this.myApplet.splice(index, 1);
			},
			async saveApplet() {
				const _appids = this.myAppletIds.map(item => {
					return item
				})
				const result = await myApplet.saveApplet(_appids);
				show_nativeUI_toast('保存成功');
				uni.$emit(this.$commHelper.constant.keys.emitMyApplet)
			},
			sortableEnd(e) {
				console.log(e)
				this.myAppletIds = e
			}
		}
	}
</script>
<script module="sortable" lang="renderjs">
	export default {
		mounted() {
			if (typeof window.Sortable === 'object') {
				this.init();
			} else {
				//动态引入js
				const script = document.createElement('script');
				script.src = './static/js/sortable.min.js';
				script.onload = this.init;
				document.head.appendChild(script);
			}
		},
		methods: {
			init() {
				const mySortable = new Sortable(document.getElementById('applet'), {
					sort: true,
					animation: 150, // ms, number 单位：ms，定义排序动画的时间
					direction: 'horizontal', // 拖拽方向 (默认情况下会自动判断方向)
					draggable: ".applet-item", // 允许拖拽的项目类名
					ghostClass: "sortable-ghost", // drop placeholder的css类名
					chosenClass: "sortable-chosen", // 被选中项的css 类名
					dragClass: "sortable-drag", // 正在被拖拽中的css类名
					onEnd: (e) => {
						this.$ownerInstance.callMethod('sortableEnd', mySortable.toArray())
					}
				});
			}
		}
	}
</script>


<style lang="less" scoped>
	.u-sort-icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
