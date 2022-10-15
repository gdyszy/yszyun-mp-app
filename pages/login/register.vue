<template>
	<view class="login_main">
		<view class="login_title">
			<view class="">注册</view>
			<span>注册账号体验更多内容</span>
		</view>
		<view>
			<uni-forms :border="true" ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item name="mobile">
					<uni-easyinput class="login_ipt" prefixIcon="phone" type="number" maxlength="11"
						:inputBorder="false" placeholder="请输入手机号码" v-model="formData.mobile">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="authCode">
					<uni-easyinput class="login_ipt" type="number" maxlength="6" prefixIcon="email" :inputBorder="false"
						placeholder="请输入验证码" v-model="formData.authCode">
					</uni-easyinput>
					<button size="mini" type="primary" class="balBtn" :disabled="codeShow"
						@click="sendMsg">{{codeText}}</button>
				</uni-forms-item>
				<uni-forms-item name="password">
					<uni-easyinput class="login_ipt" prefixIcon="locked" type="password" :inputBorder="false"
						placeholder="请输入密码" v-model="formData.password">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="company_eun">
					<!-- <uni-icons custom-prefix="iconfont" type="icon-search" size="30"></uni-icons> -->
					<uni-easyinput class="login_ipt" :customPrefix="true" prefixIcon="icon-qiye" :inputBorder="false"
						placeholder="请输入团队编号" v-model="formData.company_eun" suffixIcon="scan"
						@iconClick="getCompanyEun">
					</uni-easyinput>
				</uni-forms-item>
			</uni-forms>
			<button class="login_btn" type="primary" @click="register">注册</button>
			<checkbox-group @change="setAgree" class="checkbox-group">
				<checkbox :checked="agreeprivacy" style="transform: scale(0.7);" />
				<text class="checkbox-group-content">我同意</text>
				<text class="checkbox-group-text" @click="jump('agreement')">用户隐私条款</text>
			</checkbox-group>
			<view class="register">
				<span @click="jumpLoginRelunch">登录账号</span>
				<span style="color: #b0b0b0;margin: 0 12px;">|</span>
				<span @click="jump('agreement')">隐私条款</span>
			</view>
		</view>
	</view>
</template>

<script>
	import loginApi from "@/api/login.js"
	import base64 from '@/utils/base64.js'
	export default {
		data() {
			return {
				formData: {
					mobile: '',
					authCode: '',
					Code: '',
					id: '',
		 		password: '',
					company_eun: '',
					inviter_uid: ''
				},
				agreeprivacy: false,
				rules: {
					mobile: {
						rules: [{
								required: true,
								errorMessage: '请输入手机号',
							},
							{
								pattern: /^1[3-9][0-9]{9}$/,
								errorMessage: '请输入正确的手机号',
							}
						],
					},
					authCode: {
						rules: [{
								required: true,
								errorMessage: '请输入验证码',
							}
							/* , {
							              validateFunction: function(rule, value, data, callback) {
											   console.log("authCode data:",data)
							                if (data.authCode !== data.Code) {
							                  callback('请输入正确的验证码')
							                }
							                return true
							              }
							            }*/
						],
					},
					password: {
						rules: [{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								maxLength: 16,
								minLength: 8,
								errorMessage: '密码必须8-16位数',
							},
						],
		 		},
					company_eun: {
						rules: [{
							required: true,
							errorMessage: '请输入团队编号',
						}],
					}
				},
				codeText: "发送验证码",
				codeShow: false,
				listed: false,

			};
		},
		onLoad(option) {
			this.listed = option.listed
		},
		methods: {
			getCompanyEun(e) {
				var _this = this
				if (e === "suffix") {
					// 扫码
		 		uni.scanCode({
						success: (res) => {
							// console.log('条码类型：' + res.scanType);
							try {
								const result = res.result
								// console.log('条码内容：' + result);
								var urls = result.split('&')
								var inviter_str = urls[0]
								var dindex = inviter_str.lastIndexOf("\=");
								var inviter_uid = inviter_str.substring(dindex + 1, inviter_str.length);
								
								var eindex = result.lastIndexOf("\=");
								var eun = result.substring(eindex + 1, result.length);
								_this.formData.company_eun = eun
								_this.formData.inviter_uid = inviter_uid
								// this.openById(jsonRes.id, jsonRes.versionId)
							} catch (e) {
							}
						}
					});
		 	}
			},
			verCode() {
				this.codeShow = true
				let s = 60
				setInterval(() => {
					if (s > 0) {
						s--
						this.codeText = s
					} else {
						this.codeText = '发送验证码'
						this.codeShow = false
					}
				}, 1000)
			},
			sendMsg() {
				let reg_phone = /^1\d{10}$/;
				if (!reg_phone.test(this.formData.mobile)) return uni.showToast({
					title: "手机号格式不正确",
					icon: 'none'
				});
				this.commHttpRequest('clientapi', 'sendSmsCode', {
					"mobile": this.formData.mobile,
					"type": this.listed ? "bind" : "bind-mobile-by-sms"
				}, true, (res) => {
					if (res.data.code === 0) {
						uni.showToast({
							title: "验证码发送成功",
							icon: 'none'
						});
						this.verCode()
					} else {
						uni.showModal({
							content: res.data.msg,
							showCancel: false
						});
					}
				}, false)
			},
			jump(path) {
				this.$commHelper.jumpPage({
					url: './' + path,
				})
			},
			jumpLoginRelunch() {
				uni.reLaunch({
					url: '/pages/login/loginNew'
				})
			},
			setAgree(e) {
				this.agreeprivacy = !this.agreeprivacy
			},
			async register() {
				if (!this.agreeprivacy) {
					return uni.showToast({
						title: "请先同意用户隐私条款",
						icon: 'none'
					})
				}
				await this.$refs.form.validate();
				const reqParams = this.$commJsUtils.parseCopyObj(this.formData);
				reqParams.nickname = reqParams.mobile
				reqParams.username = reqParams.mobile
				this.commHttpRequest('clientapi', 'register', reqParams, true, (res) => {
					show_nativeUI_toast('注册成功')
					setTimeout(() => {
						this.$commHelper.jumpPage({
							url: './loginNew'
						})
					}, 500)
				}, false)
			}
		}
	}
</script>

<style lang="less" scoped>
	.balBtn {
		position: absolute;
		top: 4px;
		right: 0;
		width: 88px;
		height: 42px;
		line-height: 20px;
		font-size: 14px;
		padding: 11px 9px;
	}

	.code_tip {
		display: block;
	}

	/deep/ .uni-icons {
		font-size: 20px !important;
		margin: 0 5px;
	}

	/deep/ .uni-forms-item__inner {
		padding: 0;
	}

	/deep/ .uni-error-msg--boeder {
		margin-left: 40px;
	}

	/deep/ .uni-forms-item--border {
		border: 0;
	}
</style>
