<template>
  <view class="login_main">
    <nav-bar @clickLeft="$commHelper.navigateBack" />
    <view class="login_title">
      <view class="">{{listed?'绑定手机':'重置密码'}}</view>
      <span>通过绑定手机重置密码</span>
     <!-- <text class="code_tip">演示系统 验证码默认为123456</text> -->
    </view>
    <view>
      <uni-forms :border="true" ref="form" :modelValue="formData" :rules="rules">
        <uni-forms-item name="phone">
          <uni-easyinput class="login_ipt" prefixIcon="phone" type="number" maxlength="11" :inputBorder="false" placeholder="请输入手机号码"
            v-model="formData.phone">
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item name="authCode">
          <uni-easyinput class="login_ipt" prefixIcon="email" :inputBorder="false" placeholder="请输入验证码"
            v-model="formData.authCode">
          </uni-easyinput>
          <button size="mini" type="primary" class="balBtn" :disabled="codeShow" @click="sendMsg">{{codeText}}</button>
        </uni-forms-item>
      </uni-forms>
      <button class="login_btn" type="primary" @click="login">{{listed?'绑定手机':'重置密码'}}</button>
      <view class="forget_pwd" v-if="!listed">
        <span>注：未绑定手机无法重置密码，请联系管理员<br /> 重置后密码为123456</span>
      </view>
    </view>
  </view>
</template>

<script>
  import loginApi from "@/api/login.js"
  export default {
    data() {
      return {
        formData: {
          phone: '',
          authCode: '',
          Code: '',
          id: ''
        },
        rules: {
          phone: {
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
            }, {
              validateFunction: function(rule, value, data, callback) {
                if (data.authCode !== data.Code) {
                  callback('请输入正确的验证码')
                }
                return true
              }
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
      verCode() {
        this.codeShow = true
        let s = 60
       let timer =  setInterval(() => {
          if (s > 0) {
            s--
            this.codeText = s
          } else {
            this.codeText = '发送验证码'
            this.codeShow = false
            clearInterval(timer)
          }
        }, 1000)
      },
      sendMsg() {
        let reg_phone = /^1\d{10}$/;
        if (!reg_phone.test(this.formData.phone)) return uni.showToast({
          title: "手机号格式不正确",
          icon: 'none'
        });
        this.commHttpRequest('clientapi', 'sendSmsCode', {
          "mobile": this.formData.phone,
          "type": this.listed ? "bind" : "reset-pwd"
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
      login() {
        let resParams = {}
        resParams['mobile'] = this.formData.phone
        resParams['code'] = this.formData.authCode
        if (this.listed) {
          resParams['type'] = "sms"
        }
        this.commHttpRequest('clientapi', this.listed ? 'bindMobile' : 'resetPwdBySms', resParams, true, (res) => {
            if (res.data.code === 0) {
              uni.showToast({
                title: this.listed ? "绑定成功" : "重置成功",
                icon: 'none'
              });
              if (this.listed) {
                setTimeout(() => {
                  uni.$emit("handleFun")
                  uni.navigateBack()
                }, 500)
              } else {
                setTimeout(() => {
                  uni.navigateBack()
                }, 500)
              }
            } else {
              uni.showModal({
                content: res.data.errMsg,
                showCancel: false
              });
            }
          },
          this.listed ? true : false)
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
