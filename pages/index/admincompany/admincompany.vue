<template>
  <view :class="titleShow?'main1':'main'">
    <nav-bar @clickLeft="$commHelper.navigateBack" :title="!titleShow?'':'切换企业'" />
    <view class="title" v-if="!titleShow">
      <h2>选择你登录的组织</h2>
    </view>
    <view class="content_text" v-if="!titleShow">
      你的账号加入了{{companyList?companyList.length:'1'}} 个团队/企业
    </view>
      <view class="company_list">
        <view class="company_item" v-for="(item,index) in companyList" :key="index" @click="checkCompany(item)">
          <image :src="item.logo" mode=""></image>
          <h3 class="company_name">{{item.name}}</h3>
          <uni-icons class="icons" type="arrow-right" size="22" v-if="!titleShow"></uni-icons>
          <uni-icons class="icons" :type="companyID==item.eun?'checkmarkempty':''" color="#1f6df3" size="22" v-else>
          </uni-icons>
        </view>
      </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        companyList: [],
        titleShow: false,
        companyID: ''
      }
    },
    onLoad(option) {
      this.titleShow = option.titleShow
      this.companyID = option.companyID
      this.commHttpRequest('clientapi', 'getSysCompanyList', {
        verify: 1
      }, true, (res) => {
        this.companyList = res.data.data
      })
    },
    methods: {
      checkCompany(item) {
        if (this.companyID == item.eun) {
          return false
        }
        this.commHttpRequest('clientapi', 'updateUserCompanyId', {
          company_eun: item.eun
        }, true, (res) => {
          // uni.setStorageSync('companyName', item.name)
          this.$commHelper.goHome()
        })
      }
    }
  }
</script>

<style lang="less">
  page {
    background-color: #fff;
  }

  .main {
    padding: 0 100rpx;
  }

  .main1 {
    padding: 0 50rpx;
  }

  .title {
    margin-top: 80rpx;
  }

  .content_text {
    margin: 20rpx 0 40rpx;
    color: #aaa;
  }

  .company_item {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    margin: 20rpx 0;
    padding: 20rpx;
    background-color: #f2f1f6;
    border-radius: 5px;
    align-items: center;

    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 5px;
      background-color: #f5f7fa;
    }

    .company_name {
      margin-left: 20rpx;
      color: #000;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: calc(100% - 160rpx);
    }
  }
</style>
