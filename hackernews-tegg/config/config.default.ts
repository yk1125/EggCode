import { defineConfigFactory, type PartialEggConfig } from 'egg';

export default defineConfigFactory((appInfo) => {
  const config = {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_{{keys}}',

    // add your egg config in here
    middleware: [] as string[],

    // change multipart mode to file
    // @see https://github.com/eggjs/multipart/blob/master/src/config/config.default.ts#L104
    multipart: {
      mode: 'file' as const,
    },
  } as PartialEggConfig;

  // Logger 配置：防止日志死循环和磁盘占用过大
  config.logger = {
    // 禁用控制台输出，避免 EPIPE 错误导致的日志死循环
    disableConsoleAfterReady: true,
    // 设置日志级别
    level: 'INFO' as const,
    // 禁用控制台日志
    consoleLevel: 'NONE' as const,
  };

  // 自定义日志配置
  config.customLogger = {
    errorLogger: {
      // 禁用控制台输出
      consoleLevel: 'NONE' as const,
    },
  };

  // 日志轮转配置：限制日志文件大小
  config.logrotator = {
    // 最大文件大小 100MB
    maxFileSize: 100 * 1024 * 1024,
    // 最多保留 3 个日志文件
    maxFiles: 3,
  };

  // add your special config in here
  // Usage: `app.config.bizConfig.sourceUrl`
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    bizConfig,
  };
});
