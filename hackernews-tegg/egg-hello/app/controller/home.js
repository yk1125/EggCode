const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
  const { ctx } = this;
  
  const userInfo = {
    name: 'yk',
    id: 1001,
  }
  const Num = Date.now();
  ctx.logger.info('访问首页');
  ctx.logger.info('打印对象%j',userInfo);
  ctx.logger.info(`打印变量数字%d`,Num);
  ctx.body = `hi, egg - 当前环境: ${ctx.app.config.env}`;

  
}
}

module.exports = HomeController;
