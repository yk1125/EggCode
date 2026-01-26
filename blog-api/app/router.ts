// 路由配置：定义哪个 URL 对应哪个控制器方法
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // 测试路由
  router.get('/api/hello', controller.home.hello);

  // 用户相关路由
  router.post('/api/register', controller.user.register);  // 用户注册
  router.post('/api/login', controller.user.login);        // 用户登录

  // 文章相关路由（使用 RESTful resources）
  app.resources('articles', '/api/articles', controller.article);
};
