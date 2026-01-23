// agent.js - Agent 进程的启动文件
// Agent 进程会成为 Leader，负责管理 RegistryClient

const RegistryClient = require('./lib/registry_client');

module.exports = (agent) => {
  /**
   * 核心代码：使用 agent.cluster() 包装 RegistryClient
   *
   * 这行代码做了什么？
   * 1. agent.cluster(RegistryClient) → 告诉框架："我要用 cluster-client 模式"
   * 2. .create({}) → 创建 RegistryClient 实例，{} 是传给构造函数的参数
   *
   * 在 Agent 中，这个实例会成为 Leader（领导者）
   */
  agent.registryClient = agent
    .cluster(RegistryClient)  // 包装成 ClusterClient
    .create({});               // 创建实例

  /**
   * beforeStart：在应用启动前执行
   *
   * 为什么要等 ready？
   * 因为 RegistryClient 的 init() 方法是异步的，
   * 需要等它初始化完成后，才能正常使用
   */
  agent.beforeStart(async () => {
    await agent.registryClient.ready();
    agent.coreLogger.info('✅ [Agent] RegistryClient 已就绪（作为 Leader）');
  });

  /**
   * 模拟场景：Agent 定时发布配置更新
   *
   * 这模拟了"远程配置中心推送了新配置"的场景
   */
  let counter = 0;
  setInterval(() => {
    counter++;
    agent.registryClient.publish({
      dataId: 'demo.UserService',
      publishData: `server-${counter}`,
    });
    agent.coreLogger.info(`📢 [Agent] 发布新配置: server-${counter}`);
  }, 10000); // 每 10 秒发布一次

  /**
   * IPC 学习示例：Agent 向所有 Worker 发送消息
   *
   * 场景：Agent 模拟从"远程配置中心"获取配置，并广播给所有 Worker
   */
  agent.messenger.once('egg-ready', () => {
    // 应用启动完成后，发送初始配置
    const initialConfig = {
      version: '1.0.0',
      feature: {
        newUI: true,
        darkMode: false,
      },
    };

    agent.logger.info('🚀 [Agent] 发送初始配置到所有 Worker: %j', initialConfig);
    agent.messenger.sendToApp('config-update', initialConfig);

    // 每 15 秒模拟配置更新
    let configVersion = 1;
    setInterval(() => {
      configVersion++;
      const newConfig = {
        version: `1.0.${configVersion}`,
        feature: {
          newUI: configVersion % 2 === 0,  // 每次切换
          darkMode: configVersion % 3 === 0,
        },
      };

      agent.logger.info('📡 [Agent] 广播配置更新: %j', newConfig);
      agent.messenger.sendToApp('config-update', newConfig);
    }, 15000);
  });
};
