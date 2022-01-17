const { addSlanting, getPrevPage, getVMByPagesRouter, getParamsByUrl, addParamsToUrl } = require('./utils');
import { TabBarPages, LoginPage, Pages } from '@/constantRouters';
import { typeOf } from '../utils';

class CustomRouter {
  TabBarPages = [];
  LoginPage = '';
  historyPages = []; // 自己维护的页面栈

  constructor(TabBarPages = [], LoginPage = '') {
    this.TabBarPages = TabBarPages;
    this.LoginPage = LoginPage;
  }

  addTabBar = url => {
    // 如果TabBarPages里已经存在则直接返回
    if (this.TabBarPages.indexOf(url) > -1) {
      return;
    }
    this.TabBarPages.push(addSlanting(url));
  };

  setLoginPage = url => {
    this.LoginPage = addSlanting(url);
  };

  isTabBar = url => {
    return this.TabBarPages.indexOf(url) > -1;
  };

  to = (targetURL, params, fn) => {
    // 如果fn返回false，则不跳转
    if (fn && typeOf(fn) != 'function') {
      console.error('$router.to的第三个参数必须是一个函数');
      return;
    }
    if (fn && fn() === false) {
      return;
    }
    let routerAPI = this.isTabBar(targetURL) ? uni.switchTab : uni.navigateTo;
    return new Promise((resolve, reject) => {
      routerAPI({
        url: addParamsToUrl(targetURL),
        success: () => {
          this.historyPages.push(targetURL);
          resolve();
        },
        fail: e => {
          reject(e);
        }
      });
    });
  };

  toName = async (name, params, fn) => {
    const url = Pages.find(page => page.name == name)?.url || '';
    if (!url) {
      throw new Error('请在constantRouter.js中注册要通过名字跳转的路由');
    }
    return await this.to(addSlanting(url), params, fn);
  };

  redirect = targetURL => {
    let routerAPI = this.isTabBar(targetURL) ? uni.switchTab : uni.redirectTo;
    return new Promise((resolve, reject) => {
      routerAPI({
        url: targetURL,
        success: () => {
          // 把historyPages的最后一项替换为targetURL
          this.historyPages.splice(this.historyPages.length - 1, 1, targetURL);
          resolve();
        },
        fail: e => {
          reject(e);
        }
      });
    });
  };

  back = delta => {
    uni.navigateBack({
      delta,
      success: () => {
        this.historyPages.pop();
      },
      fail: e => {}
    });
  };

  /**
   * 调用上一个页面实例的方法
   * @param {string} methodName 方法名
   * @param  {...any} args 方法接受的参数
   */
  callPrevMethod = (methodName, ...args) => {
    const prevPage = getPrevPage();
    if (prevPage) {
      return prevPage[methodName](...args);
    }
  };

  getPage = url => {
    return getVMByPagesRouter(url);
  };

  getCurrentPage = () => {
    return getVMByPagesRouter(this.getCurrentPageUrl());
  };

  getCurrentPageUrl = () => {
    return this.historyPages[this.historyPages.length - 1];
  };

  // #ifdef H5
  query = () => {
    let url = location.href;
    return getParamsByUrl(url) || {};
  };
  // #endif
}

const router = new CustomRouter(
  TabBarPages.map(page => addSlanting(page)),
  addSlanting(LoginPage)
); // 默认导出一个初始化的实例

export default router;
