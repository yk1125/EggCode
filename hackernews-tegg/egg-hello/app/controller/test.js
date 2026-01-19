// app/controller/test.js
const { Controller } = require('egg');

class TestController extends Controller {
  async getRedis() {
    // 直接使用插件提供的实例
    const value = await this.app.redis.get('key');
    this.ctx.body = value;
  }
}

module.exports = TestController;