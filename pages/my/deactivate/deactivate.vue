<!-- 注销（销毁）账号 -->
<template>
  <view class="uni-content">
    <nav-bar @clickLeft="$commHelper.navigateBack" title="账号注销" />
    <view class="words" space="emsp" v-html="deactList.content">

    </view>
    <view class="button-group">
      <button @click="nextStep" class="next" type="default">下一步</button>
      <button @click="cancel" type="warn">取消</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        deactList:{}
      }
    },
    onLoad() {
      this.commHttpRequest('clientapi', 'privacyList', {}, true, (res) => {
        this.deactList =res.data.data[1]
      },false)
    },
    methods: {
      cancel() {
        uni.navigateBack()
      },
      nextStep() {
        let _this = this
        uni.showModal({
          content: '已经仔细阅读注销提示，知晓可能带来的后果，并确认要注销',
          complete: (e) => {
            if (e.confirm) {
              this.commHttpRequest('clientapi', 'closeAccount', {}, true, (res) => {
                uni.clearStorage({
                  success() {
                    uni.showToast({
                      title: '注销成功'
                    });
                    setTimeout(() => {
                      _this.$commHelper.goHome();
                    }, 500)
                  }
                });
              })
            } else {
              uni.navigateBack()
            }
          }
        });
      }
    }
  }
</script>

<style>
  .uni-content {
    display: flex;
    flex-direction: column;
    font-size: 28rpx;
  }

  .words {
    padding: 0 26rpx;
    line-height: 46rpx;
    margin-top: 20rpx;
    margin-bottom: 80px;
  }

  .button-group button {
    border-radius: 100px;
    border: none;
    width: 300rpx;
    height: 42px;
    line-height: 42px;
    font-size: 32rpx;
  }

  .button-group button:after {
    border: none;
  }

  .button-group button.next {
    color: #e64340;
    border: solid 1px #e64340;
  }

  .button-group {
    display: flex;
    flex-direction: row;
    position: fixed;
    height: 50px;
    bottom: 10px;
    width: 750rpx;
    justify-content: center;
    align-items: center;
    border-top: solid 1px #e4e6ec;
    padding-top: 10px;
    background-color: #FFFFFF;
    max-width: 690px;
  }


  @media screen and (min-width: 690px) {
    .uni-content {
      max-width: 690px;
      margin-left: calc(50% - 345px);
    }
  }
</style>
