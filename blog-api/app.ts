// 应用启动文件：在应用启动时执行的代码
import { Application } from 'egg';

export default (app: Application) => {
  // 应用启动完成后执行
  app.beforeStart(async () => {
    // 同步数据库表结构（开发环境）
    // alter: true 表示如果表已存在，会更新表结构
    await app.model.sync({ alter: true });

    console.log('数据库表同步完成');
  });
};
