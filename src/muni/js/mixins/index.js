import { mapGetters, mapActions } from 'vuex';
import { getPage } from '../utils';

const isEmpty = obj => {
  return (obj && Object.keys(obj).length == 0) || !obj.hasOwnProperty('id') || obj['id'] == 0;
};

// 不需要授权的白名单
const WhiteList = ['pages/index/index'];

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
      return uni.$m.router;
    }
  },
  async created() {},
  methods: {
    ...mapActions('auth', ['setUserInfo', 'clearUserInfo']) // 全局混入
  }
};
