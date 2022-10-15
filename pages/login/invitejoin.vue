<template>
  <view class="container">
    <view class="content">
      <h3>{{companyName}}</h3>
      <!-- <view class="tip">小程序开放平台进行沟通协作,请尽快加入</view> -->
      <uni-forms ref="baseForm" :modelValue="baseFormData" :rules="rules" label-position="top">
        <uni-forms-item label="真实姓名" name="nickname" required>
          <uni-easyinput v-model="baseFormData.nickname" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="手机号" name="mobile" required>
          <uni-easyinput v-model="baseFormData.mobile" type="number" maxlength="11"  placeholder="请输入手机号" />
        </uni-forms-item>
        <uni-forms-item label="验证码" name="authCode" required>
          <view class="code_style">
            <uni-easyinput v-model="baseFormData.authCode" type="number" maxlength="6" placeholder="请输入验证码" />
            <view class="text" @click="sendMsg">{{codeText}}</view>
          </view>
        </uni-forms-item>
        <uni-forms-item label="密码" name="password" required>
          <uni-easyinput  type="password" placeholder="请输入密码" v-model="baseFormData.password">
          </uni-easyinput>
        </uni-forms-item>
        <button class="submit_btn" type="primary" @click="submit_btns">注册</button>
      </uni-forms>
	  <view class="showdown" v-if="showApp">
		  <uni-link color="#007BFF" :href="downAppUrl" text="去下载APP"></uni-link>
	  </view>
	 
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
		  downAppUrl:'https://appstore.yszyun.com/#/pages/index/index?alias=unimp',
		  showApp:true,
        baseFormData: {
          nickname: '',
          mobile: '',
          authCode: '',
          reason: '',
        },
        codeText: '发送验证码',
        companyName:'',
        codeShow: false,
        option:null,
        rules: {
          nickname: {
            rules: [{
              required: true,
              errorMessage: '请输入姓名',
            }],
          },
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
          password: {
            rules: [{
              required: true,
              errorMessage: '请输入密码',
            }],
          },
          authCode: {
            rules: [{
              required: true,
              errorMessage: '请输入验证码',
            }],
          },
        },
      };
    },
    onLoad(option) {
      this.option=option
      // console.log(this.option)
      this.commHttpRequest('clientapi', 'getCompanyEun', {
        eun:option.eun
      }, true, (res) => {
        this.companyName = res.data.data[0].name
      }, false)
    },
    methods: {
      async submit_btns() {
		  var _this = this
		  var baseFormDatas= {
          nickname: '',
          mobile: '',
          authCode: '',
          reason: '',
        }
        await this.$refs.baseForm.validate();
        const reqParams = this.$commJsUtils.parseCopyObj(this.baseFormData);
        reqParams['company_eun']=this.option.eun
        reqParams['inviter_uid']=this.option.inviter_uid
        reqParams.username = reqParams.mobile
        this.commHttpRequest('clientapi', 'register', reqParams, true, (res) => {
          show_nativeUI_toast('注册成功,请下载APP体验更多内容。')
		  _this.baseFormData = baseFormDatas
		  _this.showApp =true
		  setTimeout(() => {
		  	 window.location.href = _this.downAppUrl
		  }, 2000)
        }, false)
      },
      sendMsg() {
        if (this.codeShow) {
          return
        }
        let reg_phone = /^1\d{10}$/;
        if (!reg_phone.test(this.baseFormData.mobile)) return uni.showToast({
          title: "手机号格式不正确",
          icon: 'none'
        });
        this.commHttpRequest('clientapi', 'sendSmsCode', {
          "mobile": this.baseFormData.mobile,
          "type": "bind-mobile-by-sms"
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
      }
    }
  }
</script>

<style lang="less">
  .container {
    background-color: #f2f2f2;
    padding: 20px;
    height: 100%;

    h3 {
      text-align: center;
      font-size: 18px;
      margin-bottom: 20px;
    }

    .submit_btn {
      margin-top: 20px;
      border-radius: 10px;
    }

    .content {
      background-color: #fff;
      border-radius: 5px;
      padding: 40px 20px;

      .code_style {
        display: flex;

        .text {
          width: 70px;
          text-align: center;
          margin-left: 10px;
          color: #018cee;
        }
      }
    }
  }

  /deep/ .uni-forms-item__inner {
    padding: 0;
  }

  /deep/ .is-input-border {
    border: none;
    border-bottom: 1px solid #ccc
  }
  .showdown{
	  text-align: center;
	  margin-top: 50px;
  }
</style>
