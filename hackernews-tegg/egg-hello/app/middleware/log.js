// app/middleware/log.js（日志中间件示例）
module.exports = (options, app) => {
  return async (ctx, next) => {
    const start = Date.now();
    await next(); // 执行后续逻辑
    // 打印请求耗时
    app.coreLogger.info(`[log] ${ctx.method} ${ctx.path} - ${Date.now() - start}ms`);
  };
};