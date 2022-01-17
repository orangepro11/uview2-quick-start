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

export function objectToQuery(obj) {
  if (typeof obj !== 'object') {
    return '';
  }
  return Object.keys(obj)
    .map(key => {
      return `${key}=${obj[key]}`;
    })
    .join('&');
}

export function addParamsToUrl(url, params) {
  // 检查url是否已经携带参数
  if (url.indexOf('?') > -1) {
    return url + '&' + objectToQuery(params);
  } else {
    return url + '?' + objectToQuery(params);
  }
}

export function getParamsByUrl(url) {
  const params = {};
  const arr = url.split('?');
  if (arr.length <= 1) {
    return params;
  }
  const query = arr[1];
  const queryArr = query.split('&');
  queryArr.forEach(item => {
    const keyValue = item.split('=');
    params[keyValue[0]] = keyValue[1];
  });
  return params;
}
