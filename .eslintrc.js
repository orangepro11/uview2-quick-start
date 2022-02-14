module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    uni: true,
    WeixinJSBridge: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {},
};
