<template>
  <view class="login_main">
    <view class="login_title">
      <view class="">登录</view>
      <span>欢迎体验小程序开放门户</span>
    </view>
    <view class="">
      <uni-forms :border="true" ref="form" :modelValue="formData" :rules="rules">
        <uni-forms-item name="username">
          <uni-easyinput class="login_ipt" prefixIcon="person" :inputBorder="false" placeholder="请输入账号"
            v-model="formData.username">
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item name="password">
          <uni-easyinput class="login_ipt" type="password" prefixIcon="locked" :inputBorder="false" placeholder="请输入密码"
            v-model="formData.password">
          </uni-easyinput>
        </uni-forms-item>
      </uni-forms>
      <view class="forget_pwd">
        <span @click="jumpRegister('retrievePwd')">忘记密码</span>
      </view>
      <button class="login_btn" type="primary" @click="login">登录</button>
      <!-- <checkbox-group @change="setAgree" class="checkbox-group">
        <checkbox :checked="agreeprivacy" style="transform: scale(0.7);" />
        <text class="checkbox-group-content">我同意</text>
        <text class="checkbox-group-text" @click="jumpRegister('agreement')">用户隐私条款</text>
      </checkbox-group> -->
      <view class="register">
        <span @click="jumpRegisterRelunch">注册账号</span>
        <span style="color: #b0b0b0;margin: 0 12px;">|</span>
        <span @click="jumpRegister('agreement')">隐私条款</span>
      </view>
    </view>
  </view>
</template>

<script>
  import loginApi from "@/api/login.js";
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        formData: {
          username: '',
          password: '',
        },
        agreeprivacy: false,
        rules: {
          username: {
            rules: [{
              required: true,
              errorMessage: '请输入账号',
            }]
          },
          password: {
            rules: [{
              required: true,
              errorMessage: '请输入密码',
            }]
          }
        }
      };
    },
    onLoad() {
      this.updateApp()
    },
    methods: {
      updateApp() {
        var _this = this
        const appSystemInfo = uni.getStorageSync("appSystemInfo")
        let data = {}
        data.appId = appSystemInfo.appId
        data.comefrom = 'loginNew'
        data.os_type = uni.getDeviceInfo().platform === 'ios' ? 2 : 1;
        this.commHttpRequest('clientapi', 'updateApp', data, false, (res) => {
          if (!res.data.data.length) {
            return true
          }
          let appVersion = appSystemInfo.appVersion
          _this.onLineVersion = res.data.data[0] ? res.data.data[0].version : appVersion;
          const permission = res.data.data[0].appList[0].update_set
          if (_this.$commHelper.compareVersion(_this.onLineVersion, appVersion)) { // 有新版本
            // _this.newVersion = true
            //跳转到浏览器下载包
            // plus.runtime.openURL(res.data.data[0].package_url)
            let appData = {}
            appData.is_mandatory = permission ? true : false
            appData.title = "版本更新"+this.onLineVersion
            appData.contents = "修复已知问题"
            appData.platform = res.data.data[0].os_type === 1 ? ["Android"] : ["iOS"]
            appData.version = _this.onLineVersion
            appData.url = res.data.data[0].package_url
            appData.type = "native_app"
            
            appData.store_list = []
            uni.setStorageSync("PACKAGE_INFO_KEY", appData)
            uni.navigateTo({
              url: `/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=${"PACKAGE_INFO_KEY"}`,
              fail: (err) => {
                console.error('更新弹框跳转失败', err)
                uni.removeStorageSync("PACKAGE_INFO_KEY")
              }
            })
          }
        }, false)
      },
      jumpRegisterRelunch() {
        uni.reLaunch({
          url: '/pages/login/register'
        })
      },
      jumpRegister(path) {
        this.$commHelper.jumpPage({
          url: './' + path,
        })
      },
      setAgree(e) {
        this.agreeprivacy = !this.agreeprivacy
      },
      //登录方法
      async login() {
        // if(!this.agreeprivacy){
        //   return uni.showToast({
        //     title:"请先同意用户隐私条款",
        //     icon:'none'
        //   })
        // }
        await this.$refs.form.validate();
        const reqParams = this.$commJsUtils.parseCopyObj(this.formData);
        reqParams.appid = uni.getAppBaseInfo().appId
        this.commHttpRequest('clientapi', 'login', reqParams, true, (res) => {
          var userInfo = res.data.userInfo
          delete userInfo.password
          delete userInfo.token
          uni.setStorageSync('Token', res.data.token);
          uni.setStorageSync('userInfo', userInfo);
          this.commHttpRequest('clientapi', 'getSysCompanyList', {
            verify: 1
          }, true, (res) => {
            if (res.data.data.length > 1) {
              uni.navigateTo({
                url: "/pages/index/admincompany/admincompany"
              })
            } else {
              this.$commHelper.goHome()
            }
          })
        }, false)
        // reqParams.password = md5(reqParams.password);
        // const res = await loginApi.login(reqParams);

      },
    }
  }
</script>

<style lang="less" scoped>
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
