<template>
  <view class="container">
    <nav-bar title="资讯" leftIcon=" " color="#000" rightIcon='search' backgroundColor="#fff"
      @clickRight="$commHelper.jumpPage({url: './consultSearch',})" style="border-bottom: 1px solid #f3f3f3;" />
    <view class="" v-for="item in consultList" :key="item._id">
      <view v-if="item.contentImg" class="consult_item" @click="jumpDetail(item._id)">
        <view class="consult_image">
          <image :src="item.contentImg" style="width: 100px;height: 75px;background-color: aliceblue;" mode=""></image>
        </view>
        <view class="consult_content">
          <view class="consult_title">
            {{item.title}}
          </view>
          <view class="consult_time">
            {{new Date(item.create_date).Format('yyyy-MM-dd hh:mm:ss')}}
          </view>
        </view>
      </view>
      <view v-else class="consult_item" @click="jumpDetail(item._id)">
        <view class="consult_content">
          <view class="consult_title" style="margin-bottom: 12px;">
            {{item.title}}
          </view>
          <view class="consult_time">
            {{new Date(item.create_date).Format('yyyy-MM-dd hh:mm:ss')}}
          </view>
        </view>
      </view>
    </view>
    <uni-load-more v-if="showLoadMore" :status="loadMoreStatus"></uni-load-more>
    <!-- <page-empty v-if="!total"></page-empty> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        consultList: [],
        pageSize: 10,
        total: 0,
        pageCurrent: 1,
        showLoadMore: false,
        loadMoreStatus: ''
      };
    },
    onReachBottom() {
      this.showLoadMore = true;
      if (this.pageCurrent * this.pageSize < this.total) {
        this.loadMoreStatus = this.$commHelper.constant.loadStatus[1];
        this.pageCurrent++
        this.getList()
      } else {
        return this.loadMoreStatus = this.$commHelper.constant.loadStatus[2];
      }
    },
    onLoad() {
      this.getList()
    },
    methods: {
		onPullDownRefresh(){
		 this.getList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
      getList() {
        this.commHttpRequest('clientapi', 'informationList', {
          pageCurrent: this.pageCurrent,
          pageSize: this.pageSize
        }, true, (res) => {
          this.$commHelper.getContentImage(res.data.data)
		  this.consultList=[]
          this.consultList = [...this.consultList, ...res.data.data]
          this.total = res.data.total
        })
      },
      jumpDetail(id) {
        this.$commHelper.jumpPage({
          url: './consultDetail',
          id
        })
      }
    }
  }
</script>

<style lang="less">
  .container {
    background-color: #fff;
    box-sizing: border-box;

    .consult_item {
      padding: 38rpx 32rpx 32rpx;
      display: flex;
      border-bottom: 1px solid #f3f3f3;

      .consult_content {
        margin-left: 28rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .consult_title {
          font-size: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          /* 行数 */
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .consult_time {
          font-size: 12px;
          color: #9d9fa3;
        }
      }
    }
  }
</style>
