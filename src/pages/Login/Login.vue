<template>
  <view>
    <image src="@/static/login/login.png" class="login-logo" />
    <view class="title">账号登录</view>
    <view class="form" v-if="!isWechat">
      <u--input :custom-style="firstInputStyle" v-model="username" class="input" placeholder="账号" shape="circle" focus clearable>
        <template v-slot:prefix>
          <image src="@/static/login/username.png" class="username-icon" />
        </template>
      </u--input>

      <u--input :custom-style="secondInputStyle" v-model="password" class="input" placeholder="账号" shape="circle" focus clearable password>
        <template v-slot:prefix>
          <image src="@/static/login/password.png" class="username-icon" />
        </template>
      </u--input>

      <u-button :custom-style="buttonStyle" @click="handleLogin">登录</u-button>
    </view>
    <div v-else>
      <u-button :custom-style="buttonStyle" class="button" @click="handleLogin">微信一键授权</u-button>
    </div>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'LoginPage',
  components: {},
  data() {
    return {
      // @ts-ignore
      isWechat: uni.$u.platform == 'weixin',
      username: '',
      password: ''
    };
  },
  methods: {
    /**
     * 登录方法
     */
    handleLogin(): void {
      if (this.username == 'admin' && this.password == 'admin') {
        this.$auth({
          id: 1,
          nickname: '不爱喝橙子汁'
        });
        this.$return(); // 这是封装在mixin的方法，可以直接返回上一页
      }
    }
  },
  computed: {
    buttonStyle(): string {
      // @ts-ignore
      return uni.$m.jss.customButton;
    },
    firstInputStyle(): string {
      return `
        height: 76rpx;
        background: rgba(132, 183, 255, 0.1);
        border: 1rpx solid #83b5ff;
      `;
    },
    secondInputStyle(): string {
      return `
        height: 76rpx;
        background: rgba(132, 183, 255, 0.1);
        border: 1rpx solid #83b5ff;
        margin-top: 45rpx;
      `;
    }
  },
  mounted() {}
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
