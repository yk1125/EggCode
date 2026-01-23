const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = `hi, egg - 当前环境: ${ctx.app.config.env}`;
  }

  // IPC 学习示例：展示从 Agent 接收的配置
  async getConfig() {
    const { ctx } = this;

    const config = ctx.app.currentConfig;

    ctx.body = {
      workerPid: process.pid,
      config: config || '暂无配置（Agent 还未发送）',
      tip: '等待 15 秒后刷新，可以看到配置更新',
    };
  }
}

module.exports = HomeController;

