import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, type Logger ,Middleware} from 'egg';
import { HiService,WorldService } from '../../foo/service/HelloService.ts';    
import { HelloService } from '../../foo/service/service.ts';  
import { SimpleAopAdvice } from './aopMiddle/AopMiddle.ts';

@HTTPController({
  path: '/',
})
@Middleware(SimpleAopAdvice)
export class HomeController {
  @Inject()
  private logger: Logger;

  @Inject()
  hiService: HiService;

  @Inject()
  worldservice: WorldService;

   @Inject()
    helloService: HelloService;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async index() {
    this.logger.info('hello egg logger');
    const hiResult = await this.hiService.hi();
    const worldResult = await this.worldservice.world();
    const helloResult = await this.helloService.hello();
    return `${hiResult}, ${worldResult},${helloResult}`;
  }
}
