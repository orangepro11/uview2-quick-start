import { mapGetters, mapActions } from 'vuex';
import { getPage } from '../utils';

const isEmpty = (obj) => {
  return obj && Object.keys(obj).length == 0 || !obj.hasOwnProperty('id') || obj["id"] == 0;
}

// 不需要授权的白名单
const WhiteList = [
  "pages/index/index",
];

const VisitedPage = new Set();
let currentPage;
let LoginPage = 'pages/Login/Login';

export default {
  computed: {
    ...mapGetters('auth', ['UserInfo']), // 全局混入用户信息
    $m() {
      // 选择性的混入$m对象，防止性能问题
      return {
        before: uni.$m.before,
        after: uni.$m.after,
        chain: uni.$m.compose
      };
    },
    $router() {
      return {
        to: uni.$m.router.to
      };
    }
  },
  async created() {
  },
  methods: {
    ...mapActions('auth', ['setUserInfo', 'clearUserInfo']), // 全局混入
    async $auth(payload) {
      if (payload) {
        uni.$m.storage.set('UserInfo', payload);
        this.setUserInfo(payload);
      }

      let userInfo = this.UserInfo;
      if (isEmpty(userInfo)) {
        // 尝试从缓存中取
        try {
          userInfo = await uni.$m.storage.get('UserInfo');
        } catch (e) {}
      }
      return !isEmpty(userInfo);
    },
    $return() {
      console.log();
    },
    $logout() {
      this.clearUserInfo(); // 清空用户信息
      currentPage = ''; // 下次登录的时候去首页
      currentPage = ''; // 下次登录的时候去首页 
      uni.$u.route({
        type: 'redirect',
        url: LoginPage
      }); // 去登录页
    }
  }
};
