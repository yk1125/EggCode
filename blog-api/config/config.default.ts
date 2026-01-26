// 应用配置文件：配置数据库、安全等
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // 配置密钥（用于加密 session 等）
  config.keys = appInfo.name + '_blog_api_secret';

  // 配置中间件
  config.middleware = ['errorHandler'];

  // 错误处理中间件配置：只对 /api 开头的路由生效
  config.errorHandler = {
    match: '/api',
  };

  // 安全配置：暂时关闭 CSRF 保护，方便测试
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // SQLite 数据库配置
  config.sequelize = {
    dialect: 'sqlite',
    storage: './database.sqlite',  // 数据库文件路径
    define: {
      timestamps: true,           // 自动添加 createdAt 和 updatedAt 字段
      underscored: true,          // 使用下划线命名（created_at）
    },
  };

  // Logger 配置：防止日志死循环和磁盘占用过大
  config.logger = {
    // 禁用控制台输出，避免 EPIPE 错误导致的日志死循环
    disableConsoleAfterReady: true,
    // 设置日志级别
    level: 'INFO',
    // 配置日志文件轮转
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
  };
};
