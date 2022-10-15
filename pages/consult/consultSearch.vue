<template>
  <view class="container">
    <nav-bar title="搜索" @clickLeft="$commHelper.navigateBack" />
    <uni-search-bar radius="5" placeholder="搜索资讯" clearButton="auto" cancelButton="none" @confirm="search" />
    <view class="applet" v-if="information.length">资讯</view>
    <view class="" v-if="information.length">
      <view class="item" v-for="item in information" :key="item.id" @click="jumpDetail(item._id)">
        <image v-if="item.contentImg" :src="item.contentImg" style="background-color: aliceblue;" mode=""></image>
        <view class="item_content">
          <view class="item_title">{{item.title}}</view>
          <view v-if="!item.contentImg" class="item_text" v-html="item.content"></view>
          <view class="item_time">{{new Date(item.create_date).Format('yyyy-MM-dd hh:mm:ss')}}</view>
        </view>
      </view>
    </view>
    <view class="noInformation" v-else>暂未找到相关资讯</view>
    <uni-load-more v-if="showLoadMore" :status="loadMoreStatus"></uni-load-more>
  </view>
</template>

<script>
  import information from "@/api/information.js"
  export default {
    data() {
      return {
        information: [],
        pageSize: 10,
        total: 0,
        pageCurrent: 1,
        showLoadMore: false,
        loadMoreStatus: ''
      };
    },
    onLoad() {
      this.commHttpRequest('clientapi', 'informationList', {}, true, (res) => {
        this.$commHelper.getContentImage(res.data.data)
        this.information = res.data.data.filter((item, index) => index < 2)
      })
    },
    onReachBottom() {
      this.showLoadMore = true;
      if (this.pageCurrent * this.pageSize < this.total) {
        this.loadMoreStatus = this.$commHelper.constant.loadStatus[1];
        this.pageCurrent++
        this.commHttpRequest('clientapi', 'informationList', {
          title: this.searchName,
          pageCurrent: this.pageCurrent,
          pageSize: this.pageSize
        }, true, (res) => {
          this.$commHelper.getContentImage(res.data.data)
          this.information = [...this.information, ...res.data.data]
        })
      } else {
        return this.loadMoreStatus = this.$commHelper.constant.loadStatus[2];
      }
    },
    methods: {
      jumpDetail(id) {
        this.$commHelper.jumpPage({
          url: './consultDetail',
          id
        })
      },
      search(e) {
        this.searchName = e.value
        this.commHttpRequest('clientapi', 'informationList', {
          title: this.searchName,
          pageCurrent: this.pageCurrent,
          pageSize: this.pageSize
        }, true, (res) => {
          this.$commHelper.getContentImage(res.data.data)
          this.information = res.data.data
          this.total = res.data.total
        })
      }
    }
  }
</script>

<style lang="less">
  .container {
    background-color: #fff;
    min-height: 100vh;
    padding: 0 32rpx;

    .noInformation {
      line-height: 200rpx;
      text-align: center;
      color: #666;
      font-size: 14px;
    }

    .applet {
      font-size: 17px;
      margin: 10rpx 0 0;
    }

    .item {
      height: 188rpx;
      box-sizing: border-box;
      padding: 28rpx 0;
      display: flex;
      position: relative;

      .item_use {
        position: absolute;
        right: 0;
        border-radius: 4px;
        background: #fef6ea;
        color: #eb8d00;
        font-size: 11px;
        padding: 4rpx 10rpx 4rpx;
        border: 1px solid #F1A22C;
      }

      image {
        width: 132rpx;
        height: 132rpx;
        flex-shrink: 0;
      }

      .item_content {
        margin: 0 14px;

        .item_title {
          font-size: 17px;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          /* 行数 */
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .item_time {
          color: #9d9fa3;
          font-size: 12px;
        }

        .item_text {
          color: #6c6e76;
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          /* 行数 */
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }

  /deep/ .uni-searchbar {
    padding: 20rpx 0;
  }
</style>
