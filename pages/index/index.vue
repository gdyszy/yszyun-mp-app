<template>
  <view class="container">
    <nav-bar title="首页" :leftIcon="$commHelper.getImageUrl(imageLogo)" color="#fff" rightIcon="scan"
      backgroundColor="rgba(0,0,0,0)" @clickRight="scan" />
    <view v-if="!isUniApp">当前环境不支持uni小程序</view>
    <view class="search" @click="$commHelper.jumpPage({url: './search',})">
      <uni-icons type="search" color="#919599" size="20"></uni-icons>
      <span>搜索小程序、资讯</span>
    </view>
    <!-- 轮播图区域 -->
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :duration="1000" :circular="true"
      indicator-color="rgb(179, 128, 126)" indicator-active-color="#ffffff">
      <swiper-item v-for="(item,index) in swiperImageList" :key="index">
        <view class="swiper-item" @click="swiperClick(item)">
          <image :src="item.bannerfile.url"></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="AppletList">
      <span>我的小程序</span>
      <span class="more" @click="editMyApplet">
        <uni-icons type="settings" size="13" color="#9d9fa3"></uni-icons> 管理
      </span>
    </view>
    <view class="myApplet_icon" style="margin-top: 10px">
      <view class="item_icon" v-for="(item, index) in myApplet" :key="index" @click="openApp(item)">
        <view class="icon">
          <image :src="$commHelper.getImageUrl(item.applet_icon[0].path)" mode=""></image>
        </view>
        <div class="icon_name">{{item.name}}</div>
      </view>
      <!-- 应该有添加功能 -->
      <view class="item_icon" @click="moreList(1)">
        <view class="icon add_applet">
          <image src="../../static/add_applet.svg"></image>
        </view>
      </view>
    </view>
    <view class="AppletList">
      <span>小程序列表</span>
      <span class="more" @click="moreList(0)">更多 <uni-icons type="right" size="13" color="#9d9fa3"></uni-icons>
      </span>
    </view>
    <view class="myApplet_icon" style="background-color: #f5f7fa;">
      <view class="item_icon" v-for="(item,index) in appletList" :key="index" @click="openApp(item)">
        <view class="icon">
          <image :src="$commHelper.getImageUrl(item.applet_icon[0].path)" mode=""></image>
        </view>
        <div class="icon_name">{{item.name}}</div>
      </view>
    </view>
  </view>
</template>

<script>
  const mp = uni.requireNativePlugin('uniMP');
  import slide from "@/api/slideshow.js"
  import applet from "@/api/applet.js"
  import myApplet from "@/api/myApplet.js"
  import base64 from '@/utils/base64.js'  
  export default {
    data() {
      return {
        swiperImageList: [],
        appletList: [],
        pages: this.$commJsUtils.parseCopyObj(this.$commHelper.constant.page),
        imageLogo: '',
        myApplet: [],
        myAppletIds: [],
        isUniApp: false,
      }
    },
    onLoad() {
      this.commHttpRequest('clientapi', 'swiperImageList', {}, true, (res) => {
        this.swiperImageList = res.data.data
      })
      if (mp) {
        this.isUniApp = true;
      }
      //小程序列表
      this.getAppList()
      //获取我的小程序
      this.getMyApp()
    },
    onShow() {
      //全局监听
      uni.$on(this.$commHelper.constant.keys.emitMyApplet, () => {
        this.getMyApp()
        uni.$off(this.$commHelper.constant.keys.emitMyApplet)
      })
    },
    methods: {
      onPullDownRefresh() {
        this.getAppList()
        this.getMyApp()
        setTimeout(function() {
          uni.stopPullDownRefresh();
        }, 1000);
      },
      swiperClick(item) {
        if (item.open_url && item.open_url.startsWith('http')) {
          plus.runtime.openURL(item.open_url)
        }
      },
      openApp(item) {
        this.$commHelper.openThirdApp(mp, item)
      },
      async getAppList() {
        this.pages.count = -1
        this.pages.page_size = 8
        const res = await applet.getAppletList(this.pages)
        this.appletList = res.data
      },
      async getMyApp() {
        const res = await myApplet.getMyAppletList()
        this.myApplet = res.data;
        this.myAppletIds = [];
        uni.setStorageSync(this.$commHelper.constant.keys.myApplet, JSON.stringify(this.myApplet));
        this.myApplet.forEach(item => {
          this.myAppletIds.push(item._id._value)
        })
      },
      moreList(isAdd) {
        this.$commHelper.jumpPage({
          url: './applerList',
          isAdd,
          myAppletIds: this.myAppletIds
        })
      },
      editMyApplet() {
        this.$commHelper.jumpPage({
          url: './editApplet/editApplet'
        })
      },
      async openById(id, versionId) {
        const res = await applet.getById(id, versionId)
        res.data.data.applet_id = res.data.data.applet_id + '_DEV'
        this.openApp(res.data.data)
      },
      scan() {
        uni.scanCode({
          success: (res) => {
            // console.log('条码类型：' + res.scanType);
            try {
              const result = base64.decode(res.result)
              // console.log('条码内容：' + result);
              const jsonRes = JSON.parse(result)
              console.log(jsonRes)
              if (jsonRes.type != 'yszyun') {
                throw '非法二维码'
              }

              this.openById(jsonRes.id, jsonRes.versionId)
            } catch (e) {
              console.log(e)
              uni.showToast({
                icon: 'error',
                title: '非法门户二维码'
              })
            }
          }
        });
      }
    }
  }
</script>

<style lang="less">
  .container {
    background: url('@/static/homeBanner.png') no-repeat;
    background-size: 100%;
    padding: 0 36rpx;
  }

  .AppletList {
    margin: 40rpx 0 0;
    font-size: 17px;
    display: flex;
    justify-content: space-between;

    .more {
      font-size: 13px;
      color: #9d9fa3;
    }
  }

  .myApplet {
    margin: 40rpx 0 28rpx;
    font-size: 17px;
  }

  .myApplet_icon {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 36rpx 17rpx;
    box-sizing: border-box;

    .item_icon {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;

      // justify-content: center;
      .icon {
        width: 96rpx;
        height: 96rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        // background-color: #b5b6ba;
        image {
          width: 100%;
          height: 100%;
          border-radius: 10%;
        }
      }

      .add_applet {
        background-color: #f5f5f5;
        border-radius: 10%;

        image {
          width: 60%;
          height: 60%;
        }
      }

      .icon_name {
        text-align: center;
        margin-top: 16rpx;
        width: 136rpx;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  uni-swiper {
    height: 390rpx;
    margin-top: 44rpx;
    border-radius: 12rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
      border-radius: 12rpx;
    }
  }

  .search {
    width: 100%;
    height: 76rpx;
    box-sizing: border-box;
    line-height: 76rpx;
    padding: 0 24rpx;
    margin-top: 20rpx;
    border-radius: 12rpx;
    background-color: #fff;

    span {
      color: #b5b6ba;
      font-size: 14px;
      vertical-align: top;
      margin-left: 20rpx;
    }
  }
</style>
