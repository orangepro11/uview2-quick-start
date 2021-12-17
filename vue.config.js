const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end();

    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
    config.resolve.alias.set('@js', path.resolve(__dirname, 'src/js_sdk'));
  },
  transpileDependencies: ['uview-ui']
};
