'use strict';

const { Controller } = require('egg');

class HttpController extends Controller {
  // GET 请求示例
  async npm() {
    const { ctx } = this;

    try {
      const result = await ctx.httpClient.request(
        'https://registry.npmmirror.com/egg/latest',
        {
          dataType: 'json',
          timeout: 3000,
        }
      );

      ctx.logger.info('npm 包信息: %j', {
        name: result.data.name,
        version: result.data.version,
      });

      ctx.body = {
        status: result.status,
        package: {
          name: result.data.name,
          version: result.data.version,
          description: result.data.description,
        },
      };
    } catch (err) {
      ctx.logger.error(err);
      ctx.body = {
        success: false,
        message: '请求失败',
      };
    }
  }

  // POST 请求示例
  async post() {
    const { ctx } = this;

    try {
      const result = await ctx.httpClient.request('https://httpbin.org/post', {
        method: 'POST',
        contentType: 'json',
        data: {
          hello: 'world',
          timestamp: Date.now(),
        },
        dataType: 'json',
        timeout: 3000,
      });

      ctx.body = result.data;
    } catch (err) {
      ctx.logger.error(err);
      ctx.body = {
        success: false,
        message: '请求失败',
      };
    }
  }
}

module.exports = HttpController;
