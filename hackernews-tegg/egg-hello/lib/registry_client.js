//DataClient（数据客户端）
// 引入 sdk-base：这是一个基础类，提供了事件、ready 等功能
const { Base } = require('sdk-base');

/**
 * RegistryClient - 配置中心客户端（DataClient 层）
 * 职责：负责数据的存储和通知，模拟和远程服务器的通信
 * 注意：这个类不关心多进程的事情！
 */
class RegistryClient extends Base {
  //固定写法 就是这样（constructor、super：父类的constructor）
  constructor(options) {
    super({
      // initMethod: 指定初始化方法的名字
      // 这样框架会自动调用 init() 方法进行异步初始化
      initMethod: 'init',
    });

    this._options = options;

    // 用 Map 存储配置数据
    // 格式：{ 'dataId': ['配置值1', '配置值2'] }
    this._registered = new Map();
  }

  /**
   * 初始化方法
   * 这里可以做一些连接远程服务器的操作
   * 在真实场景中，这里会建立 WebSocket 连接或 HTTP 长轮询
   */
  async init() {
    console.log('[RegistryClient] 初始化完成');
    // 调用 ready(true) 表示客户端已经准备好了
    this.ready(true);
  }

  /**
   * 获取配置（invoke 类型的接口）
   * @param {String} dataId - 配置的 ID，比如 'database-config'
   * @return {Array} 配置数据
   */
  async getConfig(dataId) {
    console.log(`[RegistryClient] 获取配置: ${dataId}`);
    return this._registered.get(dataId) || [];
  }

  /**
   * 订阅配置变化（subscribe 类型的接口）
   * @param {Object} reg - 订阅信息
   * @param {String} reg.dataId - 要订阅的配置 ID
   * @param {Function} listener - 回调函数，当配置变化时会被调用
   */
  subscribe(reg, listener) {
    const key = reg.dataId;
    console.log(`[RegistryClient] 订阅配置: ${key}`);

    // 使用事件机制：监听这个 dataId 的变化
    this.on(key, listener);

    // 如果已经有数据了，立即通知一次
    const data = this._registered.get(key);
    if (data) {
      // 使用 nextTick 异步调用，避免阻塞
      process.nextTick(() => listener(data));
    }
  }

  /**
   * 发布配置（publish 类型的接口）
   * @param {Object} reg - 发布信息
   * @param {String} reg.dataId - 配置 ID
   * @param {String} reg.publishData - 要发布的配置数据
   */
  publish(reg) {
    const key = reg.dataId;
    let changed = false;

    console.log(`[RegistryClient] 发布配置: ${key} = ${reg.publishData}`);

    // 检查是否已经有这个配置
    if (this._registered.has(key)) {
      const arr = this._registered.get(key);
      // 如果数据不存在，才添加（避免重复）
      if (arr.indexOf(reg.publishData) === -1) {//不存在
        changed = true;
        arr.push(reg.publishData);
      }
    } else {
      // 第一次发布这个配置
      changed = true;
      this._registered.set(key, [reg.publishData]);
    }

    // 如果数据变化了，通知所有订阅者
    if (changed) {
      this.emit(key, this._registered.get(key));
    }
  }
}

module.exports = RegistryClient;
