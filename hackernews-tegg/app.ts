import type { Application, ILifecycleBoot } from 'egg';
 
export default class AppBootHook implements ILifecycleBoot {
  private readonly app: Application;
 
  constructor(app: Application) {
    this.app = app;
  }
 
  configWillLoad() {
    // 准备调用 configDidLoad，
    // 配置文件和插件文件将被引用，
    // 这是修改配置的最后机会。
  }

  configDidLoad() {
    // 配置文件和插件文件已被加载。
  }

  async didLoad() {
    // 所有文件已加载，这里开始启动插件。
  }

  async willReady() {
    // 所有插件已启动，在应用准备就绪前可执行一些操作。
  }

  async didReady() {
    // worker 已准备就绪，在这里可以执行一些操作，
    // 这些操作不会阻塞应用启动。
  }

  async serverDidReady() {
    // 服务器已开始监听。
  }

  async beforeClose() {
    // 应用关闭前执行一些操作。
  }
}