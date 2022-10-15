<template>
	<view class="main">
		<nav-bar @clickLeft="$commHelper.navigateBack" />
		<view class="login_title">
			<view class="">设置新密码</view>
			<span>设置账号登录密码</span>
		</view>
		<view class="">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item name="oldPasswd" class="login_ipt">
					<uni-easyinput prefixIcon="locked" :inputBorder="false" placeholder="请输入旧密码"
						v-model="formData.oldPasswd">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="password" class="login_ipt">
					<uni-easyinput prefixIcon="locked" :inputBorder="false" placeholder="请确认新密码"
						v-model="formData.password">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="confirmPasswd" class="login_ipt">
					<uni-easyinput prefixIcon="locked" :inputBorder="false" placeholder="请确认新密码"
						v-model="formData.confirmPasswd">
					</uni-easyinput>
				</uni-forms-item>
			</uni-forms>
			<button class="login_btn" type="primary" @click="login">修改密码</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					oldPasswd: '',
					password: '',
					confirmPasswd: '',
				},
				rules: {}
			};
		},
		methods: {
			login() {
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
				}).catch(err => {
					console.log('表单错误信息：', err);
				})

			}
		},
	}
</script>

<style lang="less">
	.main {
		height: 100vh;
		background-color: #fff;
		padding: 0 24px;
		overflow: hidden;

		.login_title {
			margin-top: 12px;
			margin-bottom: 30px;
			border: ;

			view {
				font-size: 24px;
				color: #1f6df3;
				margin-bottom: 4px;
			}

			span {
				font-size: 14px;
				color: #6c6e76;
			}
		}

		.login_ipt {
			height: 52px;
			padding: 0;
			border-bottom: 1px solid #f2f2f5;
			line-height: 52px;
		}

		.forget_pwd {
			display: flex;
			justify-content: flex-end;
			padding: 16px 0;
			color: #1f6df3;
		}

		.login_btn {
			margin: 50px 0 193px;
		}

	}

	/deep/ .uni-icons {
		font-size: 20px !important;
		margin: 0 5px;
	}

	/deep/ .uni-forms-item__inner {
		padding: 0;
	}
</style>
