/* /controller/FooController.ts */
import { HTTPController, HTTPMethod, HTTPMethodEnum, Inject } from 'egg';
import { FooService } from '../service/aop.js';

@HTTPController({ path: '/foo' })
export default class FooController {
  @Inject()
  fooService: FooService;


  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/test-aop',
  })
  async testAop() {
    // 调用带有 AOP 拦截的方法
    const result = await this.fooService.foo();

    return {
      success: true,
      message: 'AOP test completed. Check server logs for: foo,Y,<time>ms',
      result: result
    };
  }


}
