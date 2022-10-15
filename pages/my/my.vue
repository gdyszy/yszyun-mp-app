<template>
  <view class="container">
    <nav-bar title="我的" leftIcon=" " color="#000" rightIcon="gear" @clickRight="clickRight" />
    <view class="my_title">个人账号</view>
    <uni-list-item title="切换团队" :border='false' clickable
      @click="$commHelper.jumpPage({url: '/pages/index/admincompany/admincompany',titleShow:true,companyID:userInfo.company_id})"
      showArrow thumb="../../static/company.svg" thumb-size="lg" :rightText="userInfo.company_name" />
    <uni-list-item title="手机号码" @click="$commHelper.jumpPage({url: '../login/retrievePwd',listed:true})"
      :clickable="!userInfo.mobile" :showArrow="!userInfo.mobile" :border='false' thumb="../../static/icon_logout.svg"
      thumb-size="lg" :rightText="userInfo.mobile?userInfo.mobile:'未绑定'">
    </uni-list-item>
    </uni-list-item>
    <uni-list-item title="检查更新" @click="updateApp(true)" clickable :border='false'
      thumb="../../static/icon_check_version.svg" thumb-size="lg">
      <template v-slot:footer>
        <view class="update" v-if="newVersion">
          有新版本
        </view>
      </template>
    </uni-list-item>
    <uni-list-item title="邀请成员" :border='false' clickable
      @click="$commHelper.jumpPage({url: './Invitationcode/Invitationcode'})" showArrow thumb="../../static/QRcode.svg"
      thumb-size="lg" />
    <uni-list-item title="退出登录" @click="loginOut" clickable :border='false' thumb="../../static/icon_logout.svg"
      thumb-size="lg" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        newVersion: false,
        onLineVersion: '',
        userInfo: {}
      };
    },
    onLoad() {
      this.updateApp()
      this.getUser()
    },
    onShow() {
      uni.$on("handleFun", res => {
        this.getUser()
        // 清除监听
        uni.$off('handleFun');
      })
    },
    methods: {
      clickRight() {
        uni.navigateTo({
          url: "/pages/my/set/set"
        })
      },
      getUser() {
        this.commHttpRequest('clientapi', 'userInfo', {}, true, (res) => {
          this.userInfo = res.data.userInfo
        })
      },
      updateApp(show) {
        let data = {}
        const appSystemInfo = uni.getStorageSync("appSystemInfo")
        data.appId = appSystemInfo.appId
        data.os_type = uni.getDeviceInfo().platform === 'ios' ? 2 : 1;
        this.commHttpRequest('clientapi', 'updateApp', data, true, (res) => {
          let appVersion = uni.getAppBaseInfo().appVersion
          this.onLineVersion = res.data.data[0] ? res.data.data[0].version : appVersion;
          if (this.$commHelper.compareVersion(this.onLineVersion, appVersion)) { //有新版本
            this.newVersion = true
            //跳转到浏览器下载包
            if (show) {
              // plus.runtime.openURL(res.data.data[0].package_url)
              let appData = {}
              appData.is_mandatory = false
              appData.title = "版本更新" + this.onLineVersion //标题
              appData.contents = "修复已知问题" //内容
              appData.platform = res.data.data[0].os_type === 1 ? ["Android"] : ["iOS"]
              appData.version = this.onLineVersion
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
          } else {
            if (show) {
              uni.showToast({
                title: "已是最新版",
                icon: 'none'
              })
            }
            this.newVersion = false
          }
        })
      },
      loginOut() {
        let _this = this;
        show_nativeUI_modal({
          content: '是否退出账号？',
          success(res) {
            if (res.confirm) {
              uni.clearStorage({
                success() {
                  uni.getSystemInfo({
                    success: function(res) {
                      uni.setStorageSync("appSystemInfo", res)
                    }
                  });
                  _this.$commHelper.goHome();
                }
              });
            }
          }
        })
      }
    }
  }
</script>

<style lang="less">
  /deep/ .uni-list-item__extra-text {
    flex-shrink: 0;
    max-width: 126px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .container {
    background-color: #fff;
    box-sizing: border-box;
    min-height: 92.5vh;
    padding: 0 24rpx;

    .my_title {
      margin: 40rpx 0 68rpx 32rpx;
      font-size: 24px;
      font-weight: 500;
    }

    .binding {
      color: #9d9fa3;
      font-size: 14px;
      line-height: 80rpx;
    }

    .update {
      color: #9d9fa3;
      font-size: 14px;
      line-height: 80rpx;

      &:before {
        content: ' ';
        display: inline-block;
        border-radius: 50%;
        width: 12rpx;
        margin-right: 10rpx;
        height: 12rpx;
        background-color: #ed2424;
      }
    }
  }
</style>
