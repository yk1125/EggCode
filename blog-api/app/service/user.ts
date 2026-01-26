// 用户服务：处理用户相关的业务逻辑
import { Service } from 'egg';
import * as bcrypt from 'bcrypt';

export default class UserService extends Service {
  // 用户注册
  public async register(username: string, password: string, email?: string) {
    const { ctx } = this;

    // 1. 检查用户名是否已存在
    const existUser = await ctx.model.User.findOne({
      where: { username },
    });

    if (existUser) {
      // 抛出错误（后面我们会用中间件统一处理）
      ctx.throw(400, '用户名已存在');
    }

    // 2. 加密密码（安全！不能明文存储密码）
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 创建用户
    const user = await ctx.model.User.create({
      username,
      password: hashedPassword,
      email,
    });

    // 4. 返回用户信息（不包含密码）
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  // 用户登录
  public async login(username: string, password: string) {
    const { ctx } = this;

    // 1. 查找用户
    const user = await ctx.model.User.findOne({
      where: { username },
    });

    if (!user) {
      ctx.throw(401, '用户名或密码错误');
    }

    // 2. 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      ctx.throw(401, '用户名或密码错误');
    }

    // 3. 返回用户信息
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
