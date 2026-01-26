// 控制器：处理 HTTP 请求并返回响应
import { Controller } from 'egg';

export default class HomeController extends Controller {
  // hello 方法：处理 GET /api/hello 请求
  public async hello() {
    const { ctx } = this;

    // ctx.body 就是返回给客户端的数据
    ctx.body = {
      message: 'Hello Egg.js!',
      timestamp: Date.now(),
    };
  }
}
