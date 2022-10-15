<template>
  <view class="container">
    <nav-bar title="" @clickLeft="$commHelper.navigateBack" />
    <view class="title">{{detailList.title}}</view>
    <view class="time" v-if="detailList.create_date">{{new Date(detailList.create_date).Format('yyyy-MM-dd hh:mm:ss')}}</view>
    <view class="contennt" v-html="detailList.content"></view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        detailList: {}
      };
    },
    onLoad(option) {
      this.commHttpRequest('clientapi', 'informationDetail', {
        "_id": option.id
      }, true, (res) => {
        this.detailList = res.data.data[0]
      })
    }
  }
</script>

<style lang="less">
  .container {
    background-color: #fff;
    min-height: 100vh;
    padding: 0 28rpx;

    .title {
      font-size: 20px;
      line-height: 64rpx;
      font-weight: 500;
      margin-bottom: 12rpx;
    }

    .time {
      color: #7f7f7f;
      font-size: 12px;
    }
  }
</style>
