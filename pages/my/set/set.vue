<template>
  <view>
    <nav-bar title="设置"color="#000" @clickLeft="clickLeft" />
    <uni-list-item title="修改密码" @click="$commHelper.jumpPage({url: '../updatePwd'})" clickable :border='false' showArrow />
    <uni-list-item title="隐私协议" :border='false' clickable
      @click="$commHelper.jumpPage({url: '../../login/agreement',listed:true})" showArrow/>
      <view class="line"></view>
      <uni-list-item title="注销账号" :border='false' clickable
        @click="$commHelper.jumpPage({url: '../deactivate/deactivate'})" showArrow/>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods:{
      clickLeft(){
        uni.navigateBack()
      }
    }
  }
</script>

<style lang="less">
page{
  background-color: #fff;
  padding: 20rpx;
}
.line{
  width: 100%;
  height: 1px;
  margin: 20rpx 0;
  background-color: #f2f2f4;
}
</style>
