// app.js - Worker 进程的启动文件
// Worker 进程会成为 Follower，通过 Agent 获取数据

const RegistryClient = require('./lib/registry_client');

module.exports = (app) => {

  app.logger.info('应用启动完成，当前环境：%s', app.config.env);

  /**
   * 核心代码：和 agent.js 中一模一样！
   *
   * 神奇的地方：同样的代码，在不同进程中行为不同！
   * - 在 Agent 中：成为 Leader（真正执行操作）
   * - 在 Worker 中：成为 Follower（请求转发给 Leader）
   *
   * 框架会自动判断当前是什么进程，并做相应处理
   */
  app.registryClient = app
    .cluster(RegistryClient)
    .create({});

  app.beforeStart(async () => {
    await app.registryClient.ready();
    app.coreLogger.info(`✅ [Worker ${process.pid}] RegistryClient 已就绪（作为 Follower）`);

    /**
     * 订阅配置变化
     *
     * 这里的神奇之处：
     * 1. Worker 调用 subscribe 方法
     * 2. 请求通过 socket 发送给 Agent（Leader）
     * 3. Agent 执行真正的订阅
     * 4. 当 Agent 收到配置更新时，通过 socket 通知这个 Worker
     *
     * 但是！从代码角度看，就像直接调用一样，完全感知不到多进程！
     */
    app.registryClient.subscribe(
      {
        dataId: 'demo.UserService',
      },
      (serverList) => {
        // 收到配置更新
        app.coreLogger.info(`📩 [Worker ${process.pid}] 收到配置更新: ${JSON.stringify(serverList)}`);

        // 在真实项目中，这里可以更新本地缓存、重新连接服务器等
      },
    );

    app.coreLogger.info(`📡 [Worker ${process.pid}] 已订阅 demo.UserService`);
  });
};
