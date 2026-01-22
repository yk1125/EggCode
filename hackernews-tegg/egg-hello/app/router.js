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
};
