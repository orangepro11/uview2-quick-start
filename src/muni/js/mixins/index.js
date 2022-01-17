import { mapGetters, mapActions } from 'vuex';
import { deepMergeObjects, getPage } from '../utils';

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
      // 在H5平台完整混入
      // #ifdef H5
      return uni.$m;
      // #endif

      // 在小程序平台删除部分属性
      // #ifdef MP-WEIXIN
      return deepMergeObjects(uni.$m, {
        uuid: undefined
      });
      // #endif
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
