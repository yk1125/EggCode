/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // cluster-client 示例路由
  router.get('/config', controller.config.index);    // 获取配置
  router.post('/config', controller.config.create);  // 发布配置

  // HttpClient 示例路由
  router.get('/npm', controller.http.npm);           // GET 请求示例
  router.get('/post', controller.http.post);         // POST 请求示例

  // IPC 学习示例路由
  router.get('/ipc-config', controller.home.getConfig);  // 查看 Agent 发送的配置

  // i18n 国际化示例路由
  router.get('/i18n', controller.i18n.index);  // 国际化示例

  // View 模板渲染示例路由
  router.get('/view', controller.view.index);  // 模板渲染示例
  router.get('/view/render-view', controller.view.renderViewDemo);  // renderView 示例
  router.get('/view/render-string', controller.view.renderStringDemo);  // renderString 示例
};
