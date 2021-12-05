<template>
  <view>
    <image src="@/static/erp/login/login.png" class="login-logo" />
    <view class="title">账号登录</view>
    <view class="form">
      <u--input v-model="username" class="input" placeholder="账号" shape="circle" focus clearable>
        <template v-slot:prefix>
          <image src="@/static/erp/login/username.png" class="username-icon" />
        </template>
      </u--input>

      <u--input v-model="password" class="input" placeholder="账号" shape="circle" focus clearable password>
        <template v-slot:prefix>
          <image src="@/static/erp/login/password.png" class="username-icon" />
        </template>
      </u--input>

      <u-button class="button" @click="handleLogin">登录</u-button>
      <u-toast ref="uToast"></u-toast>
    </view>
  </view>
</template>

<script lang="ts">
import { userLogin } from '@/api/erp/auth';
import { setUserToken } from '@/helpers/erp/hooks';
import Vue from 'vue';
export default Vue.extend({
  name: 'LoginPage',
  components: {},
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    /**
     * 登录方法
     */
    handleLogin() {
      const $uToast = this.$refs.uToast;
      userLogin(this.username, this.password)
        .then((token) => {
          // @ts-ignore
          setUserToken(token);
          if ($uToast) {
            $uToast.show({
              title: '登录成功',
              message: '登录成功',
              type: 'success',
              duration: 2000,
              complete: () => {
                this.$u.route({
                  url: '/pages/index/index',
                  type: 'tab'
                });
              }
            });
          }
        })
        .catch(() => {
          if ($uToast) {
            $uToast.show({
              title: '登录失败',
              message: '登录失败',
              type: 'error',
              duration: 2000,
              complete: () => {

              }
            });
          }
        });
    }
  },
  computed: {

  },
  mounted() {

  }
});
</script>

<style lang="scss" scoped>
.login-logo {
  width: 100%;
  height: 521rpx;
}
.title {
  margin-top: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #1895ff;
}

.form {
  width: 576rpx;
  margin: 0 auto;
  margin-top: 50rpx;

  .input {
    height: 76rpx;
    background: rgba(132, 183, 255, 0.1);
    border: 1rpx solid #83b5ff;

    &:nth-of-type(2) {
      margin-top: 45rpx;
    }
  }
}

.username-icon,
.password-icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 23rpx;
  margin-left: 18rpx;
}

.button {
  background: linear-gradient(90deg, #59c0ff, #1795ff);
  color: #fff;
  display: grid;
  place-content: center;
  font-size: 34rpx;
  font-family: SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  border-radius: 48rpx;
  margin-top: 48rpx;
}
</style>