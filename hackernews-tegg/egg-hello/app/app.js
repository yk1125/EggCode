const assert = require('assert');
const Redis = require('ioredis');

module.exports = (app) => {
  // 注册单例服务（name: redis）
  app.addSingleton('redis', createRedis);
};

async function createRedis(config, app) {
  // 校验配置
  assert(config.host && config.port, 'Redis配置缺少host/port');
  // 创建实例
  const client = new Redis(config);
  // 启动前校验连接
  app.beforeStart(async () => {
    await client.ping();
    app.coreLogger.info('[egg-redis] 连接成功');
  });
  return client;
}