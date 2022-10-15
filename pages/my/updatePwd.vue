<template>
  <view class="main">
    <nav-bar @clickLeft="$commHelper.navigateBack" />
    <view class="login_title">
      <view class="">修改密码</view>
      <span>修改账号登录密码</span>
    </view>
    <view class="">
      <uni-forms ref="form" :modelValue="formData" :rules="rules">
        <uni-forms-item name="oldPassword" class="login_ipt">
          <uni-easyinput prefixIcon="locked" :inputBorder="false" type="password" placeholder="请输入原密码"
            v-model="formData.oldPassword">
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item name="newPassword" class="login_ipt">
          <uni-easyinput prefixIcon="locked" :inputBorder="false" type="password" placeholder="请输入新密码"
            v-model="formData.newPassword">
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item name="passwordConfirmation" class="login_ipt">
          <uni-easyinput prefixIcon="locked" :inputBorder="false" type="password" placeholder="请确认密码"
            v-model="formData.passwordConfirmation">
          </uni-easyinput>
        </uni-forms-item>
      </uni-forms>
      <button class="login_btn" type="primary" @click="updataPwd">修改密码</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          oldPassword: '',
          newPassword: '',
          passwordConfirmation: '',
        },
        rules: {
          oldPassword: {
            rules: [{
              required: true,
              errorMessage: ' ',
            }],
          },
          newPassword: {
            rules: [{
              required: true,
              errorMessage: ' ',
            }],
          },
          passwordConfirmation: {
            rules: [{
              required: true,
              errorMessage: ' ',
            }],
          },
        }
      };
    },
    methods: {
      jumpRegister(path) {
        this.$commHelper.jumpPage({
          url: './' + path,
        })
      },
      updataPwd() {
        let _this = this
        this.$refs.form.validate().then(res => {
          this.commHttpRequest('clientapi', 'updatePwd', res, true, (res) => {
            uni.showToast({
              title: "请重新登录",
              icon: "none"
            })
            setTimeout(() => {
              uni.clearStorage({
                success() {
                  _this.$commHelper.goHome();
                }
              });
            }, 500)
          })
        }).catch(err => {
          console.log('表单错误信息：', err);
        })

      }
    }
  }
</script>

<style lang="less">
  .main {
    height: 100vh;
    background-color: #fff;
    padding: 0 24px;
    overflow: hidden;

    .login_title {
      margin-top: 12px;
      margin-bottom: 30px;
      border: ;

      view {
        font-size: 24px;
        color: #1f6df3;
        margin-bottom: 4px;
      }

      span {
        font-size: 14px;
        color: #6c6e76;
      }
    }

    .login_ipt {
      height: 52px;
      padding: 0;
      border-bottom: 1px solid #f2f2f5;
      line-height: 52px;
    }

    .forget_pwd {
      display: flex;
      justify-content: flex-end;
      padding: 16px 0;
      color: #1f6df3;
    }

    .login_btn {
      margin: 50px 0 193px;
    }

    .register {
      display: flex;
      justify-content: center;
      padding: 16px 0;
      color: #1f6df3;
    }

  }

  /deep/ .uni-icons {
    font-size: 20px !important;
    margin: 0 5px;
  }

  /deep/ .uni-forms-item__inner {
    padding: 0;
  }
</style>
