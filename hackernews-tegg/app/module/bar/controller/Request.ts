import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPRequest,
  HTTPContext,
  Context
} from 'egg';

@HTTPController({ path: '/' })
export default class ArgsController {
  @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/api/request' })
  async getRequest(
    @HTTPRequest() request: Request,
    @HTTPContext() ctx: Context //Context对象 用来设置响应
) {
    const headerData = request.headers.get('x-header-key');
    const url = request.url;
    // 获取请求体 arrayBuffer
    const arrayBufferData = await request.arrayBuffer();
    ctx.status = 200; // 设置响应状态码
    ctx.type = 'text/plain'; // 设置响应类型
    // ...
    return `${url}, ${arrayBufferData.byteLength}, ${headerData}`;
  }

  //@HTTPMethod({ method: HTTPMethodEnum.POST, path: '/api/request2' })
  //async getRequest2(@HTTPBody() body: object, @HTTPRequest() request: Request) {
    // 同时注入 HTTPBody 和 Request，通过 request 读取 header、url 等信息可正常运行
    //const headerData = request.headers.get('x-header-key');
    //const url = request.url;
    // ❌ 错误示例
    // 已经通过 HTTPBody 注入请求体的情况下
    // 又同时通过 request 再次消费请求体时，将会抛出异常
    // const arrayBufferData = await request.arrayBuffer();
    // ...
  //}
}
