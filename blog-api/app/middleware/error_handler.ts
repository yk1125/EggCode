// 统一错误处理中间件
import { Context } from 'egg';

export default () => {
  return async function errorHandler(ctx: Context, next: () => Promise<any>) {
    try {
      await next();
    } catch (err: any) {
      // 所有的异常都会触发 app 上的一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 在生产环境中，500 错误的详细内容不返回给客户端，因为可能含有敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 从 error 对象读出各属性，设置到响应中
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};
