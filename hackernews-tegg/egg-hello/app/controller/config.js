// app/controller/config.js - 配置接口控制器

const { Controller } = require('egg');

class ConfigController extends Controller {
  /**
   * 获取配置接口
   * 访问: GET http://localhost:7001/config
   */
  async index() {
    const { ctx, app } = this;

    try {
      // 调用 getConfig 方法获取配置
      // 注意：即使是在 Worker 中调用，也会自动转发给 Agent 执行
      const config = await app.registryClient.getConfig('demo.UserService');

      ctx.body = {
        success: true,
        pid: process.pid, // 显示当前 Worker 的进程 ID
        data: config,
        message: `Worker ${process.pid} 获取到配置`,
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * 发布配置接口
   * 访问: POST http://localhost:7001/config
   * 参数: { "server": "192.168.1.1:8080" }
   */
  async create() {
    const { ctx, app } = this;

    const { server } = ctx.request.body;

    if (!server) {
      ctx.body = {
        success: false,
        message: '请提供 server 参数',
      };
      return;
    }

    // 发布新配置
    app.registryClient.publish({
      dataId: 'demo.UserService',
      publishData: server,
    });

    ctx.body = {
      success: true,
      pid: process.pid,
      message: `Worker ${process.pid} 已发布配置: ${server}`,
    };
  }
}

module.exports = ConfigController;
