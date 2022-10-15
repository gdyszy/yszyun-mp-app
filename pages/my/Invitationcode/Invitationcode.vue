<template>
  <view class="main">
    <nav-bar @clickLeft="$commHelper.navigateBack" title="添加成员" />
    <view class="content">
      <view class="title"><h4>扫码访问注册页</h4></view>
	  <view class="m-nav"></view>
      <uqrcode ref="qrcode" :size="200" :start="false" class="uqrcode" canvas-id="qrcode" :value="invitationInfo"></uqrcode>
	  <view class="tip">
	  	{{nickname}}邀请你加入{{codeList.name}}
	  </view>
    </view>
	<view class="submit_btn">
		<button size="small" type="primary" @click="save">下载二维码</button>
	</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        codeList: {},
        invitationInfo:'',
        nickname:''
      };
    },
    onLoad(option) {
		var _this =this
      this.commHttpRequest('clientapi', 'invitationCode', {}, true, (res) => {
        this.codeList=res.data.data[0]
        const userInfo = uni.getStorageSync('userInfo')
        _this.nickname=userInfo.nickname || userInfo.username
        this.invitationInfo = _this.$webUrl+'/#/pages/login/invitejoin?inviter_uid='+userInfo._id+'&eun='+this.codeList.eun
        this.$refs.qrcode.make();
      })
    },
    methods: {
      save() {
        this.$refs.qrcode.save({
          success: (e) => {
            uni.showToast({
              icon:"none",
              title: '图片已保存至'+e.path
            });
          },
          fail:(err)=>{
            console.log(err)
            if(err.code==12){
              uni.showToast({
                icon:"error",
                title: '没有储存权限'
              });
            }
          }
        });
      }
    }
  }
</script>

<style lang="less">
  .main {
    padding: 0 20rpx;

    .content {
      width: 100%;
      margin-top: 100rpx;
      background-color: #fff;
      padding: 40rpx ;
      text-align: center;
      box-sizing: border-box;
      .uqrcode {
        margin: 0 auto;
      }

      .title {
        color: #666;
		
      }
		.tip {
      margin-top: 40rpx;
			text-align: center;
			// line-height: 48px;
			color: #1d1d1d;
		}
      .name {
        font-size: 18px;
        font-weight: 600;
        margin: 40rpx 0;
      }

      .save {
        margin-top: 50rpx;
        color: #666;
      }
	  .m-nav{
		  display: flex;
		  align-items: center;
		  padding: 10px 0;
		  margin-bottom: 20px;
		  border-bottom: 1px solid #E4E7ED;
	  }
    }
  }
  .submit_btn {
  	padding: 20px 0;
  }
</style>
