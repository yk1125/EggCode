// TypeScript 类型声明
import 'egg';

declare module 'egg' {
  // 扩展 Application 类型
  interface Application {
    model: any;  // 简化类型定义，支持 sync() 等方法
  }

  // 扩展 Context 类型
  interface Context {
    model: {
      User: any;     // User 模型
      Article: any;  // Article 模型
    };
    service: {
      user: any;     // user 服务
      article: any;  // article 服务
    };
  }
}
