// 用户控制器：处理用户相关的 HTTP 请求
import { Controller } from 'egg';

// 定义注册验证规则
const registerRule = {
  username: { type: 'string', min: 3, max: 20 },
  password: { type: 'string', min: 6, max: 20 },
  email: { type: 'email', required: false },
};

// 定义登录验证规则
const loginRule = {
  username: { type: 'string', min: 3, max: 20 },
  password: { type: 'string', min: 6, max: 20 },
};

export default class UserController extends Controller {
  // POST /api/register - 用户注册
  public async register() {
    const { ctx } = this;

    // 使用 egg-validate 验证请求参数
    ctx.validate(registerRule, ctx.request.body);

    const { username, password, email } = ctx.request.body;
    const user = await ctx.service.user.register(username, password, email);

    ctx.body = user;
    ctx.status = 201;
  }

  // POST /api/login - 用户登录
  public async login() {
    const { ctx } = this;

    // 使用 egg-validate 验证请求参数
    ctx.validate(loginRule, ctx.request.body);

    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.login(username, password);

    ctx.body = user;
  }
}
