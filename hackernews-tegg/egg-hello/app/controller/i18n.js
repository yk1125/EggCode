const { Controller } = require('egg');

class I18nController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = {
      // 基础用法
      email: ctx.__('Email'),

      // 带参数的用法 (util.format 风格)
      welcome: ctx.__('Welcome back, %s!', 'Shawn'),

      // 数组下标占位符
      greeting: ctx.__('Hello {0}! My name is {1}.', ['foo', 'bar']),

      // 其他示例
      profile: ctx.__('User Profile'),
      login: ctx.__('Login'),

      // 提示信息
      tip: '访问 /?locale=en-US 可切换到英文，/?locale=zh-CN 切换到中文',
      currentLocale: ctx.getLocale(),
    };
  }
}

module.exports = I18nController;
