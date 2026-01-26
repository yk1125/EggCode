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

  // Logger 配置：防止日志死循环和磁盘占用过大
  config.logger = {
    // 禁用控制台输出，避免 EPIPE 错误导致的日志死循环
    disableConsoleAfterReady: true,
    // 设置日志级别
    level: 'INFO',
    // 禁用控制台日志
    consoleLevel: 'NONE',
  };

  // 自定义日志配置
  config.customLogger = {
    errorLogger: {
      // 禁用控制台输出
      consoleLevel: 'NONE',
    },
  };

  // 日志轮转配置：限制日志文件大小
  config.logrotator = {
    // 最大文件大小 100MB
    maxFileSize: 100 * 1024 * 1024,
    // 最多保留 3 个日志文件
    maxFiles: 3,
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
