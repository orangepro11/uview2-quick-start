/**
 * 如果字符串不以/开头，则自动拼上一个/
 * @param {*} str
 */
export function addSlanting(str) {
  if (str.indexOf('/') != 0) {
    return '/' + str;
  }
  return str;
}

/**
 * 获取上一个页面的实例
 */
export function getPrevPage() {
  const pages = getCurrentPages();
  if (pages.length <= 1) {
    return '';
  }
  return pages[pages.length - 2];
}

export function getVMByPagesRouter(url) {
  const pages = getCurrentPages();
  if (pages.length <= 0) {
    return '';
  }
  return pages.find(page => {
    if (page.$route.path === url || page.$route.path === addSlanting(url)) {
      return page;
    }
  });
}
