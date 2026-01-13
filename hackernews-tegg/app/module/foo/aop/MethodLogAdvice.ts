/* /aop/MethodLogAdvice.ts */
import { Inject, Logger } from 'egg';
import { Advice, IAdvice, AdviceContext } from 'egg/aop';

@Advice()
export class MethodLogAdvice implements IAdvice {
  private start: number;
  private succeed = true;

  @Inject()
  private readonly logger: Logger;

  // 方法调用前，记录开始执行时间
  async beforeCall() {
    this.start = Date.now();
  }

  // 若方法抛出异常，则标记 succeed 为 false
  async afterThrow() {
    this.succeed = false;
  }

  // 方法调用结束后，打印日志
  async afterFinally(ctx: AdviceContext) {
    this.logger.info(
      `${String(ctx.method)},${this.succeed ? 'Y' : 'N'},${Date.now() - this.start}ms`
    );
  }
}
