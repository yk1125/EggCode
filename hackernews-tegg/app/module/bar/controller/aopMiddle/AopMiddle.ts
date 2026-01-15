import { Inject, Logger, ObjectInitType } from 'egg';
import { Advice, IAdvice, AdviceContext } from 'egg/aop';

@Advice({ initType: ObjectInitType.SINGLETON })
export class SimpleAopAdvice implements IAdvice {
  @Inject()
  logger: Logger;

  async around(ctx: AdviceContext, next: () => Promise<any>) {
    // 控制器前执行的逻辑
    const startTime = Date.now();
    this.logger.info('args: %j', ctx.args); // 调用 controller 方法，传入的参数

    // 执行下一个 middleware
    const res = await next();

    // 控制器之后执行的逻辑
    this.logger.info(
      '%dms, traceId: %s',
      Date.now() - startTime,
    );

    // 对结果进行处理后，再返回
    return {
      res
    };
  }
}