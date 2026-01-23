/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1768743805733_5229';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // i18n 配置
  config.i18n = {
    defaultLocale: 'zh-CN',
    queryField: 'locale',
    cookieField: 'locale',
    cookieMaxAge: '1y',
  };

  // view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
    mapping: {
      '.nj': 'nunjucks',
    },
  };

  // 为了方便测试，暂时关闭 CSRF 保护
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
exports.redis = {
  client: {
    host: '127.0.0.1',
    port: 6379,
    password: '',
    db: 0,
  },
};
