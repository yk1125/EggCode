/* /service/aop.ts */
import { Pointcut } from 'egg/aop';
import { SingletonProto } from 'egg';
import { MethodLogAdvice } from '../aop/MethodLogAdvice.ts';

@SingletonProto()
export class FooService {
  @Pointcut(MethodLogAdvice)
  async foo() {
    return 'foo';
  }

}
