const { Controller } = require('egg');

class ViewController extends Controller {
  async index() {
    const { ctx } = this;

    // 模拟用户数据
    const data = {
      title: 'Egg.js View 模板渲染示例',
      name: 'Shawn',
      email: 'shawn@example.com',
      currentLocale: ctx.getLocale(),
    };

    // 使用 render 方法渲染模板
    // 框架会自动将 data 合并到 ctx.locals
    // 同时自动注入 ctx、request、helper
    await ctx.render('home/index.nj', data);
  }

  // 演示 renderView（仅渲染，不自动赋值给 ctx.body）
  async renderViewDemo() {
    const { ctx } = this;

    const html = await ctx.renderView('home/index.nj', {
      title: 'renderView 示例',
      name: 'Alice',
      email: 'alice@example.com',
      currentLocale: ctx.getLocale(),
    });

    // 手动赋值给 ctx.body
    ctx.body = html;
  }

  // 演示 renderString（渲染字符串模板）
  async renderStringDemo() {
    const { ctx } = this;

    const template = 'Hello {{ name }}, welcome to {{ ctx.app.config.name }}!';
    const html = await ctx.renderString(template, {
      name: 'Bob',
    });

    ctx.body = html;
  }
}

module.exports = ViewController;
