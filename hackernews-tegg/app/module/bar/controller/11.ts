import { HTTPController, HTTPMethod, HTTPMethodEnum } from 'egg';

// 设置 path 参数，用于指定该类下所有接口的 path 前缀
@HTTPController({ path: '/api' })
export default class PathController {
  // GET /api/hello
  @HTTPMethod({ method: HTTPMethodEnum.GET, path: 'hello' })
  async hello() {
    // ...
  }
  // POST /api/echo
  @HTTPMethod({ method: HTTPMethodEnum.POST, path: 'echo' })
  async echo() {
    // ...
  }
}