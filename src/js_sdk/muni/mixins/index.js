import { mapGetters, mapActions } from 'vuex';
import { getPage } from '../utils';

const isEmpty = obj => {
  return Object.keys(obj).length == 0 || !obj.hasOwnProperty('id') || obj['id'] == 0;
};

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
      return {
        to: uni.$m.router.to
      };
    }
  },
  async created() {
    let { route: page } = getPage();
    if (!page || WhiteList.includes(page) || VisitedPage.has(page) || page == LoginPage) {
      return;
    } else {
      currentPage = page;
      if (!(await this.$auth())) {
        uni.$u.route(LoginPage);
      } else {
        VisitedPage.add(page);
      }
    }
  },
  methods: {
    ...mapActions('auth', ['setUserInfo', 'clearUserInfo']),
    ...mapActions('tabs', ['setTabIndex']),
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
      VisitedPage.delete(currentPage); // 从访问列表中删除，以便下次继续验证
      uni.$u.route({
        type: 'redirect',
        url: currentPage || '/pages/index/index'
      });
    },
    $logout() {
      this.clearUserInfo(); // 清空用户信息
      currentPage = ''; // 下次登录的时候去首页
      this.setTabIndex(0); // 设置tabbar
      uni.$u.route({
        type: 'redirect',
        url: LoginPage
      }); // 去登录页
    }
  }
};
